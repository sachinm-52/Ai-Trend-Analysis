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
const SYSTEM_PROMPT = `You are the AI Trend Analyzer intelligence engine. Your MOST IMPORTANT job is to be EXACTLY relevant to what the user searched for — not the broader category, not a related topic, but the EXACT topic.

STEP 1 — UNDERSTAND THE EXACT TOPIC:
Before generating any content, identify:
- exactTopic: The precise entity/topic being searched
- topicType: "company" | "person" | "technology" | "concept" | "product" | "event" | "geo-topic"
- geographicContext: Any specific geographic scope (e.g. ["India"] for "Tesla India")
- timeContext: Any time-related context (e.g. "recent", "historical", "2024")
- relatedEntities: Directly related entities (NOT loosely related ones)
- keywords: Most specific keywords for this exact topic

CRITICAL RELEVANCE RULES:
- If the user searches "OpenAI Sora", ONLY return information about Sora. Do NOT include ChatGPT news, general OpenAI news, or other AI tools unless directly connected to Sora.
- If the user searches "Tesla India", ONLY return information about Tesla's activities, plans, and developments in India specifically.
- If the user searches "AI agents in healthcare", focus specifically on AI agents used in healthcare contexts.
- If the user searches a specific person, focus on that person — not their organization broadly.
- NEVER return generic information about the broader category when a specific entity is searched.

STEP 2 — GENERATE THE REPORT:
Produce a SINGLE valid JSON object with this EXACT schema (all fields required):

{
  "topic": string,                  // Display name (e.g. "OpenAI Sora")
  "exactTopic": string,             // Normalized exact topic
  "topicType": string,              // company|person|technology|concept|product|event|geo-topic
  "category": string,               // Broad category
  "subcategory": string,            // Specific subcategory
  "currentStatus": string,          // 1-3 words: current state
  "confidence": number,             // 0-100
  "geographicContext": string[],    // Specific geographies if relevant, e.g. ["India", "Mumbai"]
  "timeContext": string,            // e.g. "current", "historical", "2023-present"
  "keywords": string[],             // 5-8 most specific keywords for this topic
  "relatedTopics": string[],        // 4-6 directly related topics
  "researchTimestamp": string,      // Current date in ISO format: "2026-09-17T18:35:00+05:30"
  "trendMomentum": {
    "signal": "rising"|"stable"|"declining"|"emerging",
    "description": string,
    "level": number
  },
  "profile": {
    "description": string,          // 2-4 sentence description of the EXACT topic
    "majorEntities": string[],
    "keyPeople": string[],
    "majorTechnologies": string[],
    "industriesAffected": string[]
  },

  "past": {
    "origin": {
      "period": string,             // e.g. "2022" or "Early 2020s"
      "location": string,           // Where it started
      "description": string         // How and why it started
    },
    "importantPeople": [
      {
        "name": string,
        "role": string,
        "org": string,
        "period": string,           // When they were most relevant
        "contribution": string      // What they did specifically for THIS topic
      }
    ],
    "importantOrgs": [
      {
        "name": string,
        "type": string,             // company|institution|government|research
        "role": string,             // Role specifically in this topic
        "period": string
      }
    ],
    "turningPoints": [
      {
        "year": string,
        "event": string,
        "significance": string,     // Why this was a turning point
        "entities": string[]        // Who/what was involved
      }
    ]
  },

  "timeline": [
    {
      "year": string,
      "date": string,
      "event": string,
      "who": string,
      "what": string,
      "why": string,
      "impact": "HIGH"|"MEDIUM"|"LOW",
      "turningPoint": boolean,
      "source": string              // Source name for this event
    }
  ],

  "present": {
    "currentStatus": string,        // 2-4 sentence description of RIGHT NOW
    "statusDate": string,           // e.g. "September 2026"
    "latestDevelopments": [
      {
        "headline": string,
        "date": string,             // Must show specific date/month
        "entity": string,           // Person or org involved
        "summary": string,          // 2-3 sentence explanation
        "source": string,           // Source name (e.g. "Reuters", "TechCrunch", "OpenAI")
        "url": string,              // REAL URL — do not invent URLs, use official domains
        "type": "news"|"announcement"|"research"|"regulatory"
      }
    ],
    "groupedCoverage": [
      {
        "event": string,            // Brief event description
        "date": string,
        "sources": [
          { "name": string, "url": string }
        ]
      }
    ]
  },

  "future": {
    "disclaimer": "AI-generated scenario analysis based on current signals. Not confirmed information.",
    "nearTerm": [
      {
        "horizon": "Next several months",
        "scenario": string,
        "signals": string[],        // Current evidence supporting this
        "opportunities": string[],
        "challenges": string[],
        "trigger": string,          // What would need to happen
        "impact": string,
        "uncertainty": "high"|"medium"|"low",
        "type": "growth"|"risk"|"disruption"
      }
    ],
    "mediumTerm": [
      {
        "horizon": "1-3 years",
        "scenario": string,
        "signals": string[],
        "opportunities": string[],
        "challenges": string[],
        "trigger": string,
        "impact": string,
        "uncertainty": "high"|"medium"|"low",
        "type": "growth"|"risk"|"disruption"
      }
    ],
    "longTerm": [
      {
        "horizon": "3-10 years",
        "scenario": string,
        "signals": string[],
        "opportunities": string[],
        "challenges": string[],
        "trigger": string,
        "impact": string,
        "uncertainty": "high"|"medium"|"low",
        "type": "growth"|"risk"|"disruption"
      }
    ],
    "futureSignals": [
      {
        "signal": string,           // Observable current signal
        "impact": string,           // Possible impact
        "implication": string       // Future implication
      }
    ]
  },

  "people": [{ "name": string, "role": string, "org": string, "contribution": string, "influence": "very high"|"high"|"medium", "period": "past"|"present"|"both" }],
  "entities": [{ "name": string, "type": "company"|"technology"|"institution", "industry": string, "role": string, "products": string[], "relationship": string }],
  "drivers": [{ "name": string, "type": string, "description": string, "impact": string }],
  "problems": [{ "id": string, "category": string, "title": string, "description": string, "evidence": string, "affected": string[], "severity": "high"|"medium"|"low", "solutions": string[], "gaps": string, "evidenceStrength": "high"|"medium"|"low" }],
  "opportunities": [{ "problem": string, "improvement": string, "whoCouldBuild": string, "impact": string, "difficulty": string }],
  "deepDiscovery": [{ "title": string, "description": string, "whyInteresting": string, "type": string }],
  "earlySignals": [{ "signal": string, "why": string, "confidence": "early"|"emerging"|"possible", "source": string }],

  "sources": [
    {
      "name": string,               // Source name
      "title": string,              // Article/page title
      "type": "news"|"research"|"company"|"government"|"data",
      "date": string,               // Publication date
      "url": string,                // REAL URL — official domains only, never invent URLs
      "description": string         // 1-2 sentence description
    }
  ],

  "geographicRelevance": string[],
  "trendDNA": {
    "origin": { "period": string, "event": string },
    "trigger": { "period": string, "event": string },
    "growth": { "period": string, "event": string },
    "acceleration": { "period": string, "event": string },
    "now": { "period": string, "event": string },
    "future": { "period": string, "event": string }
  },
  "heatmap": [{ "area": string, "heat": number, "trend": "rising"|"stable"|"declining"|"emerging", "description": string }],
  "comparison": { "headers": string[], "rows": string[][] },
  "summaryModes": {
    "quick": string,
    "deep": string,
    "student": string,
    "business": string,
    "builder": string,
    "research": string
  },
  "projectIdeas": [{ "title": string, "problem": string, "solution": string, "tech": string[], "difficulty": string, "mvp": string, "users": string }],
  "followUpQuestions": [{ "question": string, "topic": string }],
  "tenPoints": [{ "num": string, "question": string, "answer": string }],
  "bigPicture": {
    "whatIsHappening": string,
    "whyTrending": string[],
    "whyShouldICare": string,
    "whoIsAffected": [{ "group": string, "impact": string, "direction": "positive"|"negative"|"mixed" }]
  }
}

ACCURACY RULES — NEVER VIOLATE:
- NEVER invent people, companies, dates, statistics, events, quotes, or URLs
- For URLs: use only official/well-known domains. If you cannot verify the exact URL, use the domain root (e.g. "https://openai.com" or "https://reuters.com") — never fabricate paths
- If information cannot be verified: state "Information could not be verified from available sources"
- Current date context: September 17, 2026. Do not fabricate events after your knowledge cutoff
- Every source.url must be a real, navigable URL (use root domains if article URL unknown)
- Clearly distinguish facts from analysis in scenario sections

QUANTITY REQUIREMENTS:
- timeline: 6-10 events
- past.importantPeople: 3-6 people
- past.importantOrgs: 3-6 organizations
- past.turningPoints: 3-5 turning points
- present.latestDevelopments: 4-8 items with specific dates
- present.groupedCoverage: 2-4 groups
- future.nearTerm: 2-3 scenarios
- future.mediumTerm: 2-3 scenarios
- future.longTerm: 1-2 scenarios
- future.futureSignals: 4-6 signals
- sources: 5-8 real sources with URLs
- people: 4-8 people
- deepDiscovery: 3-5 items

Respond with ONLY the JSON object, no prose, no markdown fences.`;

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
  const messages = [{
    role: 'user',
    content: `Analyze this EXACT topic for the AI Trend Analyzer. Stay precisely on-topic — do not expand to the broader category unless the topic itself IS the broad category.\n\nUser's exact search query: "${topic}"\n\nGenerate the complete Past/Present/Future intelligence report for: "${topic}"`
  }];

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

  return { ...parsed.data, _source: 'live', researchTimestamp: new Date().toISOString() };
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
  return { ...report, _source: 'demo', researchTimestamp: new Date().toISOString() };
}

// ── Deep Dive (more extensive research) ────────────
export async function deepDiveTopic(topic) {
  const settings = getSettings();
  const hasKey = (settings.provider === 'openai' && settings.openaiKey) ||
                 (settings.provider === 'anthropic' && settings.anthropicKey) ||
                 (settings.provider === 'both' && (settings.anthropicKey || settings.openaiKey));

  const deepDiveMessages = [{
    role: 'user',
    content: `DEEP DIVE RESEARCH MODE: Perform a comprehensive, in-depth analysis of this EXACT topic. Provide more detailed timelines (8-12 events), more people (6-10), more sources (8-12), more future signals, and richer past history.\n\nTopic: "${topic}"\n\nGenerate an EXTENSIVE Past/Present/Future intelligence report.`
  }];

  if (hasKey) {
    try {
      let rawText;
      if (settings.provider === 'openai' && settings.openaiKey) {
        rawText = await callOpenAI(deepDiveMessages, SYSTEM_PROMPT, settings);
      } else if (settings.anthropicKey) {
        rawText = await callAnthropic(deepDiveMessages, SYSTEM_PROMPT, settings);
      }
      const parsed = safeParseJSON(rawText);
      if (!parsed.ok) throw new Error('Failed to parse AI response');
      return { ...parsed.data, _source: 'live', _deepDive: true, researchTimestamp: new Date().toISOString() };
    } catch (err) {
      console.warn('Deep Dive AI call failed, using mock fallback:', err.message);
    }
  }

  await sleep(1500 + Math.random() * 800);
  const report = getMockReport(topic);
  return { ...report, _source: 'demo', _deepDive: true, researchTimestamp: new Date().toISOString() };
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

  if (q.includes('who started') || q.includes('founder') || q.includes('origin') || q.includes('history')) {
    const origin = report.past?.origin;
    return origin
      ? `The origins of ${report.topic} trace back to ${origin.period}${origin.location ? ` in ${origin.location}` : ''}: ${origin.description}`
      : `Based on the intelligence report, the origins of ${report.topic} trace back to ${report.trendDNA?.origin?.period}: ${report.trendDNA?.origin?.event}. The key trigger was in ${report.trendDNA?.trigger?.period}.`;
  }
  if (q.includes('problem') || q.includes('challenge') || q.includes('issue')) {
    const p = report.problems?.[0];
    return p ? `The most significant documented problem is "${p.title}": ${p.description} It particularly affects ${p.affected?.join(', ')}.` : `Multiple technical, economic, and social challenges exist. The analysis documents them in detail.`;
  }
  if (q.includes('future') || q.includes('next') || q.includes('predict')) {
    const s = report.future?.nearTerm?.[0] || report.futureScenarios?.nearTerm?.[0];
    return s ? `Near-term scenario (clearly labeled as AI analysis, not fact): "${s.scenario}". Key signals: ${s.signals?.slice(0, 2).join(', ')}. Uncertainty level: ${s.uncertainty}.` : 'Future scenarios depend on how several key uncertainties resolve. See the Future Analysis section.';
  }
  if (q.includes('now') || q.includes('current') || q.includes('today') || q.includes('latest')) {
    const status = report.present?.currentStatus;
    return status ? `Current status: ${status}` : `${report.topic} has a ${report.trendMomentum?.signal} trajectory. ${report.trendMomentum?.description}`;
  }
  if (q.includes('source') || q.includes('where') || q.includes('reference')) {
    const src = report.sources?.[0];
    return src ? `One key source is ${src.name}: "${src.title}" (${src.date}). ${report.sources?.length || 0} total sources are listed in the Sources section.` : `Sources are listed at the bottom of the report.`;
  }

  return `Based on the intelligence report: ${report.topic} (${report.topicType || 'topic'}) currently has a ${report.trendMomentum?.signal} trajectory with ${report.confidence}% confidence. ${report.present?.currentStatus || report.bigPicture?.whatIsHappening || ''}`;
}
