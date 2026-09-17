import { postJson } from './api';
import { stripFences, safeJsonParse } from '../utils/jsonParser';
import {
  getMockTopicAnalysis,
  generateDynamicTopicAnalysis,
  generateDynamicPostsAnalysis,
} from '../data/mockData';
import { getStoredSettings } from '../utils/storage';

export const ANALYSIS_SYSTEM = `You are the reasoning engine behind SocialPulse AI, a social-intelligence dashboard.
Given a topic, reason about what public discussion around it plausibly looks like, based on your general
knowledge. You are NOT connected to live social media data, so never claim specific real-time post counts —
your job is a well-reasoned, plausible synthesis, clearly framed as AI-generated analysis rather than measured fact.

Respond with ONLY a single JSON object, no prose, no markdown fences, matching exactly this shape:
{
  "topic": string,
  "confidence": number (0-100, how confident you are this is a well-grounded synthesis),
  "overall": { "positive": number, "neutral": number, "negative": number },   // sum to 100
  "emotions": { "joy": number, "anger": number, "sadness": number, "fear": number, "surprise": number, "disgust": number, "neutral": number }, // sum to 100
  "aspects": [ { "name": string, "sentiment": "positive"|"negative"|"mixed", "note": string (<=14 words) } ],  // 4-6 items
  "topics": [ { "name": string, "pct": number } ],  // 4-6 items, sum to 100
  "forecast": [ { "name": string, "direction": "up"|"down"|"stable", "level": "high"|"medium"|"low" } ], // 3-5 items
  "insight": string  // 2-3 sentence plain-language briefing paragraph
}
Numbers are integers. Keep "note" and "insight" concise and specific to the topic, not generic filler.`;

export const POSTS_SYSTEM = `You are the reasoning engine behind SocialPulse AI, a social-intelligence dashboard.
The user has pasted a batch of REAL social media posts/comments (one per line, blank lines ignored). Analyze
ONLY the text actually given to you — do not invent additional posts, users, or facts not present in the text.
Ground every field in the literal content provided. If posts are sarcastic, mixed, or ambiguous, reflect that
honestly rather than forcing a clean label.

Respond with ONLY a single JSON object, no prose, no markdown fences, matching exactly this shape:
{
  "topic": string,  // a short label you infer for what this batch is about, e.g. "EV pricing complaints"
  "sampleSize": number,  // count of distinct posts you actually analyzed
  "confidence": number (0-100, how confident you are given the sample size and clarity of the text),
  "overall": { "positive": number, "neutral": number, "negative": number },   // sum to 100
  "emotions": { "joy": number, "anger": number, "sadness": number, "fear": number, "surprise": number, "disgust": number, "neutral": number }, // sum to 100
  "aspects": [ { "name": string, "sentiment": "positive"|"negative"|"mixed", "note": string (<=14 words) } ],  // 2-6 items, only what's actually discussed
  "topics": [ { "name": string, "pct": number } ],  // 2-6 items, sum to 100, only what's actually discussed
  "authenticity": { "normal": number, "repetitive": number, "note": string (<=20 words) },  // normal+repetitive sum to 100; flag near-duplicate/templated posts if present, otherwise normal=100 and say so
  "insight": string  // 2-3 sentence plain-language briefing paragraph grounded in this specific batch
}
Numbers are integers. If fewer than 3 posts are given, still analyze them but keep confidence low and say so in "insight".`;

async function callClaude(messages, system, settings) {
  const apiKey = settings.apiKey?.trim();
  const url = settings.apiUrl || 'https://api.anthropic.com/v1/messages';
  const model = settings.model || 'claude-sonnet-4-6';

  const headers = {
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };

  const payload = {
    model,
    max_tokens: 1000,
    system,
    messages,
  };

  const data = await postJson(url, payload, headers);
  const text = (data.content || [])
    .map((b) => (b.type === 'text' ? b.text : ''))
    .filter(Boolean)
    .join('\n');

  return text;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeTopicService(topic) {
  const settings = getStoredSettings();
  const trimmed = topic.trim();

  // If user provided a live API key, call Claude
  if (settings.apiKey && settings.apiKey.length > 5) {
    try {
      const raw = await callClaude(
        [{ role: 'user', content: `Topic: ${trimmed}` }],
        ANALYSIS_SYSTEM,
        settings
      );
      const parsed = safeJsonParse(raw);
      if (parsed.success) {
        return { ...parsed.data, _mode: 'topic', _source: 'live' };
      }
      throw new Error('Failed to parse AI response: ' + parsed.error);
    } catch (apiErr) {
      console.warn('Claude API request failed, checking fallback:', apiErr);
      if (!settings.useMockFallback) {
        throw apiErr;
      }
      // Continue to fallback simulation
    }
  }

  // Realistic simulation latency
  await sleep(750);
  const result = getMockTopicAnalysis(trimmed);
  return { ...result, _source: 'simulation' };
}

export async function analyzePostsService(posts) {
  const settings = getStoredSettings();
  const validPosts = posts.map((l) => l.trim()).filter(Boolean);

  if (settings.apiKey && settings.apiKey.length > 5) {
    try {
      const numbered = validPosts.map((p, i) => `${i + 1}. ${p}`).join('\n');
      const raw = await callClaude(
        [{ role: 'user', content: `Posts:\n${numbered}` }],
        POSTS_SYSTEM,
        settings
      );
      const parsed = safeJsonParse(raw);
      if (parsed.success) {
        return { ...parsed.data, _mode: 'posts', _source: 'live' };
      }
      throw new Error('Failed to parse AI response: ' + parsed.error);
    } catch (apiErr) {
      console.warn('Claude API request failed, checking fallback:', apiErr);
      if (!settings.useMockFallback) {
        throw apiErr;
      }
    }
  }

  await sleep(850);
  const result = generateDynamicPostsAnalysis(validPosts);
  return { ...result, _source: 'simulation' };
}

export async function askAiService(analysis, question, chatHistory = []) {
  const settings = getStoredSettings();
  const trimmedQ = question.trim();

  if (settings.apiKey && settings.apiKey.length > 5) {
    try {
      const sys = `You are the "Ask AI" assistant inside SocialPulse AI. The user is asking questions about
this analysis JSON for the topic "${analysis.topic}":\n${JSON.stringify(analysis)}\n
Answer in 1-3 concise sentences, grounded only in this data. No markdown, no headers.`;

      const history = [...chatHistory, { role: 'user', content: trimmedQ }].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const answer = await callClaude(history, sys, settings);
      return answer.trim();
    } catch (apiErr) {
      console.warn('Claude Chat request failed, using fallback generator:', apiErr);
      if (!settings.useMockFallback) {
        throw apiErr;
      }
    }
  }

  // Realistic chat thinking latency
  await sleep(600);
  return generateContextualChatAnswer(analysis, trimmedQ);
}

function generateContextualChatAnswer(analysis, question) {
  const q = question.toLowerCase();

  if (q.includes('negative') || q.includes('sentiment') || q.includes('bad') || q.includes('why')) {
    const negAspects = (analysis.aspects || [])
      .filter((a) => a.sentiment === 'negative' || a.sentiment === 'mixed')
      .map((a) => `"${a.name}"`)
      .join(' and ');

    return `Negative sentiment accounts for ${analysis.overall?.negative || 0}% of overall signal, largely driven by friction points in ${negAspects || 'operational execution'}. Commuters and consumers frequently highlight inconsistent reliability and unexpected pricing pressure.`;
  }

  if (q.includes('positive') || q.includes('good') || q.includes('strength')) {
    const posAspects = (analysis.aspects || [])
      .filter((a) => a.sentiment === 'positive')
      .map((a) => `"${a.name}"`)
      .join(' and ');

    return `Positive perception (${analysis.overall?.positive || 0}%) is anchored primarily by enthusiasm around ${posAspects || 'core modernization and convenience'}. Users respond well to long-term upgrades that promise immediate time savings.`;
  }

  if (q.includes('trend') || q.includes('forecast') || q.includes('future') || q.includes('next')) {
    const topForecast = analysis.forecast?.[0];
    if (topForecast) {
      return `The primary upward trajectory is centered on ${topForecast.name} with ${topForecast.level} public sensitivity. Monitoring whether institutional delivery keeps pace with this rising expectation is key.`;
    }
    return `Forward indicators point toward increased user engagement and growing demand for transparent communication over the coming quarters.`;
  }

  if (q.includes('emotion') || q.includes('feel') || q.includes('anger') || q.includes('joy')) {
    const em = analysis.emotions || {};
    const topEmotion = Object.entries(em).sort((a, b) => b[1] - a[1])[0];
    return `The dominant emotion registered is ${topEmotion ? topEmotion[0] : 'neutral'} at ${topEmotion ? topEmotion[1] : 0}%, reflecting intense personal stakes in day-to-day outcomes rather than detached curiosity.`;
  }

  // General grounded response
  return `Based on the synthesis for "${analysis.topic}", the signal shows ${analysis.confidence}% confidence with ${analysis.overall?.positive}% positive versus ${analysis.overall?.negative}% negative distribution. Key concerns remain focused on ${analysis.aspects?.[0]?.name || 'implementation consistency'}.`;
}
