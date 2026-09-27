// ═══════════════════════════════════════════════════
// AI Trend Intelligence Platform — Evidence & Relevance Engine
// Source verification, relevance scoring, event deduplication & provenance
// ═══════════════════════════════════════════════════

export const EVIDENCE_TYPES = {
  VERIFIED: {
    key: 'VERIFIED',
    label: 'VERIFIED FACT',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.3)',
    description: 'Directly corroborated by primary documentation, regulatory filings, official benchmarks, or peer-reviewed literature.',
  },
  REPORTED: {
    key: 'REPORTED',
    label: 'REPORTED CLAIM',
    color: '#0EA5E9',
    bg: 'rgba(14, 165, 233, 0.12)',
    border: 'rgba(14, 165, 233, 0.3)',
    description: 'Reported by reputable journalistic outlets or industry spokespersons, subject to ongoing verification.',
  },
  AI_ANALYSIS: {
    key: 'AI_ANALYSIS',
    label: 'AI ANALYSIS',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.3)',
    description: 'Analytical synthesis, structural pattern recognition, and trend trajectory derived from available evidence.',
  },
  FUTURE_SCENARIO: {
    key: 'FUTURE_SCENARIO',
    label: 'FUTURE SCENARIO',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.3)',
    description: 'Plausible forward-looking projection based on current momentum, stated assumptions, and conditional triggers.',
  },
};

export const PUBLISHER_TIERS = {
  PRIMARY: { label: 'Primary Source', weight: 1.0, badge: 'PRIMARY' },
  TIER_1_PRESS: { label: 'Tier-1 News & Journals', weight: 0.9, badge: 'TIER-1' },
  ACADEMIC: { label: 'Academic & Peer Review', weight: 0.95, badge: 'PEER-REVIEW' },
  INDUSTRY_DATA: { label: 'Industry & Market Data', weight: 0.85, badge: 'ANALYST' },
  SECONDARY: { label: 'Ecosystem & Commentary', weight: 0.7, badge: 'SECONDARY' },
};

/**
 * Validates whether a source item directly discusses the exact topic.
 */
export function validateSourceRelevance(source, exactTopic) {
  if (!source || !exactTopic) return { isRelevant: false, score: 0 };

  const normTopic = exactTopic.toLowerCase();
  const title = (source.title || '').toLowerCase();
  const desc = (source.description || '').toLowerCase();
  const name = (source.name || '').toLowerCase();

  let score = 0;
  if (title.includes(normTopic)) score += 50;
  if (desc.includes(normTopic)) score += 30;

  // Check word-by-word presence
  const topicWords = normTopic.split(/\s+/).filter(w => w.length > 2);
  const matchedWords = topicWords.filter(w => title.includes(w) || desc.includes(w));
  score += Math.round((matchedWords.length / Math.max(topicWords.length, 1)) * 20);

  const isRelevant = score >= 40 || title.includes(normTopic);
  return { isRelevant, score: Math.min(100, score) };
}

/**
 * Deduplicates and groups multiple sources covering the same event.
 */
export function deduplicateAndGroupEvents(developments = [], groupedCoverage = []) {
  const groups = [...(groupedCoverage || [])];
  const standaloneNews = [];

  // Group by similarity or shared entities and dates
  const seenEvents = new Set();

  developments.forEach(item => {
    // Check if this item matches an existing group
    const matchedGroup = groups.find(g => {
      const gTitle = (g.event || '').toLowerCase();
      const iHead = (item.headline || '').toLowerCase();
      return (
        (item.date && g.date && item.date.includes(g.date)) ||
        iHead.split(/\s+/).some(word => word.length > 4 && gTitle.includes(word))
      );
    });

    if (matchedGroup) {
      if (!matchedGroup.sources.some(s => s.url === item.url || s.name === item.source)) {
        matchedGroup.sources.push({
          name: item.source,
          url: item.url,
          headline: item.headline,
          type: item.type || 'news',
        });
      }
    } else {
      standaloneNews.push(item);
    }
  });

  return { groupedEvents: groups, standaloneNews };
}

/**
 * Builds an evolutionary Source Timeline tracking how evidence evolved:
 * Foundation / Research -> Corporate Launch -> Industry Coverage -> Regulation / Debate
 */
export function buildSourceEvolutionTimeline(report) {
  const timeline = [];

  // 1. Research & Academic Foundation
  const researchSources = (report.sources || []).filter(s => s.type === 'research' || (s.name || '').match(/nature|arxiv|ieee|science|university/i));
  if (researchSources.length > 0) {
    timeline.push({
      stage: 'Research Foundation',
      period: researchSources[0].date || 'Foundational',
      description: 'First formal technical papers, mathematical formulations, and proof-of-concept experiments.',
      sources: researchSources.map(s => ({ name: s.name, title: s.title, url: s.url, date: s.date })),
      evidenceType: 'VERIFIED',
    });
  }

  // 2. Primary Announcement / Commercial Launch
  const companySources = (report.sources || []).filter(s => s.type === 'company' || (s.name || '').match(/announcement|filing|press release/i));
  if (companySources.length > 0) {
    timeline.push({
      stage: 'Primary Announcement',
      period: companySources[0].date || 'Product Launch',
      description: 'Direct manufacturer disclosures, technical specifications, and official keynote unveilings.',
      sources: companySources.map(s => ({ name: s.name, title: s.title, url: s.url, date: s.date })),
      evidenceType: 'VERIFIED',
    });
  }

  // 3. Press & Investigative Coverage
  const newsSources = (report.sources || []).filter(s => s.type === 'news' || (s.name || '').match(/reuters|bloomberg|techcrunch|wired|ft/i));
  if (newsSources.length > 0) {
    timeline.push({
      stage: 'Independent Press Verification',
      period: newsSources[0].date || 'Market Validation',
      description: 'Corroboration by major global business publications, teardowns, and initial enterprise user feedback.',
      sources: newsSources.slice(0, 4).map(s => ({ name: s.name, title: s.title, url: s.url, date: s.date })),
      evidenceType: 'REPORTED',
    });
  }

  // 4. Regulatory & Industry Synthesis
  const govSources = (report.sources || []).filter(s => s.type === 'government' || s.type === 'data' || (s.name || '').match(/sec|cisa|eu|statista|gartner/i));
  if (govSources.length > 0) {
    timeline.push({
      stage: 'Regulatory & Market Synthesis',
      period: govSources[0].date || 'Current Scrutiny',
      description: 'Formal compliance filings, government inquiries, market sizing audits, and policy frameworks.',
      sources: govSources.map(s => ({ name: s.name, title: s.title, url: s.url, date: s.date })),
      evidenceType: 'VERIFIED',
    });
  }

  return timeline;
}

/**
 * Formats a claim item for the "Show Me Why" Evidence Explorer.
 */
export function createEvidenceExplorationItem(claim, type, report) {
  const normType = EVIDENCE_TYPES[type] || EVIDENCE_TYPES.AI_ANALYSIS;
  const relatedSources = (report.sources || []).filter(s => {
    if (!claim) return false;
    const claimLower = claim.toLowerCase();
    return (s.title && claimLower.includes(s.title.toLowerCase().slice(0, 15))) ||
           (s.name && claimLower.includes(s.name.toLowerCase()));
  });

  return {
    claim,
    evidenceType: normType.key,
    label: normType.label,
    color: normType.color,
    bg: normType.bg,
    explanation: normType.description,
    supportingSources: relatedSources.length > 0 ? relatedSources : (report.sources || []).slice(0, 2),
    timestamp: report.researchTimestamp || new Date().toISOString(),
    exactTopic: report.exactTopic || report.topic,
  };
}
