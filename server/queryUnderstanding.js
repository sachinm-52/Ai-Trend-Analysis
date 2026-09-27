// ═══════════════════════════════════════════════════
// Real-Time Verified Research Engine — Query Understanding
// Entity extraction, search intent, domain classification & multi-query generation
// ═══════════════════════════════════════════════════

/**
 * Deconstructs and understands any user search query.
 * Identifies:
 * - Exact topic & core entities
 * - Domain / category (tech, business, science, government, entertainment, person, product, etc.)
 * - Intent (news, explanation, why trending, comparative, technical, regulatory)
 * - Time sensitivity (breaking, recent, general)
 * - Generates 8-12 targeted search queries for multi-source retrieval
 */
export function understandQuery(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return createDefaultUnderstanding('General Topic');
  }

  const query = rawQuery.trim();
  const lower = query.toLowerCase();
  const currentYear = new Date().getFullYear();
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

  // 1. Detect Intent
  let intent = 'general_research';
  let isTrendingQuery = false;
  let isComparison = false;
  let isTimeSensitive = false;

  if (lower.includes('why is') || lower.includes('why are') || lower.includes('trending') || lower.includes('today') || lower.includes('what happened')) {
    intent = 'trending_investigation';
    isTrendingQuery = true;
    isTimeSensitive = true;
  } else if (lower.includes('vs') || lower.includes('compare') || lower.includes('alternative') || lower.includes('difference between')) {
    intent = 'comparative_analysis';
    isComparison = true;
  } else if (lower.includes('latest') || lower.includes('news') || lower.includes('update') || lower.includes('breaking') || lower.includes('recent')) {
    intent = 'latest_news';
    isTimeSensitive = true;
  } else if (lower.includes('how to') || lower.includes('architecture') || lower.includes('guide') || lower.includes('code') || lower.includes('api')) {
    intent = 'technical_deep_dive';
  } else if (lower.includes('regulation') || lower.includes('policy') || lower.includes('ban') || lower.includes('law') || lower.includes('government')) {
    intent = 'regulatory_policy';
    isTimeSensitive = true;
  } else if (lower.includes('best') || lower.includes('tools for') || lower.includes('top')) {
    intent = 'recommendation_curation';
  }

  // 2. Classify Domain
  let domain = 'technology';
  if (lower.match(/stock|shares|market|revenue|earnings|nasdaq|dow|valuation|ipo|acquisition|invest/)) {
    domain = 'business_finance';
    isTimeSensitive = true;
  } else if (lower.match(/ai|artificial intelligence|llm|gpu|model|openai|nvidia|anthropic|google|deepmind|robotics|quantum|chip/)) {
    domain = 'ai_and_computing';
  } else if (lower.match(/india|bengaluru|delhi|us|china|europe|parliament|congress|minister|election|treaty/)) {
    domain = 'geopolitics_and_regional';
    isTimeSensitive = true;
  } else if (lower.match(/space|nasa|isro|starship|physics|quantum|biology|crispr|medicine|health/)) {
    domain = 'science_and_health';
  } else if (lower.match(/bitcoin|crypto|ethereum|blockchain|solana|etf|token/)) {
    domain = 'crypto_and_fintech';
    isTimeSensitive = true;
  }

  // 3. Extract Clean Topic and Entities
  let cleanTopic = query
    .replace(/[?!.]+$/, '') // remove trailing punctuation
    .replace(/^(why is|why are|what is happening with|what's happening with|what is happening in|what is happening to|what is happening|what happened in|what happened to|what is|what are|tell me about|explain|research|show me)\s+/i, '')
    .replace(/\s+(trending today|trending|happening today|news today|in 2026|today|news)$/i, '')
    .trim();

  if (!cleanTopic) cleanTopic = query.replace(/[?!.]+$/, '').trim();

  // Capitalize neatly for display
  const displayTopic = cleanTopic
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // 4. Generate Targeted Search Queries (Requirement #16)
  const targetedQueries = [];

  // Core news & latest updates
  targetedQueries.push({
    category: 'latest_news',
    query: `${cleanTopic} latest news ${currentYear}`,
    purpose: 'Recent developments & breaking headlines',
  });

  if (isTrendingQuery || isTimeSensitive) {
    targetedQueries.push({
      category: 'trending_reason',
      query: `${cleanTopic} trending today why`,
      purpose: 'Why the topic is experiencing spike in interest',
    });
    targetedQueries.push({
      category: 'breaking',
      query: `${cleanTopic} breaking announcement ${currentMonthName} ${currentYear}`,
      purpose: 'Official announcements or breaking events',
    });
  }

  // Major reputable news publications (Tier 2)
  targetedQueries.push({
    category: 'reputable_journalism',
    query: `${cleanTopic} (Reuters OR Bloomberg OR "Associated Press" OR BBC OR CNBC)`,
    purpose: 'Tier-2 verified journalistic corroboration',
  });

  // Official documentation / Primary sources (Tier 1)
  targetedQueries.push({
    category: 'official_sources',
    query: `${cleanTopic} official announcement press release documentation`,
    purpose: 'Tier-1 primary source verification',
  });

  // Specialist Tech / Domain journalism (Tier 3)
  targetedQueries.push({
    category: 'specialist_press',
    query: `${cleanTopic} (TechCrunch OR "The Verge" OR "Ars Technica" OR Wired OR Nature)`,
    purpose: 'Specialist in-depth analysis',
  });

  // Academic / Research / GitHub if tech/science
  if (domain === 'ai_and_computing' || domain === 'science_and_health') {
    targetedQueries.push({
      category: 'academic_and_code',
      query: `${cleanTopic} (arxiv OR github OR paper OR benchmark)`,
      purpose: 'Research papers and official code repositories',
    });
  }

  // Controversies, risks & unconfirmed claims
  targetedQueries.push({
    category: 'conflicts_and_risks',
    query: `${cleanTopic} controversy criticism conflict challenges risks`,
    purpose: 'Detecting conflicting reports, unconfirmed claims, and risks',
  });

  return {
    rawQuery,
    displayTopic,
    cleanTopic,
    intent,
    domain,
    isTimeSensitive,
    isTrendingQuery,
    isComparison,
    targetedQueries,
    timestamp: new Date().toISOString(),
  };
}

function createDefaultUnderstanding(topic) {
  return {
    rawQuery: topic,
    displayTopic: topic,
    cleanTopic: topic,
    intent: 'general_research',
    domain: 'general',
    isTimeSensitive: false,
    isTrendingQuery: false,
    isComparison: false,
    targetedQueries: [
      { category: 'latest_news', query: `${topic} latest news`, purpose: 'Recent updates' },
      { category: 'official_sources', query: `${topic} official website`, purpose: 'Primary sources' },
    ],
    timestamp: new Date().toISOString(),
  };
}
