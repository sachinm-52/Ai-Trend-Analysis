// ═══════════════════════════════════════════════════
// AI Trend Intelligence Platform — Query Intelligence Engine
// Deep query understanding, entity extraction & multi-query generation
// ═══════════════════════════════════════════════════

/**
 * Known entity dictionary to accelerate high-precision extraction
 * for key domains, people, companies, hardware, and concepts.
 */
const ENTITY_KNOWLEDGE_BASE = {
  'nvidia blackwell': {
    exactTopic: 'NVIDIA Blackwell',
    topicType: 'product',
    entityType: 'gpu_architecture',
    industry: 'Semiconductors & AI Compute',
    location: 'Global / USA',
    timePeriod: '2024-2026',
    relatedEntities: ['NVIDIA', 'TSMC', 'B200', 'GB200 NVL72', 'Jensen Huang', 'CUDA', 'CoWoS Packaging'],
    keywords: ['Blackwell B200', 'GB200 NVL72', 'TSMC CoWoS-L', 'liquid cooling', 'FP4 precision', 'hyperscaler capex', 'NVLink 5'],
    searchContext: 'Evaluating NVIDIA\'s next-generation Blackwell B200/GB200 GPU architecture, manufacturing yield at TSMC, power requirements, enterprise delivery timelines, and performance benchmarks vs Hopper H100.',
  },
  'openai': {
    exactTopic: 'OpenAI',
    topicType: 'company',
    entityType: 'ai_research_lab',
    industry: 'Artificial Intelligence',
    location: 'United States',
    timePeriod: '2015-Present',
    relatedEntities: ['Sam Altman', 'Microsoft', 'ChatGPT', 'GPT-4o', 'o3', 'Sora', 'Stargate'],
    keywords: ['GPT-4o', 'OpenAI o3', 'ChatGPT', 'Sam Altman', 'AGI safety', 'Microsoft partnership', 'operator agent'],
    searchContext: 'Analyzing OpenAI corporate structure, frontier reasoning models (o1/o3), revenue trajectory, compute partnerships, and product releases.',
  },
  'tesla optimus': {
    exactTopic: 'Tesla Optimus',
    topicType: 'product',
    entityType: 'humanoid_robotics',
    industry: 'Robotics & Embodied AI',
    location: 'United States',
    timePeriod: '2021-2026',
    relatedEntities: ['Tesla', 'Elon Musk', 'FSD Neural Net', 'Optimus Gen 2', 'Figure AI', 'Boston Dynamics'],
    keywords: ['Optimus Gen 2', 'actuators', 'neural network vision', 'factory automation', 'hands degrees of freedom', 'autonomous dexterity'],
    searchContext: 'Tracking Tesla Optimus humanoid robot development, hardware iterations, hand articulation, factory pilot deployment, and production timeline.',
  },
  'ai agents in 2026': {
    exactTopic: 'AI Agents in 2026',
    topicType: 'technology',
    entityType: 'autonomous_software',
    industry: 'Artificial Intelligence & Software',
    location: 'Global',
    timePeriod: '2025-2026',
    relatedEntities: ['Anthropic Computer Use', 'OpenAI Operator', 'AutoGPT', 'LangChain', 'CrewAI', 'MCP Protocol'],
    keywords: ['autonomous agents', 'computer use', 'agentic workflows', 'tool use', 'MCP protocol', 'multi-agent orchestration', 'runtime safety'],
    searchContext: 'Assessing the transition from prompt-response conversational AI to autonomous agentic systems that operate browsers, terminals, APIs, and multi-step workflows.',
  },
  'apple vision pro': {
    exactTopic: 'Apple Vision Pro',
    topicType: 'product',
    entityType: 'spatial_computing',
    industry: 'Consumer Electronics & Spatial Computing',
    location: 'Global / USA',
    timePeriod: '2023-2026',
    relatedEntities: ['Apple', 'visionOS', 'Tim Cook', 'Micro-OLED', 'Meta Quest 3', 'Spatial Audio'],
    keywords: ['visionOS', 'Micro-OLED displays', 'eye tracking', 'spatial computing', 'enterprise adoption', 'app ecosystem', 'weight ergonomics'],
    searchContext: 'Investigating Apple Vision Pro market reception, developer ecosystem growth, enterprise spatial computing adoption, hardware ergonomics, and supply chain adjustments.',
  },
  'indian ev market': {
    exactTopic: 'Indian EV Market',
    topicType: 'market',
    entityType: 'mobility_ecosystem',
    industry: 'Automotive & Clean Energy',
    location: 'India',
    timePeriod: '2023-2026',
    relatedEntities: ['Tata Motors', 'Ola Electric', 'Mahindra', 'Ather Energy', 'FAME III / PM E-DRIVE', 'Bureau of Indian Standards'],
    keywords: ['PM E-DRIVE scheme', 'two-wheeler EV adoption', 'Tata Curvv EV', 'Ola Electric Gigafactory', 'LFP battery manufacturing', 'charging infrastructure'],
    searchContext: 'Examining the growth trajectory, government incentives (PM E-DRIVE), 2-wheeler vs 4-wheeler penetration, local battery cell manufacturing, and charging density in India.',
  },
  'bengaluru ai startups': {
    exactTopic: 'Bengaluru AI Startups',
    topicType: 'geo-topic',
    entityType: 'regional_ecosystem',
    industry: 'Artificial Intelligence & Venture Capital',
    location: 'Bengaluru, India',
    timePeriod: '2024-2026',
    relatedEntities: ['Krutrim', 'Sarvam AI', 'Karya', 'Yellow.ai', 'Peak XV', 'IndiaAI Mission'],
    keywords: ['Indic LLMs', 'Sarvam AI', 'Krutrim', 'IndiaAI Mission funding', 'Bengaluru tech corridor', 'enterprise GenAI', 'B2B AI agents'],
    searchContext: 'Mapping Bengaluru\'s emerging AI startup cluster, Indic language foundation models, enterprise agentic SaaS, compute access challenges, and early-stage venture funding.',
  },
  'quantum computing': {
    exactTopic: 'Quantum Computing',
    topicType: 'technology',
    entityType: 'computational_physics',
    industry: 'Advanced Computing & Deep Tech',
    location: 'Global',
    timePeriod: '2020-Present',
    relatedEntities: ['IBM Quantum', 'Google Quantum AI', 'IonQ', 'Rigetti', 'PsiQuantum', 'Post-Quantum Cryptography (NIST)'],
    keywords: ['qubits', 'quantum error correction', 'logical qubits', 'superconducting', 'ion trap', 'quantum advantage', 'neutral atoms'],
    searchContext: 'Tracking progress in quantum error correction, fault-tolerant logical qubits, post-quantum cryptographic migration, and commercial quantum utility benchmarks.',
  },
  'cybersecurity': {
    exactTopic: 'Cybersecurity',
    topicType: 'concept',
    entityType: 'information_security',
    industry: 'Enterprise Security & Defense',
    location: 'Global',
    timePeriod: '2024-2026',
    relatedEntities: ['CrowdStrike', 'Palo Alto Networks', 'Microsoft Security', 'CISA', 'Mandiant', 'Cloudflare'],
    keywords: ['Zero Trust architecture', 'AI-driven phishing', 'ransomware negotiation', 'cloud security posture', 'identity access management', 'supply chain attacks'],
    searchContext: 'Analyzing modern cybersecurity challenges including AI-weaponized exploits, cloud infrastructure vulnerabilities, nation-state threats, and autonomous defense agents.',
  },
  'openai sora': {
    exactTopic: 'OpenAI Sora',
    topicType: 'product',
    entityType: 'generative_video_model',
    industry: 'Artificial Intelligence & Media',
    location: 'United States',
    timePeriod: '2024-2026',
    relatedEntities: ['OpenAI', 'Tim Brooks', 'Bill Peebles', 'Runway Gen-3', 'Luma Dream Machine', 'Kling AI'],
    keywords: ['spacetime latent patches', 'diffusion transformer', 'text-to-video', 'world simulator physics', 'Hollywood studio pilots', 'watermarking'],
    searchContext: 'Evaluating OpenAI Sora video generation architecture, temporal consistency, physics simulation fidelity, commercial release terms, and Hollywood creative trials.',
  },
  'tesla india': {
    exactTopic: 'Tesla India',
    topicType: 'geo-topic',
    entityType: 'corporate_expansion',
    industry: 'Automotive & Clean Energy',
    location: 'India',
    timePeriod: '2021-2026',
    relatedEntities: ['Tesla', 'Elon Musk', 'Government of India', 'Ministry of Heavy Industries', 'Tata Electronics'],
    keywords: ['import duty concession', 'EV manufacturing policy', 'local component sourcing', 'Supercharger network India', 'Starlink licensing India'],
    searchContext: 'Analyzing Tesla\'s strategic plans, negotiations with Indian ministries, import tariff concessions under new EV policy, and potential local assembly / component sourcing.',
  },
};

/**
 * Extracts comprehensive query intelligence from the user's raw search.
 * @param {string} rawQuery - The verbatim input string
 * @returns {Object} Structured Query Intelligence Dossier
 */
export function analyzeQuery(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return createDefaultIntelligence('Unspecified Topic');
  }

  const cleanQuery = rawQuery.trim();
  const lower = cleanQuery.toLowerCase();

  // Check known entity dictionary first for exact or fuzzy match
  for (const [key, profile] of Object.entries(ENTITY_KNOWLEDGE_BASE)) {
    if (lower === key || lower.includes(key) || key.includes(lower)) {
      return {
        ...profile,
        originalQuery: cleanQuery,
        intent: determineIntent(cleanQuery, profile.topicType),
        generatedQueries: buildTargetedQueries(profile.exactTopic, profile.industry, profile.location),
        confidenceScore: 98,
        matchType: 'exact_knowledge_base',
      };
    }
  }

  // Dynamic Rule-Based Classification for any arbitrary topic
  const exactTopic = capitalizeTopic(cleanQuery);
  const topicType = inferTopicType(cleanQuery);
  const location = inferLocation(cleanQuery);
  const industry = inferIndustry(cleanQuery);
  const timePeriod = inferTimePeriod(cleanQuery);
  const keywords = extractKeywords(cleanQuery);
  const intent = determineIntent(cleanQuery, topicType);

  const dynamicProfile = {
    exactTopic,
    originalQuery: cleanQuery,
    topicType,
    entityType: `${topicType}_entity`,
    industry,
    location,
    timePeriod,
    relatedEntities: generateRelatedEntities(exactTopic, industry),
    keywords,
    searchContext: `Systematic multi-vector investigation of ${exactTopic} across technology, adoption, governance, market dynamics, and future trajectory.`,
    intent,
    generatedQueries: buildTargetedQueries(exactTopic, industry, location),
    confidenceScore: 88,
    matchType: 'dynamic_inference',
  };

  return dynamicProfile;
}

/**
 * Builds 10 targeted research queries covering all required dimensions.
 */
export function buildTargetedQueries(topic, industry, location) {
  const locSuffix = location && location !== 'Global' ? ` ${location}` : '';
  return [
    { id: 'q_latest', category: 'Latest Developments', query: `"${topic}" latest developments announcements 2025 2026${locSuffix}` },
    { id: 'q_orgs', category: 'Companies & Orgs', query: `"${topic}" key companies organizations startups competitors` },
    { id: 'q_research', category: 'Scientific Research', query: `"${topic}" research papers arxiv nature benchmarks methodology` },
    { id: 'q_adoption', category: 'Adoption & Metrics', query: `"${topic}" market adoption enterprise deployment statistics growth` },
    { id: 'q_problems', category: 'Problems & Bottlenecks', query: `"${topic}" challenges problems limitations risks controversies` },
    { id: 'q_geography', category: 'Geography & Regulation', query: `"${topic}" regulation policy geographic impact${locSuffix}` },
    { id: 'q_future', category: 'Future Scenarios', query: `"${topic}" future roadmap predictions 2026 2030 scenarios` },
    { id: 'q_startups', category: 'Early Signals & Startups', query: `"${topic}" early signals new startups patents open source` },
    { id: 'q_developers', category: 'Developers & Ecosystem', query: `"${topic}" github developer tools APIs open source architecture` },
    { id: 'q_news', category: 'Verified News', query: `"${topic}" reuters bloomberg techcrunch official press release` },
  ];
}

function determineIntent(query, topicType) {
  const q = query.toLowerCase();
  if (q.includes('vs') || q.includes('compare') || q.includes('alternative')) return 'comparative_analysis';
  if (q.includes('future') || q.includes('2026') || q.includes('2030') || q.includes('next')) return 'future_projections';
  if (q.includes('problem') || q.includes('risk') || q.includes('safety') || q.includes('challenge')) return 'risk_investigation';
  if (q.includes('how') || q.includes('architecture') || q.includes('build') || q.includes('api')) return 'technical_deep_dive';
  if (q.includes('market') || q.includes('stock') || q.includes('revenue') || q.includes('valuation')) return 'market_intelligence';
  if (topicType === 'person') return 'biographical_influence';
  if (topicType === 'geo-topic') return 'regional_ecosystem';
  return 'comprehensive_intelligence';
}

function inferTopicType(query) {
  const q = query.toLowerCase();
  if (q.includes('market') || q.includes('economy') || q.includes('industry')) return 'market';
  if (q.includes('india') || q.includes('bengaluru') || q.includes('silicon valley') || q.includes('europe') || q.includes('china')) return 'geo-topic';
  if (q.includes('gpu') || q.includes('chip') || q.includes('phone') || q.includes('headset') || q.includes('car') || q.includes('robot') || q.includes('model') || q.includes('pro')) return 'product';
  if (q.includes('network') || q.includes('algorithm') || q.includes('protocol') || q.includes('computing') || q.includes('architecture')) return 'technology';
  if (q.includes('corp') || q.includes('inc') || q.includes('lab') || q.includes('technologies')) return 'company';
  return 'concept';
}

function inferLocation(query) {
  const q = query.toLowerCase();
  if (q.includes('bengaluru') || q.includes('bangalore')) return 'Bengaluru, India';
  if (q.includes('india')) return 'India';
  if (q.includes('china')) return 'China';
  if (q.includes('europe') || q.includes('eu')) return 'Europe';
  if (q.includes('silicon valley') || q.includes('us') || q.includes('usa')) return 'United States';
  return 'Global';
}

function inferIndustry(query) {
  const q = query.toLowerCase();
  if (q.includes('ai') || q.includes('intelligence') || q.includes('gpt') || q.includes('llm') || q.includes('agent')) return 'Artificial Intelligence';
  if (q.includes('ev') || q.includes('electric') || q.includes('auto') || q.includes('vehicle') || q.includes('car')) return 'Automotive & Clean Mobility';
  if (q.includes('chip') || q.includes('gpu') || q.includes('semiconductor') || q.includes('silicon')) return 'Semiconductors & Hardware';
  if (q.includes('quantum')) return 'Deep Tech & Physics';
  if (q.includes('security') || q.includes('cyber') || q.includes('threat') || q.includes('hack')) return 'Cybersecurity & Enterprise Infrastructure';
  if (q.includes('robot')) return 'Robotics & Embodied AI';
  if (q.includes('finance') || q.includes('crypto') || q.includes('bitcoin') || q.includes('fintech')) return 'FinTech & Digital Assets';
  return 'Emerging Technology';
}

function inferTimePeriod(query) {
  const yearMatch = query.match(/20\d\d/);
  if (yearMatch) return `${yearMatch[0]} Focus`;
  const q = query.toLowerCase();
  if (q.includes('future') || q.includes('next')) return '2025-2030 Outlook';
  if (q.includes('history') || q.includes('origin')) return 'Historical to Present';
  return '2024-2026 Current State';
}

function extractKeywords(query) {
  const stopWords = new Set(['the', 'and', 'for', 'with', 'in', 'on', 'at', 'to', 'a', 'an', 'of', 'by', 'from', 'what', 'is', 'how', 'why', 'who']);
  const words = query.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
  return Array.from(new Set(words));
}

function generateRelatedEntities(topic, industry) {
  return [
    `${topic} Core Ecosystem`,
    `${industry} Standards`,
    'Key Market Leaders',
    'Open Source Initiatives',
    'Regulatory Bodies',
  ];
}

function capitalizeTopic(str) {
  return str
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function createDefaultIntelligence(topic) {
  return {
    exactTopic: topic,
    originalQuery: topic,
    topicType: 'concept',
    entityType: 'general_topic',
    industry: 'Technology',
    location: 'Global',
    timePeriod: 'Current',
    relatedEntities: [],
    keywords: [topic.toLowerCase()],
    searchContext: `Intelligence dossier for ${topic}.`,
    intent: 'comprehensive_intelligence',
    generatedQueries: buildTargetedQueries(topic, 'Technology', 'Global'),
    confidenceScore: 80,
    matchType: 'fallback',
  };
}
