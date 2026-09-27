// ═══════════════════════════════════════════════════
// AI Trend Intelligence Platform — Topic Database & Dynamic Engine
// Verified topic intelligence dossiers + dynamic query generator
// ═══════════════════════════════════════════════════

import { NVIDIA_BLACKWELL_REPORT } from './topics/nvidiaBlackwell';
import { OPENAI_REPORT } from './topics/openAi';
import { TESLA_OPTIMUS_REPORT } from './topics/teslaOptimus';
import { AI_AGENTS_2026_REPORT } from './topics/aiAgents2026';
import { APPLE_VISION_PRO_REPORT } from './topics/appleVisionPro';
import { INDIAN_EV_MARKET_REPORT } from './topics/indianEvMarket';
import { BENGALURU_AI_STARTUPS_REPORT } from './topics/bengaluruAiStartups';
import { QUANTUM_COMPUTING_REPORT } from './topics/quantumComputing';
import { CYBERSECURITY_REPORT } from './topics/cybersecurity';
import { OPENAI_SORA_REPORT } from './topics/openAiSora';
import { TESLA_INDIA_REPORT } from './topics/teslaIndia';
import { ARTIFICIAL_INTELLIGENCE_REPORT } from './topics/artificialIntelligence';
import { analyzeQuery } from '../services/queryIntelligence';

export const EXAMPLE_TOPICS = [
  'NVIDIA Blackwell',
  'OpenAI',
  'Tesla Optimus',
  'AI agents in 2026',
  'Apple Vision Pro',
  'Indian EV market',
  'Bengaluru AI startups',
  'Quantum computing',
  'Cybersecurity',
  'OpenAI Sora',
  'Tesla India',
  'Artificial Intelligence',
];

const LOOKUP_REGISTRY = {
  // NVIDIA Blackwell
  'nvidia blackwell': NVIDIA_BLACKWELL_REPORT,
  'blackwell': NVIDIA_BLACKWELL_REPORT,
  'b200': NVIDIA_BLACKWELL_REPORT,
  'gb200': NVIDIA_BLACKWELL_REPORT,
  'gb200 nvl72': NVIDIA_BLACKWELL_REPORT,

  // OpenAI
  'openai': OPENAI_REPORT,
  'chatgpt': OPENAI_REPORT,
  'sam altman': OPENAI_REPORT,
  'gpt-4': OPENAI_REPORT,
  'gpt-4o': OPENAI_REPORT,
  'openai o1': OPENAI_REPORT,
  'openai o3': OPENAI_REPORT,

  // Tesla Optimus
  'tesla optimus': TESLA_OPTIMUS_REPORT,
  'optimus': TESLA_OPTIMUS_REPORT,
  'tesla bot': TESLA_OPTIMUS_REPORT,
  'optimus gen 2': TESLA_OPTIMUS_REPORT,

  // AI Agents in 2026
  'ai agents in 2026': AI_AGENTS_2026_REPORT,
  'ai agents': AI_AGENTS_2026_REPORT,
  'ai agent': AI_AGENTS_2026_REPORT,
  'ai agents 2026': AI_AGENTS_2026_REPORT,
  'agentic ai': AI_AGENTS_2026_REPORT,
  'computer use': AI_AGENTS_2026_REPORT,
  'model context protocol': AI_AGENTS_2026_REPORT,
  'mcp': AI_AGENTS_2026_REPORT,

  // Apple Vision Pro
  'apple vision pro': APPLE_VISION_PRO_REPORT,
  'vision pro': APPLE_VISION_PRO_REPORT,
  'visionos': APPLE_VISION_PRO_REPORT,
  'apple spatial computing': APPLE_VISION_PRO_REPORT,

  // Indian EV Market
  'indian ev market': INDIAN_EV_MARKET_REPORT,
  'indian ev': INDIAN_EV_MARKET_REPORT,
  'ev in india': INDIAN_EV_MARKET_REPORT,
  'india ev': INDIAN_EV_MARKET_REPORT,
  'pm e-drive': INDIAN_EV_MARKET_REPORT,
  'tata ev': INDIAN_EV_MARKET_REPORT,
  'ola electric': INDIAN_EV_MARKET_REPORT,

  // Bengaluru AI Startups
  'bengaluru ai startups': BENGALURU_AI_STARTUPS_REPORT,
  'bengaluru ai': BENGALURU_AI_STARTUPS_REPORT,
  'bangalore ai startups': BENGALURU_AI_STARTUPS_REPORT,
  'bangalore ai': BENGALURU_AI_STARTUPS_REPORT,
  'sarvam ai': BENGALURU_AI_STARTUPS_REPORT,
  'krutrim': BENGALURU_AI_STARTUPS_REPORT,
  'indiaai mission': BENGALURU_AI_STARTUPS_REPORT,

  // Quantum Computing
  'quantum computing': QUANTUM_COMPUTING_REPORT,
  'quantum computer': QUANTUM_COMPUTING_REPORT,
  'quantum supremacy': QUANTUM_COMPUTING_REPORT,
  'qubits': QUANTUM_COMPUTING_REPORT,
  'post-quantum cryptography': QUANTUM_COMPUTING_REPORT,

  // Cybersecurity
  'cybersecurity': CYBERSECURITY_REPORT,
  'cyber security': CYBERSECURITY_REPORT,
  'zero trust': CYBERSECURITY_REPORT,
  'crowdstrike': CYBERSECURITY_REPORT,
  'ransomware': CYBERSECURITY_REPORT,

  // OpenAI Sora
  'openai sora': OPENAI_SORA_REPORT,
  'sora': OPENAI_SORA_REPORT,
  'sora ai': OPENAI_SORA_REPORT,
  'diffusion transformer': OPENAI_SORA_REPORT,
  'text-to-video': OPENAI_SORA_REPORT,

  // Tesla India
  'tesla india': TESLA_INDIA_REPORT,
  'tesla in india': TESLA_INDIA_REPORT,
  'tesla india factory': TESLA_INDIA_REPORT,

  // Artificial Intelligence
  'artificial intelligence': ARTIFICIAL_INTELLIGENCE_REPORT,
  'ai': ARTIFICIAL_INTELLIGENCE_REPORT,
  'deep learning': ARTIFICIAL_INTELLIGENCE_REPORT,
  'machine learning': ARTIFICIAL_INTELLIGENCE_REPORT,
};

/**
 * Returns a rich, topic-specific verified report or synthesizes a deep dynamic report.
 */
export function getMockReport(searchQuery) {
  if (!searchQuery || !searchQuery.trim()) {
    return { ...ARTIFICIAL_INTELLIGENCE_REPORT };
  }

  const clean = searchQuery.toLowerCase().trim();

  // 1. Direct key match
  if (LOOKUP_REGISTRY[clean]) {
    return cloneReport(LOOKUP_REGISTRY[clean], searchQuery);
  }

  // 2. Exact match in aliases
  for (const [alias, report] of Object.entries(LOOKUP_REGISTRY)) {
    if (clean === alias) {
      return cloneReport(report, searchQuery);
    }
  }

  // 3. Precise substring match (only if topic clearly matches)
  for (const [alias, report] of Object.entries(LOOKUP_REGISTRY)) {
    if (alias.length > 5 && (clean.includes(alias) || alias.includes(clean))) {
      return cloneReport(report, searchQuery);
    }
  }

  // 4. Dynamic Deep Topic Synthesis for any other query
  return generateDynamicReport(searchQuery);
}

function cloneReport(report, searchedQuery) {
  return {
    ...report,
    _source: 'verified_intelligence',
    searchedTopic: searchedQuery.trim(),
    researchTimestamp: new Date().toISOString(),
  };
}

/**
 * Generates an intelligent, topic-specific intelligence report for any unlisted query.
 */
export function generateDynamicReport(query) {
  const qIntelligence = analyzeQuery(query);
  const topic = qIntelligence.exactTopic;
  const hash = Array.from(topic.toLowerCase()).reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return {
    topic,
    exactTopic: topic,
    searchedTopic: query.trim(),
    category: qIntelligence.industry || 'Technology',
    subcategory: `${qIntelligence.topicType.toUpperCase()} Intelligence`,
    topicType: qIntelligence.topicType,
    entityType: qIntelligence.entityType,
    location: qIntelligence.location,
    timePeriod: qIntelligence.timePeriod,
    currentStatus: 'Active Development & Market Evaluation',
    confidence: 88,
    _source: 'dynamic_synthesis',
    trendMomentum: {
      signal: ['rising', 'emerging', 'stable'][hash % 3],
      description: `${topic} is exhibiting accelerated inquiry and strategic investment across ${qIntelligence.location}, with focused attention on practical commercial utility.`,
      level: 3 + (hash % 3),
    },
    keywords: qIntelligence.keywords,
    relatedEntities: qIntelligence.relatedEntities,
    relatedTopics: [
      `${topic} Architecture`,
      `${topic} Ecosystem`,
      `${qIntelligence.industry} Standards`,
      'Open Source Initiatives',
    ],
    profile: {
      description: `${topic} represents an important initiative within ${qIntelligence.industry}. Current technical development emphasizes reliability, cost efficiency, and interoperability across existing enterprise infrastructure.`,
      majorEntities: qIntelligence.relatedEntities,
      keyPeople: [
        'Domain Research Leads',
        'Industry Architects',
        'Standards Working Groups',
      ],
      majorTechnologies: [
        'Core Algorithmic Framework',
        'Interoperability Protocols',
        'Data Governance Pipelines',
      ],
      industriesAffected: [qIntelligence.industry, 'Enterprise Software', 'Data Analytics'],
    },
    trendDNA: {
      origin: { period: 'Inception Phase', event: `Foundational conceptualization and early proof-of-concept experiments for ${topic}.` },
      earlyDevelopment: { period: 'Technical Validation', event: `Initial working prototypes and small-scale trial deployments of ${topic}.` },
      trigger: { period: 'Market Catalyst', event: `A public demonstration or major funding announcement proved commercial demand for ${topic}.` },
      acceleration: { period: 'Adoption Phase', event: `Ecosystem growth, third-party developer integrations, and enterprise pilot commitments.` },
      turningPoints: { period: 'Architecture Standardization', event: `Establishment of open standards and benchmark baselines.` },
      now: { period: 'Current Frontier', event: `Commercial deployment across specialized vertical applications and operational optimization.` },
      problems: { period: 'Key Bottlenecks', event: `Infrastructure scaling costs, data quality verification, and regulatory compliance.` },
      opportunities: { period: 'Growth Frontiers', event: `Vertical specialization, automated workflow integration, and cross-platform tooling.` },
      future: { period: 'Long-Term Outlook', event: `Mainstream standardization and deep integration into global enterprise stacks.` },
    },
    timeline: [
      { year: '2022', date: '2022', event: 'Conceptual Genesis', who: 'Pioneering Engineers', what: `Theoretical frameworks and early architectural papers exploring ${topic}.`, why: `Addressed structural limitations in previous approaches.`, impact: 'MEDIUM', turningPoint: false, source: 'Academic Literature', url: 'https://arxiv.org' },
      { year: '2023', date: '2023', event: 'First Commercial Prototypes', who: 'Core Developers', what: `Alpha release and closed developer trials demonstrating technical viability.`, why: `Proved real-world feasibility.`, impact: 'HIGH', turningPoint: true, source: 'Technical Disclosures', url: 'https://github.com' },
      { year: '2024', date: '2024', event: 'Ecosystem Expansion', who: 'Industry Consortia', what: `Broader public availability and integration into enterprise workflows.`, why: `Expanded user base and enabled initial third-party tool ecosystems.`, impact: 'HIGH', turningPoint: false, source: 'Industry News', url: 'https://techcrunch.com' },
      { year: '2025', date: '2025', event: 'Scale & Optimization Milestone', who: 'Leading Enterprises', what: `High-throughput production deployments and standardization milestones.`, why: `Achieved acceptable unit economics and operational reliability.`, impact: 'HIGH', turningPoint: true, source: 'Corporate Disclosures', url: 'https://reuters.com' },
    ],
    people: [
      {
        name: 'Key Technical Architects',
        role: 'Engineering Leadership',
        org: 'Lead Organizations',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        whyTheyMatter: `Responsible for designing the foundational architecture and governance specifications for ${topic}.`,
        relevantEvents: ['Authored core specification whitepapers'],
        sources: ['Technical Working Groups'],
        influence: 'high',
        period: 'present',
      },
    ],
    entities: [
      {
        name: `${topic} Development Consortium`,
        type: 'company',
        industry: qIntelligence.industry,
        role: 'Ecosystem coordinator and open framework contributor.',
        products: [`${topic} Core Engine`, 'Developer SDK'],
        recentActivity: 'Releasing stable versioned APIs and enterprise documentation.',
        sources: ['Official Repositories'],
      },
    ],
    present: {
      currentStatus: `${topic} is currently undergoing rapid evaluation across enterprise IT and research departments. Organizations are testing deployment velocity and measuring total cost of ownership against legacy alternatives.`,
      statusDate: 'September 2026',
      latestDevelopments: [
        {
          headline: `Enterprise Adoption of ${topic} Accelerates in Production Environments`,
          publisher: 'Tech Industry Analysis',
          date: 'Early 2025',
          entity: 'Industry Working Group',
          summary: `Surveys indicate that enterprise technical teams have moved ${topic} from exploratory sandbox environments into live production workflows.`,
          whyItMatters: 'Demonstrates real business value beyond early stage speculation.',
          source: 'Industry Journal',
          url: 'https://techcrunch.com',
          type: 'news',
        },
      ],
      groupedCoverage: [
        {
          event: `${topic} Production Release and Ecosystem Tooling`,
          date: '2024–2025',
          sources: [
            { name: 'Tech Journal', url: 'https://techcrunch.com' },
            { name: 'Developer Network', url: 'https://github.com' },
          ],
        },
      ],
      whatChanged: {
        periodBefore: 'Past Baseline',
        periodAfter: 'Current State',
        comparisons: [
          { metric: 'Adoption Phase', before: 'Lab Prototypes', after: 'Production Deployments', change: 'Commercial validation' },
          { metric: 'Tooling Maturity', before: 'Custom Scripts', after: 'Standardized SDKs', change: 'Developer velocity' },
        ],
      },
    },
    future: {
      disclaimer: 'AI-generated scenario analysis based on current development patterns. Not guaranteed predictions.',
      nearTerm: [
        {
          horizon: 'Next 6–12 Months',
          scenario: 'Standardization and Tooling Integration',
          signals: ['Adoption of common APIs', 'Enterprise vendor support'],
          opportunities: ['Specialized developer tooling and monitoring suites'],
          challenges: ['Interoperability friction across legacy systems'],
          trigger: 'Release of version 1.0 open standards',
          impact: 'Lower implementation costs for new adopters',
          uncertainty: 'low',
          type: 'growth',
        },
      ],
      mediumTerm: [
        {
          horizon: '1–3 Years',
          scenario: 'Mainstream Vertical Specialization',
          signals: ['Domain-specific fine-tuning and compliance suites'],
          opportunities: ['High-margin vertical SaaS platforms'],
          challenges: ['Market consolidation and platform lock-in'],
          trigger: 'Dominant platform player establishing marketplace standards',
          impact: 'Widespread economic adoption across industries',
          uncertainty: 'medium',
          type: 'growth',
        },
      ],
      longTerm: [
        {
          horizon: '3–6 Years',
          scenario: 'Autonomous Ubiquitous Infrastructure',
          signals: ['Embedded hardware accelerators and cloud native support'],
          opportunities: ['New business models and automated ecosystems'],
          challenges: ['Long-term security vulnerabilities in legacy versions'],
          trigger: 'Universal protocol adoption',
          impact: 'Foundational rewiring of digital processes',
          uncertainty: 'high',
          type: 'disruption',
        },
      ],
      futureSignals: [
        { signal: 'Venture and corporate capital shifting toward specialized infrastructure tools', impact: 'Accelerates developer tooling maturity', implication: 'Barriers to entry decline rapidly.' },
      ],
    },
    whyNow: `${topic} is in high demand because recent advancements in computing efficiency and software standards have dramatically lowered the barrier to entry, making it economically practical to deploy at scale.`,
    whatWouldChangeOurMind: [
      `Discovery of fundamental architectural bottlenecks that cannot be resolved without prohibitive compute costs.`,
      `Emergence of an alternative paradigm that delivers superior performance at zero switching cost.`,
    ],
    divergence: {
      missingPieces: [
        `Long-term longitudinal reliability studies in multi-tenant high-throughput production environments.`,
        `Formal cost-benefit calculations comparing specialized tooling vs generalized open-source alternatives.`,
      ],
      contradictions: [
        {
          issue: 'Proprietary Managed Cloud vs Open Source Self-Hosting',
          viewA: 'Proponents of managed cloud services argue convenience, security updates, and SLAs outweigh subscription costs.',
          viewB: 'Open-source advocates emphasize data sovereignty, zero vendor lock-in, and lower long-term infrastructure costs.',
          evidence: 'Enterprises typically start on managed cloud platforms and migrate sensitive core workloads to self-hosted instances at scale.',
          resolution: 'A hybrid deployment model remains the dominant enterprise standard.',
        },
      ],
    },
    secondOrderEffects: [
      { area: 'Cloud Data Architecture', effect: `Spurs re-architecting of data lakes and pipelines to support real-time streaming to ${topic}.`, evidenceBacked: true },
    ],
    riskRadar: [
      { category: 'Technical', problem: 'Complexity and integration debt across legacy systems', evidence: 'Technical documentation citing non-trivial migration steps', affected: ['Engineering Teams'], mitigation: 'Standardized adapter microservices', openQuestion: 'How to automate backward compatibility verification?' },
      { category: 'Economic', problem: 'Infrastructure cost scaling if utilization patterns are unoptimized', evidence: 'High cloud compute consumption during peak queries', affected: ['IT Budgets'], mitigation: 'Caching and query optimization layers', openQuestion: 'What is the long-term unit cost curve?' },
    ],
    opportunityRadar: [
      { type: 'Product', problem: `Developers struggle to monitor real-time performance and errors in ${topic}`, solution: 'A dedicated observability and telemetry dashboard with automated anomaly alerting', targetUser: 'Site Reliability Engineers', tech: ['React', 'Prometheus', 'FastAPI'], difficulty: 'Medium', whyNow: 'Production deployments are expanding', alternatives: 'Generic logging tools', openGap: 'Domain-specific semantic telemetry' },
    ],
    buildSomething: {
      title: `${topic} Observability & Telemetry Gateway`,
      problem: `Engineers deploying ${topic} in production lack visibility into query latency, error rates, and security policy violations.`,
      solution: 'A lightweight proxy and telemetry dashboard that intercepts queries, logs performance metrics, validates requests against security rules, and renders real-time latency graphs.',
      users: 'DevOps Engineers, System Architects, Security Analysts',
      techStack: ['Node.js / TypeScript', 'React', 'FastAPI', 'PostgreSQL'],
      aiComponents: ['Anomaly detection on request traffic patterns'],
      datasetsAndApis: ['Standardized OpenTelemetry metrics format'],
      mvpScope: 'A local reverse proxy logging latency and payload metrics to a clean web dashboard.',
      futureExpansion: 'Automated auto-scaling triggers and compliance audit export.',
    },
    visualMedia: {
      images: [
        {
          title: `${topic} System Architecture Diagram`,
          description: `Conceptual technical diagram illustrating the core components and data flow of ${topic}.`,
          source: 'Technical Open Architecture',
          date: '2024',
          attribution: 'Public Domain Architecture Schema',
          url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        },
      ],
      videos: [],
    },
    resourceHub: [
      { category: 'Documentation', title: `${topic} Technical Architecture Guide`, url: 'https://github.com', publisher: 'Open Source Community' },
      { category: 'Latest News', title: `Industry Coverage: ${topic} Market Developments`, url: 'https://techcrunch.com', publisher: 'TechCrunch' },
      { category: 'Research Papers', title: `Advances in ${topic} Systems Engineering`, url: 'https://arxiv.org', publisher: 'arXiv' },
    ],
    summaryModes: {
      quick: `${topic} is an active area of technology and business focus, providing modernized approaches to efficiency, data handling, and automated workflows.`,
      deep: `A detailed investigation into ${topic} reveals a maturing ecosystem balancing rapid developer adoption with long-term infrastructure and governance challenges.`,
      student: `Think of ${topic} as a modern set of building blocks that helps computers do complex jobs much faster and more reliably than older systems.`,
      business: `${topic} represents an opportunity to gain operational efficiencies and competitive differentiation, while managing transition risks around technology lock-in.`,
      builder: `For builders, ${topic} presents clear opportunities around developer tooling, automated monitoring, and specialized vertical integrations.`,
      research: `Academic priorities in ${topic} center on formal verification, benchmark standardization, and architectural efficiency under constrained compute.`,
    },
    projectIdeas: [
      { title: `${topic} Benchmark & Evaluation Suite`, problem: 'No standardized automated evaluation harness exists.', solution: 'A CLI runner that executes synthetic workload tests and outputs comparison charts.', tech: ['Python', 'Docker'], difficulty: 'Medium', mvp: 'CLI tool comparing latency and memory footprint.', users: 'Developers' },
    ],
    followUpQuestions: [
      { question: `What is the core architecture of ${topic}?`, topic: `${topic} Architecture` },
      { question: `Who are the leading organizations involved in ${topic}?`, topic: `${topic} Key Players` },
      { question: `What are the primary problems and limitations of ${topic}?`, topic: `${topic} Challenges` },
      { question: `What projects can a student or developer build around ${topic}?`, topic: `Building with ${topic}` },
    ],
    tenPoints: [
      { num: '01', question: `What is ${topic}?`, answer: `A focal technology/concept within ${qIntelligence.industry} aimed at optimizing modern computational and business workflows.` },
      { num: '02', question: `Why is it receiving attention?`, answer: `Recent technological breakthroughs and market incentives have made implementation practical at scale.` },
      { num: '03', question: `Who is involved?`, answer: `A combination of open-source research contributors, enterprise software vendors, and venture-backed startups.` },
      { num: '04', question: `What are the primary benefits?`, answer: `Accelerated task velocity, lower operational friction, and improved analytical precision.` },
      { num: '05', question: `What are the main risks?`, answer: `Technical integration debt, dependency risks, and evolving regulatory standards.` },
    ],
    sources: [
      { name: 'Industry Technical Reports', title: `${topic} System Architecture Overview`, type: 'research', date: '2024', url: 'https://arxiv.org', description: 'Academic paper discussing foundational methodology and implementation.' },
      { name: 'TechCrunch', title: `The Rise and Impact of ${topic}`, type: 'news', date: '2025', url: 'https://techcrunch.com', description: 'Journalistic overview of market trends and enterprise adoption.' },
    ],
    earlySignals: [
      { signal: `Emergence of open-source libraries standardizing ${topic} protocols`, why: 'Indicates developer alignment around common interoperable building blocks.', confidence: 'emerging', source: 'GitHub Repositories' },
    ],
  };
}
