// ═══════════════════════════════════════════════════
// AI Trend Intelligence Platform — AI Engine
// Unified execution across Live AI (Claude/GPT) and Verified Intelligence
// ═══════════════════════════════════════════════════

import { getMockReport } from '../data/mockDatabase';
import { analyzeQuery } from './queryIntelligence';
import { buildSourceEvolutionTimeline, deduplicateAndGroupEvents } from './evidenceEngine';

// ── Settings Management ──────────────────────────
const SETTINGS_KEY = 'aitrend_settings_v2';

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
  };
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── Live Progressive Research Stages (Requirement #25) ──────────────
export const RESEARCH_STAGES = [
  'Understanding query & identifying key entities…',
  'Generating targeted multi-source search queries…',
  'Searching live web & news across multiple providers…',
  'Verifying URLs & evaluating source credibility…',
  'Checking official & primary documentation…',
  'Detecting conflicts & cross-checking evidence…',
  'Synthesizing verified factual dossier with citations…',
  'Finalizing research intelligence report…',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main Analysis Orchestrator ─────────────────────
export async function analyzeTopic(topic, onProgress, mode = 'quick', forceRefresh = false) {
  // Start progressive loading stages
  let stageIdx = 0;
  const stageInterval = setInterval(() => {
    if (onProgress && stageIdx < RESEARCH_STAGES.length) {
      onProgress(RESEARCH_STAGES[stageIdx], (stageIdx + 1) / RESEARCH_STAGES.length);
      stageIdx++;
    }
  }, 350);

  try {
    const res = await fetch('/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: topic, mode, forceRefresh }),
    });

    clearInterval(stageInterval);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Research request failed (${res.status})`);
    }

    const data = await res.json();

    if (!data.success && data.error) {
      throw new Error(data.error);
    }

    // Complement with deep profile if needed
    const queryIntel = analyzeQuery(topic);
    const enriched = enrichReport(data, topic, queryIntel);
    return { ...enriched, _source: 'live' };
  } catch (err) {
    clearInterval(stageInterval);
    // If it's the specific zero-verification error, throw it directly
    if (err.message?.includes("couldn't verify current information")) {
      throw err;
    }
    console.warn('Live research endpoint encountered an issue:', err.message);
    // If live API unavailable, check mock database only as graceful fallback
    const settings = getSettings();
    if (settings.useMockFallback) {
      const queryIntel = analyzeQuery(topic);
      const baseReport = getMockReport(topic);
      const enriched = enrichReport(baseReport, topic, queryIntel);
      return { ...enriched, _source: baseReport._source || 'demo' };
    }
    throw err;
  }
}

export async function deepDiveTopic(topic, onProgress) {
  return await analyzeTopic(topic, onProgress, 'deep', true);
}

export async function searchMoreTopic(topic, currentSources = []) {
  try {
    const res = await fetch('/api/search-more', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, currentSources }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Search more request failed:', err);
    return null;
  }
}

function enrichReport(report, rawQuery, queryIntel) {
  const exactTopic = report.exactTopic || report.topic || queryIntel.exactTopic || rawQuery;
  const dedup = deduplicateAndGroupEvents(report.present?.latestDevelopments, report.groupedCoverage || report.present?.groupedCoverage);
  const sourceTimeline = buildSourceEvolutionTimeline(report);

  return {
    ...report,
    searchedTopic: rawQuery,
    exactTopic,
    queryIntelligence: queryIntel,
    sourceEvolutionTimeline: sourceTimeline,
    deduplicatedNews: dedup.standaloneNews,
    groupedCoverage: dedup.groupedEvents,
    researchTimestamp: report.researchTimestamp || new Date().toISOString(),
  };
}


// ── Grounded Chat System ───────────────────────────
const CHAT_SYSTEM = (report) => `You are the Ask-This-Topic Intelligence Chatbot for "${report.topic}".
You have access to this comprehensive synthesized intelligence dossier:
${JSON.stringify({
  topic: report.topic,
  status: report.currentStatus,
  summary: report.profile?.description,
  people: report.people,
  entities: report.entities,
  timeline: (report.timeline || []).slice(0, 8),
  latestDevelopments: report.present?.latestDevelopments,
  problems: report.problems,
  opportunities: report.opportunities,
  sources: report.sources,
})}

RULES:
1. Always ground your answers strictly in the provided report data.
2. If asked something not in the report, explicitly state: "This specific detail is not documented in the verified intelligence dossier for ${report.topic}."
3. Keep answers concise (2-4 paragraphs max), precise, and professional.
4. If discussing future scenarios, explicitly preface with "Based on AI scenario analysis".`;

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
      console.warn('Chat AI call failed, using local grounded response');
    }
  }

  await sleep(400 + Math.random() * 300);
  return generateLocalChatAnswer(question, report);
}

function generateLocalChatAnswer(question, report) {
  const q = question.toLowerCase();

  if (q.includes('beginner') || q.includes('explain like') || q.includes('simple')) {
    return report.summaryModes?.student || report.summaryModes?.quick || `${report.topic} is a significant development in ${report.category}.`;
  }
  if (q.includes('who') || q.includes('people') || q.includes('founder') || q.includes('architect')) {
    const p = (report.people || []).slice(0, 3);
    if (p.length > 0) {
      return `Key individuals driving ${report.topic} include: ${p.map(x => `${x.name} (${x.role} at ${x.org}) — ${x.whyTheyMatter || x.contribution}`).join('; ')}.`;
    }
  }
  if (q.includes('timeline') || q.includes('history') || q.includes('when')) {
    const events = (report.timeline || []).slice(-4);
    if (events.length > 0) {
      return `Recent timeline milestones for ${report.topic}: ${events.map(e => `[${e.year}] ${e.event} (${e.what})`).join('; ')}.`;
    }
  }
  if (q.includes('problem') || q.includes('challenge') || q.includes('risk') || q.includes('bottleneck')) {
    const prob = (report.problems || report.riskRadar || [])[0];
    if (prob) {
      return `A major documented problem is "${prob.title || prob.problem}": ${prob.description || prob.evidence} It primarily impacts ${Array.isArray(prob.affected) ? prob.affected.join(', ') : 'the ecosystem'}.`;
    }
  }
  if (q.includes('opportunity') || q.includes('project') || q.includes('idea') || q.includes('build')) {
    const build = report.buildSomething || (report.projectIdeas || [])[0];
    if (build) {
      return `A practical project concept you can build around ${report.topic} is "${build.title}": ${build.solution || build.problem}. Recommended tech stack: ${(build.techStack || build.tech || []).join(', ')}.`;
    }
  }
  if (q.includes('source') || q.includes('citation') || q.includes('verified') || q.includes('proof')) {
    const s = (report.sources || []).slice(0, 3);
    return `Verified sources corroborating this dossier include: ${s.map(src => `${src.name} ("${src.title}", ${src.date})`).join('; ')}. Complete citations are accessible in the Sources and Evidence Audit panel.`;
  }
  if (q.includes('changed') || q.includes('recent') || q.includes('latest') || q.includes('now')) {
    const dev = report.present?.latestDevelopments?.[0];
    return `Latest documented development: "${dev?.headline}" (${dev?.date}, reported by ${dev?.publisher || dev?.source}). ${dev?.summary || ''} Current status: ${report.present?.currentStatus || report.currentStatus}.`;
  }

  return `Based on the verified intelligence dossier: ${report.topic} is categorized under ${report.category} (${report.subcategory || 'Technology'}). Current trajectory: ${report.trendMomentum?.signal?.toUpperCase()} — ${report.trendMomentum?.description || report.profile?.description}`;
}
