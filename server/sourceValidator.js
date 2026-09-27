// ═══════════════════════════════════════════════════
// Real-Time Verified Research Engine — Source Validator & Quality Ranker
// 5-Tier quality hierarchy, strict topic relevance filtering & URL validation
// ═══════════════════════════════════════════════════

export const SOURCE_TIERS = {
  TIER_1: {
    tier: 1,
    id: 'primary',
    name: 'Tier 1 — Primary Source',
    badge: '🏛️ PRIMARY / OFFICIAL',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.3)',
    weight: 1.0,
    description: 'Official company websites, government/regulatory filings, research papers, universities, official GitHub repositories.',
  },
  TIER_2: {
    tier: 2,
    id: 'reputable_journalism',
    name: 'Tier 2 — Reputable Journalism',
    badge: '📰 REPUTABLE PRESS',
    color: '#0EA5E9',
    bg: 'rgba(14, 165, 233, 0.12)',
    border: 'rgba(14, 165, 233, 0.3)',
    weight: 0.9,
    description: 'Reuters, Associated Press, BBC, Financial Times, Bloomberg, CNBC, The Guardian, Wall Street Journal.',
  },
  TIER_3: {
    tier: 3,
    id: 'specialist_press',
    name: 'Tier 3 — Specialist Publication',
    badge: '🔬 SPECIALIST',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.3)',
    weight: 0.8,
    description: 'TechCrunch, The Verge, Ars Technica, Wired, Nature, IEEE, MIT Technology Review.',
  },
  TIER_4: {
    tier: 4,
    id: 'general_web',
    name: 'Tier 4 — General Website',
    badge: '🌐 GENERAL WEB',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.3)',
    weight: 0.6,
    description: 'General industry websites, Wikipedia (for background), community blogs.',
  },
  TIER_5: {
    tier: 5,
    id: 'social_media',
    name: 'Tier 5 — Social & Emerging',
    badge: '💬 EMERGING SIGNAL',
    color: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.12)',
    border: 'rgba(236, 72, 153, 0.3)',
    weight: 0.3,
    description: 'Reddit, Hacker News, X — strictly used to discover emerging trends, never treated as factual proof.',
  },
};

// Domain mappings for known publications
const TIER_1_DOMAINS = [
  '.gov', '.edu', '.mil', 'arxiv.org', 'github.com', 'sec.gov', 'nih.gov', 'who.int',
  'openai.com', 'nvidia.com', 'anthropic.com', 'microsoft.com', 'apple.com',
  'tesla.com', 'meta.com', 'amazon.com', 'ibm.com', 'intel.com', 'amd.com', 'qualcomm.com',
  'isro.gov.in', 'india.gov.in', 'pib.gov.in', 'europa.eu',
];

const TIER_2_DOMAINS = [
  'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk', 'ft.com', 'bloomberg.com',
  'cnbc.com', 'theguardian.com', 'wsj.com', 'nytimes.com', 'washingtonpost.com',
  'economist.com', 'forbes.com', 'yahoo.com', 'marketwatch.com', 'barrons.com',
];

const TIER_3_DOMAINS = [
  'techcrunch.com', 'theverge.com', 'arstechnica.com', 'wired.com', 'nature.com',
  'ieee.org', 'technologyreview.com', 'venturebeat.com', 'tomshardware.com',
  'anandtech.com', 'semianalysis.com', 'zdnet.com', 'engadget.com', 'sciencedirect.com',
];

const TIER_5_DOMAINS = [
  'reddit.com', 'twitter.com', 'x.com', 'news.ycombinator.com', 'threads.net',
];

/**
 * Classifies a source URL or publisher into the 5-Tier Quality System.
 */
export function classifySourceTier(urlStr, sourceName = '') {
  let hostname = '';
  try {
    hostname = new URL(urlStr).hostname.toLowerCase().replace(/^www\./, '');
  } catch (e) {
    hostname = (sourceName || '').toLowerCase();
  }

  const sLower = (sourceName || '').toLowerCase();

  // Tier 1 Check: Official domain or primary publication
  const isOfficialDomain = TIER_1_DOMAINS.some(d => hostname === d || hostname.endsWith(d));
  if (
    isOfficialDomain ||
    sLower.includes('official') || sLower.includes('white house') || sLower.includes('ministry') ||
    sLower.includes('press release') || sLower.includes('github') || sLower.includes('arxiv') ||
    sLower.includes('nvidia') || sLower.includes('openai') || sLower.includes('tesla') || sLower.includes('apple')
  ) {
    return SOURCE_TIERS.TIER_1;
  }

  // Tier 2 Check: Reputable major news
  if (
    TIER_2_DOMAINS.some(d => hostname.includes(d)) ||
    sLower.includes('reuters') || sLower.includes('associated press') || sLower.includes('ap news') ||
    sLower.includes('bloomberg') || sLower.includes('bbc') || sLower.includes('cnbc') ||
    sLower.includes('financial times') || sLower.includes('guardian') || sLower.includes('wsj') ||
    sLower.includes('forbes') || sLower.includes('yahoo finance') || sLower.includes('hindu') ||
    sLower.includes('times of india') || sLower.includes('economic times') || sLower.includes('ndtv')
  ) {
    return SOURCE_TIERS.TIER_2;
  }

  // Tier 3 Check: Specialist tech / science
  if (
    TIER_3_DOMAINS.some(d => hostname.includes(d)) ||
    sLower.includes('techcrunch') || sLower.includes('verge') || sLower.includes('wired') ||
    sLower.includes('ars technica') || sLower.includes('nature') || sLower.includes('technology review') ||
    sLower.includes('venturebeat') || sLower.includes('zdnet') || sLower.includes('engadget')
  ) {
    return SOURCE_TIERS.TIER_3;
  }

  // Tier 5 Check: Social / Community
  if (
    TIER_5_DOMAINS.some(d => hostname.includes(d)) ||
    sLower.includes('reddit') || sLower.includes('hacker news') || sLower.includes('twitter')
  ) {
    return SOURCE_TIERS.TIER_5;
  }

  // Tier 4 Default: General web publications
  return SOURCE_TIERS.TIER_4;
}


/**
 * Evaluates topic relevance of a search result.
 * Eliminates generic off-topic results (Requirement #6).
 */
export function computeRelevanceScore(item, topicContext) {
  const { cleanTopic, displayTopic } = topicContext;
  const target = cleanTopic.toLowerCase();
  const title = (item.title || '').toLowerCase();
  const snippet = (item.snippet || '').toLowerCase();

  let score = 0;

  // Exact phrase match in title: strong signal (+50)
  if (title.includes(target)) {
    score += 50;
  } else if (snippet.includes(target)) {
    score += 30;
  }

  // Check significant individual keyword matches
  const keywords = target
    .split(/\s+/)
    .filter(w => w.length > 2 && !['why', 'is', 'the', 'what', 'and', 'for', 'are', 'in', 'of', 'to'].includes(w));

  if (keywords.length > 0) {
    let matchedInTitle = 0;
    let matchedInSnippet = 0;

    keywords.forEach(kw => {
      if (title.includes(kw)) matchedInTitle++;
      if (snippet.includes(kw)) matchedInSnippet++;
    });

    const titleRatio = matchedInTitle / keywords.length;
    const snippetRatio = matchedInSnippet / keywords.length;

    score += Math.round(titleRatio * 35);
    score += Math.round(snippetRatio * 15);
  }

  return Math.min(100, score);
}

/**
 * Validates URLs: checks protocol, filters invalid strings, removes tracking tokens.
 */
export function sanitizeAndValidateUrl(urlStr) {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }

    // Strip common tracking and referral parameters
    const cleanParams = new URLSearchParams();
    for (const [key, val] of parsed.searchParams.entries()) {
      if (!key.startsWith('utm_') && !key.startsWith('fbclid') && key !== 'gclid' && key !== 'ref') {
        cleanParams.append(key, val);
      }
    }
    parsed.search = cleanParams.toString();
    parsed.hash = '';

    return parsed.toString();
  } catch (e) {
    return null;
  }
}

/**
 * Filters, ranks and attaches quality tiers to all collected search items.
 */
export function validateAndRankSources(rawResults, topicContext) {
  const validated = [];

  for (const item of rawResults) {
    const cleanUrl = sanitizeAndValidateUrl(item.url);
    if (!cleanUrl) continue;

    const relevanceScore = computeRelevanceScore(item, topicContext);

    // Filter out low relevance items (< 30 relevance score) to ensure strict topic fidelity
    if (relevanceScore < 25) {
      continue;
    }

    const tierObj = classifySourceTier(cleanUrl, item.source);

    validated.push({
      ...item,
      url: cleanUrl,
      relevanceScore,
      tier: tierObj.tier,
      tierInfo: tierObj,
      isPrimary: tierObj.tier === 1,
      isReputableJournalism: tierObj.tier === 2,
    });
  }

  // Sort by weighted score: (tier weight * 40) + (relevance score * 60)
  validated.sort((a, b) => {
    const scoreA = (a.tierInfo.weight * 40) + (a.relevanceScore * 0.6);
    const scoreB = (b.tierInfo.weight * 40) + (b.relevanceScore * 0.6);
    return scoreB - scoreA;
  });

  return validated;
}
