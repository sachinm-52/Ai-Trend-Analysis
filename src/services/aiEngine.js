// ═══════════════════════════════════════════════════
// AI Trend Analyzer — AI Engine
// Supports: Anthropic Claude, OpenAI GPT, Mock Mode
// ═══════════════════════════════════════════════════

import { getMockReport } from '../data/mockDatabase';

// ── Settings Management ──────────────────────────
const SETTINGS_KEY = 'aitrend_settings_v1';

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    provider: import.meta.env.VITE_AI_PROVIDER || 'anthropic',
    anthropicKey: import.meta.env.VITE_AI_API_KEY || '',
    anthropicModel: import.meta.env.VITE_AI_MODEL || 'claude-sonnet-4-6',
    anthropicUrl: import.meta.env.VITE_AI_API_URL || 'https://api.anthropic.com/v1/messages',
    openaiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    openaiModel: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o',
    openaiUrl: import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
    useMockFallback: true,
    userRole: '',
    userInterests: [],
  };
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── System Prompt ──────────────────────────────────
const SYSTEM_PROMPT = `You are the AI Trend Analyzer intelligence engine. Given a search topic, produce a comprehensive structured intelligence report as a SINGLE valid JSON object.

The JSON must match this exact schema (all fields required):
{
  "topic": string,
  "category": string,
  "subcategory": string,
  "currentStatus": string (1-3 words),
  "confidence": number (0-100),
  "trendMomentum": {
    "signal": "rising"|"stable"|"declining"|"emerging",
    "description": string,
    "level": number (1-5)
  },
  "geographicRelevance": string[],
  "keywords": string[],
  "relatedTopics": string[],
  "profile": {
    "description": string,
    "majorEntities": string[],
    "keyPeople": string[],
    "majorTechnologies": string[],
    "industriesAffected": string[]
  },
  "tenPoints": [{ "num": string, "question": string, "answer": string }],
  "bigPicture": {
    "whatIsHappening": string,
    "whyTrending": string[],
    "whyShouldICare": string,
    "whoIsAffected": [{ "group": string, "impact": string, "direction": "positive"|"negative"|"mixed" }]
  },
  "trendDNA": {
    "origin": { "period": string, "event": string },
    "trigger": { "period": string, "event": string },
    "growth": { "period": string, "event": string },
    "acceleration": { "period": string, "event": string },
    "now": { "period": string, "event": string },
    "future": { "period": string, "event": string }
  },
  "timeline": [{ "year": string, "date": string, "event": string, "who": string, "what": string, "why": string, "impact": "HIGH"|"MEDIUM"|"LOW", "turningPoint": boolean }],
  "people": [{ "name": string, "role": string, "org": string, "contribution": string, "influence": "very high"|"high"|"medium" }],
  "entities": [{ "name": string, "type": "company"|"technology"|"institution", "industry": string, "role": string, "products": string[], "relationship": string }],
  "currentEvents": [{ "headline": string, "date": string, "source": string, "summary": string, "whyItMatters": string, "evidence": "high"|"medium"|"low" }],
  "drivers": [{ "name": string, "type": string, "description": string, "impact": string }],
  "problems": [{ "id": string, "category": string, "title": string, "description": string, "evidence": string, "affected": string[], "severity": "high"|"medium"|"low", "solutions": string[], "gaps": string, "evidenceStrength": "high"|"medium"|"low" }],
  "opportunities": [{ "problem": string, "improvement": string, "whoCouldBuild": string, "impact": string, "difficulty": string }],
  "deepDiscovery": [{ "title": string, "description": string, "whyInteresting": string, "type": string }],
  "futureScenarios": {
    "nearTerm": [{ "scenario": string, "signals": string[], "assumptions": string[], "trigger": string, "impact": string, "uncertainty": "high"|"medium"|"low", "type": "growth"|"risk"|"disruption" }],
    "mediumTerm": [...same],
    "longTerm": [...same]
  },
  "heatmap": [{ "area": string, "heat": number (1-5), "trend": "rising"|"stable"|"declining"|"emerging", "description": string }],
  "comparison": { "headers": string[], "rows": string[][] },
  "sources": [{ "name": string, "title": string, "type": "news"|"research"|"company"|"government"|"data", "date": string, "url": string }],
  "earlySignals": [{ "signal": string, "why": string, "confidence": "early"|"emerging"|"possible", "source": string }],
  "summaryModes": {
    "quick": string,
    "deep": string,
    "student": string,
    "business": string,
    "builder": string,
    "research": string
  },
  "projectIdeas": [{ "title": string, "problem": string, "solution": string, "tech": string[], "difficulty": string, "mvp": string, "users": string }],
  "followUpQuestions": [{ "question": string, "topic": string }]
}

Rules:
- Respond with ONLY the JSON object, no prose, no markdown fences
- All facts must be grounded in real knowledge; clearly distinguish analysis from fact
- Never invent companies, people, statistics, papers or events
- Current date context: September 2025. Do not fabricate recent events you cannot verify
- Generate 5-8 items for timeline, 3-6 people, 4-6 entities, 4-6 currentEvents
- Generate 4-6 problems, 3-5 opportunities, 3-5 deepDiscovery items
- Generate 8 followUpQuestions, 3-5 projectIdeas
- Make tenPoints comprehensive with 10 items numbered "01" through "10"`;

const CHAT_SYSTEM = (report) => `You are the Ask-the-Trend assistant inside AI Trend Analyzer.
The user is exploring the topic: "${report.topic}"
You have access to this intelligence report: ${JSON.stringify(report)}

Answer user questions in 2-4 sentences. Be specific, grounded in the report data. 
Never invent facts not in the report. Label interpretations as analysis.
No markdown headers. Be conversational but precise.`;

// ── Fetch Wrappers ─────────────────────────────────
async function callAnthropic(messages, system, settings) {
  const res = await fetch(settings.anthropicUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': settings.anthropicKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: settings.anthropicModel,
      max_tokens: 8000,
      system,
      messages,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Anthropic API error: ${res.status}`);
  }
  const data = await res.json();
  return (data.content || []).map(b => b.type === 'text' ? b.text : '').join('\n');
}

async function callOpenAI(messages, system, settings) {
  const res = await fetch(settings.openaiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.openaiKey}`,
    },
    body: JSON.stringify({
      model: settings.openaiModel,
      max_tokens: 8000,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `OpenAI API error: ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}

function stripFences(text) {
  return text.replace(/```json/gi, '').replace(/```/g, '').trim();
}

function safeParseJSON(text) {
  try {
    return { ok: true, data: JSON.parse(stripFences(text)) };
  } catch (e) {
    // Try to find JSON object in text
    const match = text.match(/\{[\s\S]+\}/);
    if (match) {
      try {
        return { ok: true, data: JSON.parse(match[0]) };
      } catch {}
    }
    return { ok: false, error: e.message };
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main Analysis Function ─────────────────────────
export async function analyzeTopicLive(topic, settings) {
  const messages = [{ role: 'user', content: `Analyze this topic for the AI Trend Analyzer dashboard: "${topic}"` }];

  let rawText;
  if (settings.provider === 'openai' && settings.openaiKey) {
    rawText = await callOpenAI(messages, SYSTEM_PROMPT, settings);
  } else if (settings.anthropicKey) {
    rawText = await callAnthropic(messages, SYSTEM_PROMPT, settings);
  } else {
    throw new Error('No API key configured');
  }

  const parsed = safeParseJSON(rawText);
  if (!parsed.ok) throw new Error('Failed to parse AI response: ' + parsed.error);

  return { ...parsed.data, _source: 'live' };
}

export async function analyzeTopic(topic) {
  const settings = getSettings();
  const hasKey = (settings.provider === 'openai' && settings.openaiKey) ||
                 (settings.provider === 'anthropic' && settings.anthropicKey) ||
                 (settings.provider === 'both' && (settings.anthropicKey || settings.openaiKey));

  if (hasKey) {
    try {
      return await analyzeTopicLive(topic, settings);
    } catch (err) {
      console.warn('Live AI call failed, using mock fallback:', err.message);
      if (!settings.useMockFallback) throw err;
    }
  }

  // Mock simulation with realistic latency
  await sleep(900 + Math.random() * 600);
  const report = getMockReport(topic);
  return { ...report, _source: 'demo' };
}

// ── Chat Function ──────────────────────────────────
export async function askTrend(question, report, history = []) {
  const settings = getSettings();
  const sys = CHAT_SYSTEM(report);
  const messages = [
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: question },
  ];

  const hasKey = (settings.provider === 'openai' && settings.openaiKey) ||
                 (settings.anthropicKey && settings.provider !== 'openai');

  if (hasKey) {
    try {
      if (settings.provider === 'openai' && settings.openaiKey) {
        return await callOpenAI(messages, sys, settings);
      } else if (settings.anthropicKey) {
        return await callAnthropic(messages, sys, settings);
      }
    } catch (err) {
      console.warn('Chat AI call failed, using local response');
    }
  }

  await sleep(400 + Math.random() * 400);
  return generateLocalChatAnswer(question, report);
}

function generateLocalChatAnswer(question, report) {
  const q = question.toLowerCase();

  if (q.includes('who started') || q.includes('founder') || q.includes('origin')) {
    return `Based on the intelligence report, the origins of ${report.topic} trace back to ${report.trendDNA?.origin?.period}: ${report.trendDNA?.origin?.event}. The key trigger that accelerated things was in ${report.trendDNA?.trigger?.period}.`;
  }
  if (q.includes('problem') || q.includes('challenge') || q.includes('issue')) {
    const p = report.problems?.[0];
    return p ? `The most significant documented problem is "${p.title}": ${p.description} It particularly affects ${p.affected?.join(', ')}. Current approaches include: ${p.solutions?.slice(0, 2).join(', ')}.` : `Multiple technical, economic, and social challenges exist. The Problem Detector section documents them in detail.`;
  }
  if (q.includes('future') || q.includes('next') || q.includes('predict')) {
    const s = report.futureScenarios?.nearTerm?.[0];
    return s ? `Near-term analysis (clearly labeled as AI analysis, not fact): The most likely scenario is "${s.scenario}". Key signals supporting this: ${s.signals?.slice(0, 2).join(', ')}. Main uncertainty: ${s.uncertainty} confidence level.` : 'Future scenarios depend on how several key technical and market uncertainties resolve. See the Future Analysis section for scenario details.';
  }
  if (q.includes('build') || q.includes('project') || q.includes('develop') || q.includes('startup')) {
    const idea = report.projectIdeas?.[0];
    return idea ? `One promising opportunity: "${idea.title}" — ${idea.solution}. Target users: ${idea.users}. Suggested tech: ${idea.tech?.slice(0, 3).join(', ')}. Difficulty: ${idea.difficulty}. A good MVP would be: ${idea.mvp}.` : 'The Project Ideas section contains structured opportunities with MVP suggestions and technical requirements.';
  }
  if (q.includes('who') && (q.includes('driving') || q.includes('behind') || q.includes('power'))) {
    const d = report.drivers?.[0];
    return d ? `The primary driver is "${d.name}" (${d.type}): ${d.description}. Impact: ${d.impact}.` : 'Multiple organizations, economic forces, and technological breakthroughs are all contributing to the current momentum.';
  }
  if (q.includes('why') && q.includes('popular') || q.includes('trending')) {
    return `${report.topic} is trending because: ${report.bigPicture?.whyTrending?.join('. ')}`;
  }
  if (q.includes('momentum') || q.includes('signal') || q.includes('trajectory')) {
    return `Trend signal: ${report.trendMomentum?.signal?.toUpperCase()}. ${report.trendMomentum?.description}`;
  }

  // General grounded fallback
  return `Based on the intelligence report: ${report.topic} has ${report.confidence}% AI confidence rating, with a ${report.trendMomentum?.signal} trajectory. The key insight: ${report.tenPoints?.[0]?.answer || report.bigPicture?.whatIsHappening}`;
}
