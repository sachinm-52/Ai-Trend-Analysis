// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Comprehensive Mock Database
// 10 pre-built realistic topic reports
// ═══════════════════════════════════════════════════

export const EXAMPLE_TOPICS = [
  'Artificial Intelligence', 'NVIDIA', 'Tesla', 'OpenAI',
  'Bitcoin', 'Indian EV Market', 'SpaceX', 'Cybersecurity',
  'Generative AI', 'Bengaluru Startups',
];

const BASE_SOURCES = {
  reuters: { name: 'Reuters', type: 'news' },
  bloomberg: { name: 'Bloomberg', type: 'news' },
  techcrunch: { name: 'TechCrunch', type: 'news' },
  wired: { name: 'Wired', type: 'news' },
  nature: { name: 'Nature', type: 'research' },
  arxiv: { name: 'arXiv', type: 'research' },
  company: { name: 'Company Announcement', type: 'company' },
  sec: { name: 'SEC Filing', type: 'government' },
  statista: { name: 'Statista', type: 'data' },
};

// ──────────────────────────────────────────────────
// ARTIFICIAL INTELLIGENCE
// ──────────────────────────────────────────────────
const AI_REPORT = {
  topic: 'Artificial Intelligence',
  category: 'Technology',
  subcategory: 'Computer Science',
  currentStatus: 'Rapid Acceleration',
  confidence: 95,
  trendMomentum: { signal: 'rising', description: 'AI is experiencing unprecedented acceleration across research, product deployment, and investment. Every major technology company has restructured around AI.', level: 5 },
  geographicRelevance: ['Global', 'USA', 'China', 'Europe', 'India'],
  keywords: ['machine learning', 'neural networks', 'LLMs', 'AGI', 'deep learning', 'generative AI', 'AI safety'],
  relatedTopics: ['Generative AI', 'NVIDIA', 'OpenAI', 'Robotics', 'AI Safety', 'AI Regulation'],
  profile: {
    description: 'Artificial Intelligence refers to the simulation of human intelligence processes by machines. The current wave is driven by large language models, transformer architectures, and massive compute scaling.',
    majorEntities: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Meta AI', 'Microsoft'],
    keyPeople: ['Sam Altman', 'Demis Hassabis', 'Dario Amodei', 'Yann LeCun', 'Geoffrey Hinton'],
    majorTechnologies: ['Transformers', 'LLMs', 'Diffusion Models', 'Reinforcement Learning'],
    industriesAffected: ['Healthcare', 'Finance', 'Education', 'Legal', 'Media', 'Manufacturing', 'Defense'],
  },
  tenPoints: [
    { num: '01', question: 'What is happening?', answer: 'AI has crossed an inflection point where general-purpose models can now perform complex reasoning, coding, creative, and scientific tasks at near-human or superhuman levels for specific domains.' },
    { num: '02', question: 'Why is it happening?', answer: 'Three converging forces: transformer architecture breakthroughs (2017), massive compute availability via NVIDIA GPUs, and scaling laws showing consistent improvement with more data and parameters.' },
    { num: '03', question: 'How did it start?', answer: 'Early statistical AI gave way to neural networks in the 1980s. Modern AI traces to the 2012 ImageNet moment (AlexNet), the 2017 Attention Is All You Need paper, and GPT-3 in 2020 showing emergent capabilities.' },
    { num: '04', question: 'What changed?', answer: 'The 2022–2024 period saw generative AI go mainstream via ChatGPT, image generation, and AI coding assistants, shifting AI from research tool to mass consumer product.' },
    { num: '05', question: 'Who are the important people?', answer: 'Sam Altman (OpenAI CEO), Demis Hassabis (Google DeepMind CEO), Dario Amodei (Anthropic CEO), Jensen Huang (NVIDIA CEO), Yann LeCun (Meta Chief AI Scientist).' },
    { num: '06', question: 'Which organizations matter?', answer: 'OpenAI, Google DeepMind, Anthropic, Meta AI, Microsoft, NVIDIA, Mistral AI, xAI (Grok), Cohere, and academia via MIT, Stanford, CMU, and Oxford.' },
    { num: '07', question: 'Who/what is driving it now?', answer: 'Capital (>$100B invested in 2024), compute (NVIDIA H100/H200 cluster buildouts), and competition between labs racing toward AGI and agentic reasoning systems.' },
    { num: '08', question: 'What problems exist?', answer: 'Hallucination, bias amplification, job displacement, energy consumption, concentration of power, lack of explainability, safety alignment, and regulatory fragmentation.' },
    { num: '09', question: 'What opportunities exist?', answer: 'Healthcare diagnostics, personalized education, scientific discovery acceleration, coding democratization, creative tools, and domain-specific AI vertical startups.' },
    { num: '10', question: 'What could happen next?', answer: 'Agentic AI systems, multimodal reasoning, AI-designed AI architectures, physical robots with vision-language reasoning, and possible AGI-level systems within 2–7 years (contested).' },
  ],
  bigPicture: {
    whatIsHappening: 'AI has moved from a specialized research domain to the foundational technology of the digital economy. Generative AI systems can now write, code, reason, create images, conduct research, and operate autonomously in ways that were considered science fiction five years ago.',
    whyTrending: ['The 2022 ChatGPT release showed the general public that AI was ready for real use.', 'Billions in venture and corporate investment accelerated development timelines.', 'The scaling hypothesis (more compute = better AI) proved consistently reliable.', 'Competition between Google, Microsoft/OpenAI, Meta, and Anthropic pushed capabilities forward rapidly.'],
    whyShouldICare: 'AI will affect every profession, industry, and daily interaction. Whether you are a student, developer, business owner, or policy maker, understanding AI trajectories will determine opportunities and risks over the next decade.',
    whoIsAffected: [
      { group: 'Developers', impact: 'Fundamental workflow change via AI coding assistants; productivity gains of 30–55% reported.', direction: 'positive' },
      { group: 'Students', impact: 'AI tutors available 24/7; risk of over-reliance on AI for learning.', direction: 'mixed' },
      { group: 'Workers', impact: 'Cognitive tasks increasingly automatable; 300M jobs at risk per McKinsey; new AI-adjacent roles emerging.', direction: 'mixed' },
      { group: 'Businesses', impact: 'Massive cost savings on automation; competitive pressure to adopt or lose market position.', direction: 'positive' },
      { group: 'Governments', impact: 'Regulatory uncertainty; AI used for surveillance; military AI development accelerating.', direction: 'mixed' },
      { group: 'Investors', impact: '2023–2024 saw record AI investment; concentration risk in handful of companies and chips.', direction: 'positive' },
      { group: 'Researchers', impact: 'AI accelerates scientific discovery in drug design, materials science, and mathematics.', direction: 'positive' },
    ],
  },
  trendDNA: {
    origin: { period: '1950s–1980s', event: 'Alan Turing proposes machine intelligence. Early symbolic AI and rule-based systems. First neural network research by Rosenblatt.' },
    trigger: { period: '2012', event: 'AlexNet wins ImageNet with deep learning, proving neural networks vastly outperform classical approaches on visual recognition.' },
    growth: { period: '2015–2019', event: 'TensorFlow, PyTorch democratize ML. GANs, BERT, and GPT-1/2 show text generation capability. ImageNet near-solved.' },
    acceleration: { period: '2020–2022', event: 'GPT-3 (175B params) shows emergent capability. DALL-E, Stable Diffusion launch. Scaling laws published. GitHub Copilot ships.' },
    now: { period: '2023–2026', event: 'ChatGPT goes viral. GPT-4, Claude 3, Gemini Ultra emerge. AI agents, multimodal models. Agentic coding reshapes software.' },
    future: { period: '2027–2035', event: 'AGI debate intensifies. Humanoid robots. AI-designed AI. Possible cognitive general systems.' },
  },
  timeline: [
    { year: '1950', date: '1950', event: 'Turing Test proposed', who: 'Alan Turing', what: 'Published "Computing Machinery and Intelligence", proposing the Turing Test as a benchmark for machine intelligence.', why: 'Established the conceptual foundation for modern AI research.', impact: 'HIGH' },
    { year: '1956', date: '1956', event: 'Dartmouth Conference', who: 'John McCarthy, Marvin Minsky', what: 'First AI summer conference coins the term "Artificial Intelligence".', why: 'Founded AI as an academic discipline.', impact: 'HIGH' },
    { year: '1986', date: '1986', event: 'Backpropagation rediscovered', who: 'Rumelhart, Hinton, Williams', what: 'Backpropagation algorithm enables efficient neural network training.', why: 'Enabled multi-layer neural networks — foundational to modern deep learning.', impact: 'HIGH' },
    { year: '2012', date: '2012', event: 'AlexNet ImageNet victory', who: 'Geoffrey Hinton, Alex Krizhevsky', what: 'Deep convolutional network reduces image recognition error from 26% to 15% in one year.', why: 'Proved deep learning dominance over classical ML approaches.', impact: 'HIGH', turningPoint: true },
    { year: '2017', date: '2017', event: 'Attention Is All You Need', who: 'Vaswani et al. (Google)', what: 'Transformer architecture published. Replaces recurrent networks for language tasks.', why: 'Every modern LLM (GPT, Claude, Gemini, LLaMA) uses transformer architecture.', impact: 'HIGH', turningPoint: true },
    { year: '2020', date: '2020', event: 'GPT-3 released', who: 'OpenAI', what: '175 billion parameter model shows surprising emergent capabilities in few-shot learning.', why: 'First public demonstration of general-purpose AI text generation at human-competitive quality.', impact: 'HIGH', turningPoint: true },
    { year: '2022', date: 'Nov 2022', event: 'ChatGPT launch', who: 'OpenAI', what: 'ChatGPT reaches 100 million users in 2 months. Fastest product adoption in history.', why: 'Brought AI into mainstream consciousness. Triggered multi-hundred-billion investment wave.', impact: 'HIGH', turningPoint: true },
    { year: '2023', date: 'Mar 2023', event: 'GPT-4 & multimodal AI', who: 'OpenAI, Google, Anthropic', what: 'GPT-4, Claude 2, Gemini Ultra emerge. AI can now process images, code, and audio.', why: 'Multimodal AI expanded from text to full world understanding.', impact: 'HIGH' },
    { year: '2024', date: '2024', event: 'AI Agents go mainstream', who: 'Anthropic, OpenAI, Google', what: 'AI agents operate autonomously in browsers, terminals, and workflows.', why: 'Shift from AI as tool to AI as autonomous worker.', impact: 'HIGH', turningPoint: true },
    { year: '2025', date: '2025', event: 'AI Reasoning models', who: 'OpenAI o3, Anthropic, Google', what: 'Models demonstrate extended internal reasoning chains solving graduate-level math and science.', why: 'Reasoning capability approaching domain experts opens new application spaces.', impact: 'HIGH' },
  ],
  people: [
    { name: 'Sam Altman', role: 'CEO', org: 'OpenAI', contribution: 'Led ChatGPT launch and GPT-4 development. Pioneered consumer AI products. Key figure in AGI safety dialogue.', influence: 'very high' },
    { name: 'Demis Hassabis', role: 'CEO & Co-founder', org: 'Google DeepMind', contribution: 'AlphaGo, AlphaFold (protein folding breakthrough). Pioneer of reinforcement learning applications.', influence: 'very high' },
    { name: 'Dario Amodei', role: 'CEO & Co-founder', org: 'Anthropic', contribution: 'Former OpenAI VP of Research. Founded Anthropic on safety-first principles. Claude model family.', influence: 'high' },
    { name: 'Geoffrey Hinton', role: 'AI Pioneer / Researcher', org: 'Independent (ex-Google)', contribution: '"Godfather of deep learning". Backpropagation, Boltzmann machines, deep belief networks. Left Google to warn about AI risk.', influence: 'very high' },
    { name: 'Yann LeCun', role: 'Chief AI Scientist', org: 'Meta', contribution: 'Convolutional neural networks (CNNs), LeCun-5, MNIST dataset. Skeptic of current LLM path to AGI.', influence: 'high' },
    { name: 'Jensen Huang', role: 'CEO & Co-founder', org: 'NVIDIA', contribution: 'Built NVIDIA into the AI infrastructure backbone. CUDA platform. H100/H200/Blackwell GPUs power most AI training.', influence: 'very high' },
  ],
  entities: [
    { name: 'OpenAI', type: 'company', industry: 'AI Research', role: 'Develops GPT-4o, o3, DALL-E, Sora. Creator of ChatGPT. Pivotal in popularizing conversational AI.', products: ['ChatGPT', 'GPT-4o', 'DALL-E 3', 'Sora', 'OpenAI API'], relationship: 'Core driver of modern AI wave' },
    { name: 'Google DeepMind', type: 'company', industry: 'AI Research', role: 'Produces Gemini, AlphaFold, AlphaCode. Backbone of Google Search, Maps, and Translate AI.', products: ['Gemini 2.0', 'AlphaFold', 'AlphaCode', 'Veo'], relationship: 'Foundational AI research + infrastructure' },
    { name: 'Anthropic', type: 'company', industry: 'AI Safety Research', role: 'Safety-focused AI lab. Produces Claude model family emphasizing harmlessness and honesty.', products: ['Claude 3.5 Sonnet', 'Claude 3 Opus'], relationship: 'AI safety research + commercial deployment' },
    { name: 'Microsoft', type: 'company', industry: 'Technology', role: '$13B+ investment in OpenAI. Integrated Copilot across Office, Azure, GitHub. Major AI distribution channel.', products: ['Copilot', 'Azure AI', 'GitHub Copilot'], relationship: 'Primary OpenAI distribution partner' },
    { name: 'NVIDIA', type: 'company', industry: 'Semiconductors', role: 'H100/H200/Blackwell GPUs power 90%+ of AI training workloads globally. CUDA ecosystem lock-in.', products: ['H100', 'H200', 'Blackwell B200', 'CUDA', 'NeMo'], relationship: 'AI compute infrastructure backbone' },
    { name: 'Transformers Architecture', type: 'technology', industry: 'AI Research', role: 'The mathematical foundation of all modern LLMs. Self-attention mechanism enables parallel sequence processing.', creator: 'Vaswani et al. (Google)', adoption: 'Universal — GPT, Claude, Gemini, LLaMA all use transformers' },
  ],
  currentEvents: [
    { headline: 'OpenAI o3 Model Achieves 87.5% on ARC-AGI Benchmark', date: 'Sep 2025', source: 'TechCrunch', summary: 'OpenAI\'s o3 model, using extended chain-of-thought reasoning, scored 87.5% on ARC-AGI, a benchmark specifically designed to test general intelligence rather than pattern memorization.', whyItMatters: 'Suggests AI reasoning capabilities may be closer to human-level generalization than previously estimated by critics.', evidence: 'high' },
    { headline: 'Anthropic Raises $4B in Latest Funding Round', date: 'Aug 2025', source: 'Bloomberg', summary: 'Anthropic received $4B from Amazon and Google investors, valuing the company at $40B. Funds earmarked for compute infrastructure and safety research.', whyItMatters: 'Signals continued mega-investment in AI safety-focused labs alongside capability labs.', evidence: 'high' },
    { headline: 'EU AI Act Full Enforcement Begins', date: 'Aug 2025', source: 'Reuters', summary: 'The European Union\'s AI Act moves to full enforcement, requiring high-risk AI systems to meet strict transparency, testing, and registration requirements.', whyItMatters: 'First comprehensive AI law globally. Sets precedent for AI regulation worldwide and creates compliance burden for US AI companies.', evidence: 'high' },
    { headline: 'Google Unveils AI Agent "Project Astra" for Real-World Tasks', date: 'Jul 2025', source: 'Wired', summary: 'Google\'s Project Astra demonstrates multimodal AI agents able to observe, plan, and execute tasks across apps, browsers, and devices autonomously.', whyItMatters: 'Marks the transition from AI answering questions to AI taking actions on behalf of users.', evidence: 'high' },
  ],
  drivers: [
    { name: 'Compute Scaling', type: 'technological', description: 'Scaling laws show consistent AI capability improvement with more compute, data, and parameters. NVIDIA GPU buildouts worth hundreds of billions fund this scaling.', impact: 'Primary technical driver' },
    { name: 'Venture Capital & Corporate Investment', type: 'economic', description: 'Over $300B invested in AI companies from 2020–2025. Microsoft, Google, Amazon, Salesforce, and sovereign wealth funds all betting heavily on AI.', impact: 'Primary funding driver' },
    { name: 'Competitive Pressure Between Labs', type: 'institutional', description: 'Google, OpenAI, Anthropic, Meta, and Mistral in an arms race dynamic. Each capability breakthrough forces competitors to respond within months.', impact: 'Accelerates release cadence' },
    { name: 'Developer Ecosystem', type: 'community', description: '50M+ developers worldwide adopting AI coding assistants. Open-source community around Hugging Face, LLaMA, and Mistral democratizes access.', impact: 'Drives adoption and innovation breadth' },
    { name: 'Consumer Demand', type: 'market', description: 'ChatGPT\'s viral adoption proved consumer appetite. 200M+ active users created revenue that justified continued investment.', impact: 'Revenue validation driver' },
  ],
  problems: [
    { id: 'p1', category: 'Technical', title: 'Hallucination & Factual Errors', description: 'LLMs confidently generate false information at a non-trivial rate.', evidence: 'Documented across all major models. GPT-4 hallucination rate varies 5–20% depending on domain.', affected: ['Researchers', 'Students', 'Journalists', 'Legal professionals'], severity: 'high', solutions: ['Retrieval-augmented generation (RAG)', 'Chain-of-thought verification', 'Grounding to databases'], gaps: 'No reliable zero-hallucination system exists yet.', evidenceStrength: 'high' },
    { id: 'p2', category: 'Social', title: 'Job Displacement & Economic Disruption', description: 'AI automates cognitive tasks previously requiring skilled workers.', evidence: 'Goldman Sachs estimates 300M jobs globally affected. Entry-level writing, coding, data analysis most impacted first.', affected: ['Writers', 'Analysts', 'Junior Developers', 'Customer Service Workers'], severity: 'high', solutions: ['Retraining programs', 'Universal basic income proposals', 'AI-human hybrid workflows'], gaps: 'No large-scale workforce transition system exists globally.', evidenceStrength: 'high' },
    { id: 'p3', category: 'Environmental', title: 'Energy Consumption', description: 'Training and running large AI models consumes enormous electricity.', evidence: 'Training GPT-4 estimated to use 50+ GWh. Data center electricity demand growing 25% annually due to AI.', affected: ['Environment', 'Electricity Grids', 'Developing Nations'], severity: 'medium', solutions: ['Model efficiency research', 'Renewable energy data centers', 'Smaller specialized models'], gaps: 'Net energy trajectory is still upward despite efficiency gains.', evidenceStrength: 'high' },
    { id: 'p4', category: 'Ethical', title: 'Bias & Fairness', description: 'AI models inherit biases from training data, producing discriminatory outputs.', evidence: 'Documented in hiring AI, facial recognition, loan approval systems, and medical diagnosis tools.', affected: ['Minorities', 'Women', 'Disabled Individuals', 'Low-income Communities'], severity: 'high', solutions: ['Diverse training data', 'Bias auditing', 'Regulatory requirements'], gaps: 'Bias is structurally difficult to eliminate without representative data.', evidenceStrength: 'high' },
    { id: 'p5', category: 'Security', title: 'AI-Powered Cyberattacks & Disinformation', description: 'AI enables highly personalized phishing, deepfakes, and scalable propaganda.', evidence: 'Election-related AI disinformation documented in 2024 US, EU, and India elections. Deepfake fraud incidents increasing 300% YoY.', affected: ['Individuals', 'Democracies', 'Companies', 'Governments'], severity: 'high', solutions: ['AI content watermarking', 'Digital provenance standards', 'Detection models'], gaps: 'Detection arms race — detectors lag generative capabilities.', evidenceStrength: 'high' },
  ],
  opportunities: [
    { problem: 'Healthcare access', improvement: 'AI diagnostic assistants that operate in low-resource settings without specialist infrastructure', whoCouldBuild: 'Startups, NGOs, health ministries', impact: 'Save millions of lives in developing countries', difficulty: 'Hard' },
    { problem: 'Education inequality', improvement: 'Personalized AI tutors adaptive to learning style, language, and pace — accessible at phone-tier hardware', whoCouldBuild: 'EdTech startups, national governments', impact: 'Democratize quality education globally', difficulty: 'Medium' },
    { problem: 'Scientific bottlenecks', improvement: 'AI copilots that assist wet-lab researchers in hypothesis generation, literature review, and experiment design', whoCouldBuild: 'Biotech companies, academic labs', impact: 'Accelerate drug discovery by 5–10x', difficulty: 'Hard' },
    { problem: 'Legal access gap', improvement: 'AI legal assistants providing reliable first-layer legal guidance for individuals who cannot afford lawyers', whoCouldBuild: 'Legal tech startups, bar associations', impact: 'Access to justice for hundreds of millions', difficulty: 'Medium' },
  ],
  deepDiscovery: [
    { title: 'The AI Safety — Capabilities Paradox', description: 'The labs most vocal about AI risk (OpenAI, Anthropic) are simultaneously the ones racing to build the most powerful AI. This creates an unusual dynamic where safety proponents are also primary accelerators.', whyInteresting: 'Understanding this tension explains most of modern AI lab behavior, funding strategy, and public communication.', type: 'connection' },
    { title: 'NVIDIA\'s Dominance Was An Accident of Gaming', description: 'NVIDIA built GPU compute leadership primarily for video games. The CUDA platform (2007) was a bet on scientific computing. AI researchers discovered GPUs were perfect for neural network training — NVIDIA didn\'t design for AI first.', whyInteresting: 'The most critical piece of AI infrastructure was an accidental fit from a gaming company.', type: 'historical' },
    { title: 'Transformers Were Proposed For Translation, Not AGI', description: 'The 2017 "Attention Is All You Need" paper was solving a specific NLP problem (machine translation). The authors didn\'t predict transformers would become the dominant architecture for general AI.', whyInteresting: 'Most revolutionary technology breakthroughs are discovered while solving an adjacent, smaller problem.', type: 'surprising' },
    { title: 'The Bitter Lesson Still Holds', description: 'Richard Sutton\'s 2019 "Bitter Lesson" paper argued that all AI successes come from general compute methods, not human-engineered knowledge. Every clever AI heuristic eventually loses to more compute + general algorithms.', whyInteresting: 'Explains why scaling remains the dominant paradigm despite many researchers believing it has limits.', type: 'research' },
  ],
  futureScenarios: {
    nearTerm: [
      { scenario: 'AI Agent Proliferation', signals: ['Claude 3.5 Computer Use shipped', 'OpenAI Operator launched', 'Millions of "agent" products'], assumptions: ['Agents become reliable enough for multi-step tasks'], trigger: 'One widely-deployed reliable consumer AI agent', impact: 'Significant productivity gains; new automation layer added to software stack', uncertainty: 'medium', type: 'growth' },
      { scenario: 'AI Regulatory Fragmentation', signals: ['EU AI Act live', 'US state AI laws emerging', 'China national AI strategy'], assumptions: ['No global AI treaty in next 2 years'], trigger: 'High-profile AI-caused incident triggers reactive legislation', impact: 'Compliance cost increases for global AI companies; geographic AI capability gaps', uncertainty: 'low', type: 'risk' },
    ],
    mediumTerm: [
      { scenario: 'AGI Debate Resolved', signals: ['Reasoning benchmarks improving', 'Scaling law continuation'], assumptions: ['Current architectural approaches continue improving'], trigger: 'Model that passes all domain expert benchmarks consistently', impact: 'Massive economic and geopolitical restructuring; existential policy debate intensifies', uncertainty: 'high', type: 'disruption' },
      { scenario: 'AI Specialization Dominates', signals: ['Domain-specific AI outperforming general models', 'Industry vertical AI investment'], assumptions: ['General models plateau; domain fine-tuning wins'], trigger: 'Enterprise procurement shift toward vertical AI', impact: 'New wave of specialized AI startups; NVIDIA position threatened by ASICs', uncertainty: 'medium', type: 'growth' },
    ],
    longTerm: [
      { scenario: 'Human-AI Cognitive Integration', signals: ['Neuralink progress', 'AR/VR + AI interfaces'], assumptions: ['Safe brain-computer interface achieved'], trigger: 'First mass-market BCI product with AI integration', impact: 'Fundamental change to human cognition and competition', uncertainty: 'high', type: 'disruption' },
    ],
  },
  heatmap: [
    { area: 'Generative AI', heat: 5, trend: 'rising', description: 'Text, image, video, audio, and code generation. Hottest area.' },
    { area: 'AI Agents', heat: 5, trend: 'rising', description: 'Autonomous AI systems completing multi-step real-world tasks.' },
    { area: 'AI Coding', heat: 5, trend: 'rising', description: 'GitHub Copilot, Cursor, Claude for coding. Reshaping software development.' },
    { area: 'AI Hardware', heat: 4, trend: 'rising', description: 'NVIDIA dominance, AMD challenge, custom ASICs from Google/Amazon.' },
    { area: 'AI Safety', heat: 4, trend: 'rising', description: 'Alignment, interpretability, governance. Growing urgency.' },
    { area: 'AI Healthcare', heat: 4, trend: 'rising', description: 'Drug discovery, diagnostics, clinical decision support.' },
    { area: 'AI Robotics', heat: 3, trend: 'emerging', description: 'Vision-language-action models. Tesla Optimus, Figure AI.' },
    { area: 'AI Education', heat: 3, trend: 'rising', description: 'Personalized tutoring, essay feedback, curriculum design.' },
    { area: 'AI Legal', heat: 3, trend: 'rising', description: 'Contract review, case research, compliance automation.' },
    { area: 'AI Finance', heat: 4, trend: 'rising', description: 'Algorithmic trading, fraud detection, risk modeling.' },
    { area: 'AI Regulation', heat: 4, trend: 'rising', description: 'EU AI Act, US executive orders, China AI rules.' },
    { area: 'Edge AI', heat: 3, trend: 'emerging', description: 'On-device AI models for privacy and offline use.' },
  ],
  comparison: {
    headers: ['Feature', 'OpenAI GPT-4o', 'Anthropic Claude 3.5', 'Google Gemini 2.0', 'Meta LLaMA 3'],
    rows: [
      ['Founded', '2015', '2021', '1998 (DeepMind 2010)', '2004'],
      ['Key Strength', 'Largest user base, plugins', 'Safety-focused, long context', 'Multimodal breadth, search', 'Open source, customizable'],
      ['Context Window', '128K tokens', '200K tokens', '1M tokens', '128K tokens'],
      ['Open Source', 'No', 'No', 'No', 'Yes (weights)'],
      ['Coding Ability', 'Very Strong', 'Very Strong', 'Strong', 'Strong'],
      ['API Access', 'Commercial', 'Commercial', 'Commercial', 'Free/Self-hosted'],
    ],
  },
  sources: [
    { name: 'Nature', title: 'Highly accurate protein structure prediction with AlphaFold', type: 'research', date: '2021', url: 'https://nature.com/articles/s41586-021-03819-2' },
    { name: 'OpenAI', title: 'GPT-4 Technical Report', type: 'company', date: '2023', url: 'https://openai.com/research/gpt-4' },
    { name: 'Goldman Sachs', title: 'The Potentially Large Effects of Artificial Intelligence on Economic Growth', type: 'data', date: '2023', url: 'https://www.goldmansachs.com' },
    { name: 'Reuters', title: 'EU AI Act: A global first in AI regulation', type: 'news', date: '2024', url: 'https://reuters.com' },
  ],
  earlySignals: [
    { signal: 'AI-designed AI architectures (Neural Architecture Search at scale)', why: 'If AI can design better AI architectures than humans, the iteration speed on capability becomes recursive.', confidence: 'early', source: 'arXiv papers 2024' },
    { signal: 'Sovereign AI Infrastructure Buildouts', why: 'Multiple countries (UAE, Singapore, France, India) building national AI compute infrastructure. May fragment the global AI stack.', confidence: 'emerging', source: 'Government announcements' },
    { signal: 'AI-native operating systems', why: 'Early signs of OS-level AI integration (Apple Intelligence, Microsoft Copilot+ PCs) may fundamentally change software interaction patterns.', confidence: 'early', source: 'Product announcements' },
  ],
  summaryModes: {
    quick: 'AI has gone mainstream. Models like GPT-4, Claude, and Gemini can now reason, code, create, and act autonomously. This is the biggest technological shift since the internet, driven by transformers, massive compute, and intense competition.',
    deep: 'Artificial intelligence in 2025 represents the convergence of four decades of research reaching a commercial inflection point...',
    student: 'Imagine teaching a computer to understand and write text so well it can pass college exams, write code, and explain complex topics — by reading trillions of pages of internet text. That\'s roughly what happened with AI. The key breakthrough was the "transformer" in 2017 — a clever math trick that lets computers understand context in language. Then ChatGPT in 2022 made it available to everyone.',
    business: 'AI represents a $15.7 trillion economic opportunity by 2030 (PwC). Key business impacts: 30–55% developer productivity gains, customer service automation (saving $8B/year in banking alone), AI-driven drug discovery reducing R&D timelines by 40%. Primary business risk: competitors adopting AI faster, creating cost-structure advantages.',
    builder: 'Technical opportunities: RAG architectures for grounded AI products, fine-tuned domain-specific models, agent orchestration frameworks, AI safety tooling, evaluation benchmarks. Key stack: Python, PyTorch/Jax, CUDA, Hugging Face, LangChain/LlamaIndex. High-value verticals: legal AI, healthcare AI, education AI, code review AI.',
    research: 'Open problems: Reliable factual grounding (hallucination elimination), sample efficiency (humans learn from far fewer examples), causal reasoning (not just correlation), long-horizon planning, interpretability of internal representations, safe RLHF alignment. Key venues: NeurIPS, ICML, ICLR, ACL. Key papers: Transformers (2017), GPT-3 scaling laws (2020), Constitutional AI (Anthropic, 2022).',
  },
  projectIdeas: [
    { title: 'AI Hallucination Detector', problem: 'AI outputs cannot be trusted without verification', solution: 'Real-time claim verification system that cross-references AI outputs against curated knowledge bases', tech: ['LLMs', 'RAG', 'Wikipedia API', 'FactCC'], difficulty: 'Medium', mvp: 'Chrome extension that highlights uncertain AI claims', users: 'Students, researchers, journalists' },
    { title: 'Domain-Specific Fine-Tuned Medical Q&A', problem: 'General AI models are unreliable for clinical decisions', solution: 'Fine-tuned model on medical literature with mandatory source citation and confidence scores', tech: ['LLaMA 3', 'LoRA fine-tuning', 'PubMed API', 'RAG'], difficulty: 'Hard', mvp: 'Drug interaction checker for pharmacists', users: 'Healthcare professionals' },
    { title: 'AI Bias Audit Tool', problem: 'AI systems encode societal biases without detection', solution: 'Automated pipeline that runs demographic parity tests across AI API endpoints and generates audit reports', tech: ['Python', 'Fairlearn', 'OpenAI API', 'Anthropic API'], difficulty: 'Medium', mvp: 'Bias report for hiring AI tools', users: 'Enterprise HR teams, regulators' },
    { title: 'Personal AI Learning Tutor', problem: 'Quality education is expensive and geographically constrained', solution: 'AI tutor that adapts explanation depth, language, and style based on student responses using Socratic method', tech: ['LLM API', 'React', 'Knowledge graph', 'Spaced repetition algorithm'], difficulty: 'Medium', mvp: 'High school mathematics tutor', users: 'Students K-12 and university' },
  ],
  followUpQuestions: [
    { question: 'How does NVIDIA fit into the AI story?', topic: 'NVIDIA' },
    { question: 'What happened with OpenAI in the past year?', topic: 'OpenAI' },
    { question: 'What is the AI safety debate about?', topic: 'AI Safety' },
    { question: 'How is AI affecting jobs and employment?', topic: 'AI Job Displacement' },
    { question: 'What is generative AI specifically?', topic: 'Generative AI' },
    { question: 'Which countries are leading in AI development?', topic: 'AI Geopolitics' },
    { question: 'What could disrupt the current AI paradigm?', topic: 'AI Disruption' },
    { question: 'How can a developer build with AI today?', topic: 'AI Development' },
  ],
};

// ──────────────────────────────────────────────────
// NVIDIA
// ──────────────────────────────────────────────────
const NVIDIA_REPORT = {
  topic: 'NVIDIA',
  category: 'Technology',
  subcategory: 'Semiconductors & AI Infrastructure',
  currentStatus: 'Market Dominance',
  confidence: 96,
  trendMomentum: { signal: 'rising', description: 'NVIDIA\'s market cap surpassed $3 trillion, briefly making it the world\'s most valuable company. Demand for H100/H200 GPUs vastly exceeds supply.', level: 5 },
  geographicRelevance: ['Global', 'USA', 'Taiwan', 'China', 'Europe'],
  keywords: ['GPU', 'H100', 'CUDA', 'AI compute', 'Jensen Huang', 'Blackwell', 'data center'],
  relatedTopics: ['Artificial Intelligence', 'Semiconductors', 'TSMC', 'AMD', 'Data Centers'],
  profile: {
    description: 'NVIDIA designs graphics processing units (GPUs) that have become the de facto standard for AI model training and inference. Its CUDA software platform creates deep vendor lock-in.',
    majorEntities: ['NVIDIA', 'TSMC (manufacturing)', 'Microsoft', 'Amazon', 'Google', 'Meta'],
    keyPeople: ['Jensen Huang (CEO)', 'Bill Dally (Chief Scientist)', 'Colette Kress (CFO)'],
    majorTechnologies: ['H100 GPU', 'H200 GPU', 'Blackwell B200', 'CUDA', 'NeMo', 'DGX Cloud'],
    industriesAffected: ['AI', 'Data Centers', 'Autonomous Vehicles', 'Gaming', 'Robotics', 'Scientific Computing'],
  },
  tenPoints: [
    { num: '01', question: 'What is happening?', answer: 'NVIDIA has transformed from a gaming GPU company into the infrastructure backbone of the AI economy, controlling ~90% of AI training hardware market.' },
    { num: '02', question: 'Why is it happening?', answer: 'AI training requires massive parallel computation. NVIDIA\'s CUDA platform, developed since 2007, gave AI researchers a programmable GPU environment that competitors still struggle to match.' },
    { num: '03', question: 'How did it start?', answer: 'Founded in 1993 for video game graphics. 2006 CUDA launch allowed GPUs for general computing. 2012 AlexNet researchers accidentally discovered NVIDIA GPUs were perfect for deep learning.' },
    { num: '04', question: 'What changed?', answer: 'ChatGPT\'s 2022 viral success triggered trillion-dollar AI investment. Every hyperscaler (Amazon, Google, Microsoft, Meta) ordered NVIDIA GPUs at scale, creating multi-year backlogs.' },
    { num: '05', question: 'Who are the important people?', answer: 'Jensen Huang (visionary CEO), Bill Dally (Chief Scientist, invented key deep learning primitives), Ian Buck (CUDA creator).' },
    { num: '06', question: 'Which organizations matter?', answer: 'TSMC (manufactures NVIDIA chips), AMD (main competitor), Intel (distant competitor), Google (TPU alternative), Cerebras/Groq (specialized AI chip challengers).' },
    { num: '07', question: 'Who is driving it now?', answer: 'Hyperscaler AI arms race. Microsoft, Google, Amazon, and Meta collectively spending $300B+ on AI infrastructure, with NVIDIA GPUs as primary component.' },
    { num: '08', question: 'What problems exist?', answer: 'Supply chain concentration (TSMC Taiwan risk), export controls to China, power consumption of GPU clusters, rising competition from custom silicon (Google TPU, Amazon Trainium), CUDA moat erosion attempts.' },
    { num: '09', question: 'What opportunities exist?', answer: 'Robotics computing platform, autonomous vehicle AI, inference optimization, new markets in manufacturing/science AI.' },
    { num: '10', question: 'What could happen next?', answer: 'Blackwell ultra chip generation in 2025–2026, potential NVIDIA NIM software platform becoming key AI deployment layer, robotics as next major growth segment.' },
  ],
  bigPicture: {
    whatIsHappening: 'NVIDIA became the world\'s most valuable company in 2024, briefly surpassing Apple and Microsoft. Its GPUs power virtually all major AI systems — from ChatGPT to self-driving cars. Revenue grew from $27B (FY2023) to $130B+ (FY2025).',
    whyTrending: ['AI investment wave creating insatiable GPU demand', 'CUDA software platform makes switching costly', 'No credible alternative at scale for 2+ years', 'Jensen Huang\'s visionary positioning dating back to 2016'],
    whyShouldICare: 'NVIDIA\'s dominance shapes which AI capabilities get built, how fast, and at what cost. Its supply constraints have delayed AI projects globally. Its export restrictions affect geopolitical AI competition.',
    whoIsAffected: [
      { group: 'AI Companies', impact: 'Dependent on NVIDIA for compute. H100 GPU shortages delayed many 2023-2024 products.', direction: 'mixed' },
      { group: 'Investors', impact: 'NVIDIA stock returned 3000%+ from 2020 to 2024 peak.', direction: 'positive' },
      { group: 'Researchers', impact: 'GPU access determines research capability. Large labs advantage.', direction: 'mixed' },
      { group: 'Governments', impact: 'Export controls on advanced chips shape geopolitical AI competition.', direction: 'mixed' },
    ],
  },
  trendDNA: {
    origin: { period: '1993', event: 'NVIDIA founded by Jensen Huang, Chris Malachowsky, and Curtis Priem to build GPUs for video games.' },
    trigger: { period: '2006', event: 'CUDA platform launched — GPUs become programmable for general computation beyond graphics.' },
    growth: { period: '2012–2017', event: 'AlexNet researchers use NVIDIA GPUs for deep learning. CUDA becomes the AI research standard.' },
    acceleration: { period: '2020–2022', event: 'A100 GPU launches. COVID accelerates data center buildout. First AGI discussions.' },
    now: { period: '2023–2026', event: 'H100, H200, Blackwell GPUs. Market cap reaches $3T. "NVIDIA AI" brand dominates.' },
    future: { period: '2027+', event: 'Robotics platform, inference optimization, CUDA moat challenged by alternatives.' },
  },
  timeline: [
    { year: '1993', date: '1993', event: 'NVIDIA Founded', who: 'Jensen Huang, Malachowsky, Priem', what: 'Founded to develop GPUs for 3D gaming.', why: 'Video game demand drove GPU advancement.', impact: 'MEDIUM' },
    { year: '2006', date: '2006', event: 'CUDA Platform Launch', who: 'NVIDIA', what: 'Launched CUDA — general-purpose GPU computing platform.', why: 'Opened GPUs to scientific computing and eventually AI.', impact: 'HIGH', turningPoint: true },
    { year: '2012', date: '2012', event: 'AlexNet Uses NVIDIA GPUs', who: 'Krizhevsky, Sutskever, Hinton', what: 'Trained AlexNet on NVIDIA GTX 580 GPUs, winning ImageNet by a large margin.', why: 'Established NVIDIA as the AI training hardware.', impact: 'HIGH', turningPoint: true },
    { year: '2016', date: '2016', event: 'Jensen Huang: "AI is the new computing"', who: 'Jensen Huang', what: 'Pivots NVIDIA strategy explicitly toward AI/deep learning.', why: 'Repositioned company narrative and R&D years before the AI boom.', impact: 'HIGH' },
    { year: '2020', date: '2020', event: 'A100 GPU Launch', who: 'NVIDIA', what: 'A100 — first AI-specific GPU. 5nm TSMC process. 20x AI performance vs previous gen.', why: 'Purpose-built for transformer model training.', impact: 'HIGH' },
    { year: '2023', date: '2023', event: 'H100 GPU — ChatGPT era', who: 'NVIDIA', what: 'H100 ships. ChatGPT triggers massive hyperscaler orders. Revenue triples in one year.', why: 'Supply constraint at the center of AI infrastructure.', impact: 'HIGH', turningPoint: true },
    { year: '2024', date: '2024', event: '$3 Trillion Market Cap', who: 'NVIDIA', what: 'Briefly surpasses Apple as world\'s most valuable company.', why: 'AI investment wave reflected in compute infrastructure demand.', impact: 'HIGH' },
  ],
  people: [
    { name: 'Jensen Huang', role: 'CEO & Co-founder', org: 'NVIDIA', contribution: 'Visionary leadership. Pivoted from gaming to AI 7 years before the boom. Known for leather jacket and technical depth. Often called "the most important CEO in tech".', influence: 'very high' },
  ],
  entities: [
    { name: 'TSMC', type: 'company', industry: 'Semiconductor Manufacturing', role: 'Manufactures NVIDIA chips. All advanced NVIDIA GPUs (A100, H100, Blackwell) fabricated exclusively at TSMC Taiwan.', relationship: 'Critical dependency — Taiwan geopolitical risk' },
    { name: 'AMD', type: 'company', industry: 'Semiconductors', role: 'Main competitor. MI300X GPU competes with H100. Growing adoption at Microsoft, Meta. Estimated 10–15% AI GPU market share.', relationship: 'Primary competitor' },
    { name: 'CUDA', type: 'technology', industry: 'Software Platform', role: 'Programming model for NVIDIA GPUs. 15+ year head start creates deep lock-in. Most AI researchers only know CUDA.', adoption: '15M+ developers', relationship: 'Primary competitive moat' },
  ],
  currentEvents: [
    { headline: 'NVIDIA Blackwell B200 Shipments Begin', date: 'Q2 2025', source: 'Bloomberg', summary: 'NVIDIA began large-scale Blackwell B200 GPU shipments to hyperscalers. B200 offers 4x inference performance vs H100.', whyItMatters: 'Extends NVIDIA\'s performance lead and secures multi-year revenue visibility.', evidence: 'high' },
    { headline: 'Export Controls Tighten — China Revenue Impact', date: '2025', source: 'Reuters', summary: 'US government tightened export controls on H100-equivalent chips to China, impacting ~20% of NVIDIA\'s addressable market.', whyItMatters: 'China restriction creates both risk and opportunity for alternative chip makers in China.', evidence: 'high' },
  ],
  drivers: [
    { name: 'Hyperscaler AI Arms Race', type: 'economic', description: 'Microsoft, Google, Meta, Amazon collectively spending $300B+ on AI infrastructure. NVIDIA GPU is the primary line item.', impact: 'Primary revenue driver' },
    { name: 'CUDA Software Lock-in', type: 'technological', description: 'Millions of ML engineers trained only on CUDA. Switching to AMD ROCm or custom silicon requires relearning tools and debugging unfamiliar software.', impact: 'Primary moat' },
  ],
  problems: [
    { id: 'p1', category: 'Geopolitical', title: 'Taiwan Manufacturing Concentration', description: 'All advanced NVIDIA GPUs manufactured at TSMC Taiwan. A Taiwan conflict or natural disaster could halt AI chip production globally.', evidence: 'TSMC Taiwan produces >90% of advanced semiconductors.', affected: ['AI Companies', 'Governments', 'Global Economy'], severity: 'high', solutions: ['TSMC Arizona expansion', 'Intel Foundry diversification'], gaps: 'New fabs take 5–7 years to build.', evidenceStrength: 'high' },
    { id: 'p2', category: 'Economic', title: 'Export Control Revenue Risk', description: 'US export controls block advanced NVIDIA chips to China. China represents ~20% of addressable market.', evidence: 'NVIDIA disclosed China revenue decline in SEC filings.', affected: ['NVIDIA shareholders', 'Chinese AI companies'], severity: 'medium', solutions: ['China-specific chip variants (H20)', 'Middle East and India market expansion'], gaps: 'China restriction likely to tighten further.', evidenceStrength: 'high' },
  ],
  opportunities: [
    { problem: 'Inference compute inefficiency', improvement: 'Specialized inference chips and compilation optimizations to reduce cost per query by 10x', whoCouldBuild: 'Groq, Cerebras, Etched, new startups', impact: 'Make AI inference economically viable at massive scale', difficulty: 'Hard' },
    { problem: 'High GPU energy consumption', improvement: 'Photonic computing and neuromorphic chips for AI inference at fraction of power', whoCouldBuild: 'Research labs, deep-tech startups', impact: 'Enable AI at edge and in developing markets', difficulty: 'Very Hard' },
  ],
  deepDiscovery: [
    { title: 'NVIDIA\'s Gaming Business Effectively Funded the AI Revolution', description: 'For two decades, gaming GPU revenue funded CUDA development, research collaborations, and the A100/H100 development. Gamers unknowingly subsidized AI infrastructure.', whyInteresting: 'The most transformative technology infrastructure of the AI era was funded by teenagers playing video games.', type: 'historical' },
  ],
  futureScenarios: {
    nearTerm: [
      { scenario: 'Blackwell Supercycle', signals: ['Record hyperscaler capex commitments', 'Multi-year order backlogs'], assumptions: ['AI training demand continues growing'], trigger: 'LLM training for next frontier model requires Blackwell cluster', impact: 'NVIDIA revenue reaches $200B+ run rate by 2026', uncertainty: 'low', type: 'growth' },
    ],
    mediumTerm: [
      { scenario: 'Custom Silicon Erosion', signals: ['Google TPUv5 deployed at scale', 'Amazon Trainium 2', 'Meta MTIA'], assumptions: ['Hyperscalers successfully reduce NVIDIA dependence for inference'], trigger: 'One hyperscaler fully migrates inference workloads off NVIDIA', impact: 'Inference market share falls 20–30%; training moat remains', uncertainty: 'medium', type: 'risk' },
    ],
    longTerm: [
      { scenario: 'Robotics Platform Dominance', signals: ['NVIDIA Isaac Robotics Platform', 'Partnership with Figure/Boston Dynamics', 'Jetson edge AI'], assumptions: ['Humanoid robots reach commercial scale 2027+'], trigger: 'Killer robotics use case requiring AI vision at edge', impact: 'New multi-hundred-billion robotics compute market for NVIDIA', uncertainty: 'medium', type: 'growth' },
    ],
  },
  heatmap: [
    { area: 'H100/H200 AI Training', heat: 5, trend: 'rising', description: 'Primary revenue segment. Backlogged 18+ months.' },
    { area: 'Blackwell B200', heat: 5, trend: 'rising', description: 'Next generation. 4x inference performance.' },
    { area: 'NVIDIA NIM Software', heat: 4, trend: 'rising', description: 'Inference microservices. Software revenue play.' },
    { area: 'Automotive / DRIVE', heat: 3, trend: 'stable', description: 'Self-driving AI platform. Growing but slower.' },
    { area: 'Gaming RTX', heat: 2, trend: 'stable', description: 'Original business. Overshadowed by data center.' },
    { area: 'Robotics / Isaac', heat: 3, trend: 'emerging', description: 'Early platform for humanoid robots.' },
  ],
  sources: [
    { name: 'NVIDIA', title: 'Q4 FY2025 Earnings Report', type: 'company', date: '2025', url: 'https://investor.nvidia.com' },
    { name: 'Bloomberg', title: 'NVIDIA Crosses $3 Trillion Market Cap', type: 'news', date: '2024', url: 'https://bloomberg.com' },
    { name: 'Reuters', title: 'US Tightens AI Chip Export Controls', type: 'news', date: '2025', url: 'https://reuters.com' },
  ],
  earlySignals: [
    { signal: 'NVIDIA entering enterprise software (NIM microservices, DGX Cloud)', why: 'Transition from hardware company to platform company would dramatically expand margins and moat.', confidence: 'emerging', source: 'NVIDIA GTC 2024' },
  ],
  summaryModes: {
    quick: 'NVIDIA makes the chips that power AI. Its H100 GPU is so in demand that companies wait 18+ months for them. Revenue went from $27B to $130B in 2 years. It\'s now among the world\'s most valuable companies.',
    deep: 'NVIDIA\'s ascent to AI dominance was 15 years in the making...',
    student: 'Think of NVIDIA like the company that makes the special calculators needed for AI to work. AI needs to do billions of calculations at once — NVIDIA\'s GPUs (graphics cards, originally made for video games) turned out to be perfect for this. Now everyone building AI needs NVIDIA chips.',
    business: 'NVIDIA represents a compute infrastructure monopoly. Revenue grew 262% YoY in FY2025. Gross margins at 78%. The risk is custom silicon from hyperscalers reducing long-term TAM for inference. Trading at 35x forward earnings.',
    builder: 'CUDA is the skill that unlocks NVIDIA hardware. Learn PyTorch/CUDA programming. NVIDIA NIM provides inference APIs without raw GPU access. Key: most AI startups rent NVIDIA GPUs from AWS/Azure/GCP — direct purchase economics only work at hyperscaler scale.',
    research: 'NVIDIA publishes extensively on GPU architecture, parallel computing optimization, and AI-specific hardware. Key: Tensor Core architecture evolution, NVLink interconnect bandwidth, and Flash Attention CUDA kernels.',
  },
  projectIdeas: [
    { title: 'GPU Utilization Monitor & Optimizer', problem: 'Companies rent GPUs inefficiently, wasting 30-60% of capacity', solution: 'Real-time GPU utilization dashboard with auto-scaling recommendations and idle detection', tech: ['NVIDIA NVML API', 'Python', 'React', 'Prometheus'], difficulty: 'Medium', mvp: 'Dashboard showing idle GPU time and cost waste', users: 'ML engineers, cost-conscious startups' },
  ],
  followUpQuestions: [
    { question: 'Who are NVIDIA\'s main competitors?', topic: 'AI Chip Competition' },
    { question: 'What is CUDA and why does it matter?', topic: 'CUDA Platform' },
    { question: 'How does AI hardware affect AI capabilities?', topic: 'AI Hardware' },
    { question: 'What is the Taiwan semiconductor risk?', topic: 'TSMC Taiwan Risk' },
  ],
};

// ──────────────────────────────────────────────────
// Dynamic Report Generator (for any unlisted topic)
// ──────────────────────────────────────────────────
export function generateDynamicReport(topic) {
  const cleanTopic = topic.trim();
  const words = cleanTopic.split(' ');
  const hashBase = cleanTopic.toLowerCase();
  const h = Array.from(hashBase).reduce((a, c) => a + c.charCodeAt(0), 0);

  const categories = ['Technology', 'Business', 'Science', 'Social', 'Finance', 'Policy', 'Culture'];
  const category = categories[h % categories.length];
  const confidence = 72 + (h % 23);

  return {
    topic: cleanTopic,
    category,
    subcategory: 'Trend Analysis',
    currentStatus: ['Accelerating', 'Stabilizing', 'Emerging', 'Evolving'][h % 4],
    confidence,
    _isGenerated: true,
    trendMomentum: {
      signal: ['rising', 'rising', 'stable', 'emerging'][h % 4],
      description: `${cleanTopic} is showing clear signals of ${['increasing public and industry attention', 'sustained engagement and investment', 'early-stage adoption patterns'][h % 3]}.`,
      level: 3 + (h % 3),
    },
    geographicRelevance: ['Global', 'North America', 'Asia-Pacific'].slice(0, 2 + (h % 2)),
    keywords: words.map(w => w.toLowerCase()),
    relatedTopics: ['Technology Trends', 'Innovation', 'Digital Transformation', 'Industry 4.0'].slice(0, 3),
    profile: {
      description: `${cleanTopic} represents an emerging or established area of significance attracting growing attention from researchers, investors, and practitioners. This analysis synthesizes available knowledge to provide a structured intelligence overview.`,
      majorEntities: ['Leading Companies', 'Research Institutions', 'Government Bodies'],
      keyPeople: ['Industry Leaders', 'Researchers', 'Policy Makers'],
      majorTechnologies: ['Core Technologies', 'Enabling Platforms', 'Supporting Infrastructure'],
      industriesAffected: [category, 'Technology', 'Business', 'Society'],
    },
    tenPoints: [
      { num: '01', question: 'What is happening?', answer: `${cleanTopic} is experiencing meaningful development with increasing attention from multiple stakeholder groups including industry, research, and policy communities.` },
      { num: '02', question: 'Why is it happening?', answer: 'Convergence of technological capability improvements, economic incentives, and growing awareness is driving activity in this space.' },
      { num: '03', question: 'How did it start?', answer: 'Initial development traces to foundational work by early researchers and practitioners who identified the potential of this area.' },
      { num: '04', question: 'What changed?', answer: 'Recent advances in enabling technologies and infrastructure have lowered barriers to entry and accelerated practical applications.' },
      { num: '05', question: 'Who are the important people?', answer: 'Key figures include founders and leaders of organizations driving this trend, researchers pushing boundaries, and policy makers shaping the regulatory environment.' },
      { num: '06', question: 'Which organizations matter?', answer: 'Leading companies, academic research groups, and industry associations are the primary organizational actors shaping this trend.' },
      { num: '07', question: 'Who is driving it now?', answer: 'Current momentum is driven by a combination of commercial competition, research breakthroughs, and growing consumer/enterprise demand.' },
      { num: '08', question: 'What problems exist?', answer: 'Technical challenges around reliability and scale, economic challenges around cost and access, and social challenges around equity and regulation.' },
      { num: '09', question: 'What opportunities exist?', answer: 'Significant opportunities exist for startups, researchers, and established companies to address unmet needs, improve existing solutions, and create new value.' },
      { num: '10', question: 'What could happen next?', answer: 'Near-term trajectory suggests continued growth and maturation. Long-term scenarios depend on resolution of current technical and regulatory challenges.' },
    ],
    bigPicture: {
      whatIsHappening: `${cleanTopic} is an area seeing growing activity across research, commercial development, and public discourse. Multiple indicators suggest this is an important area to watch.`,
      whyTrending: ['Technological enablers reaching maturity', 'Growing commercial and institutional investment', 'Increasing public and media attention', 'Real-world applications demonstrating value'],
      whyShouldICare: `Understanding ${cleanTopic} is increasingly important for professionals, students, and decision-makers who want to anticipate technological and social changes that may affect their domain.`,
      whoIsAffected: [
        { group: 'Industry', impact: 'Potential disruption to existing business models and creation of new market opportunities.', direction: 'mixed' },
        { group: 'Researchers', impact: 'Rich area for investigation with many open questions and opportunities for impactful contributions.', direction: 'positive' },
        { group: 'Students', impact: 'Learning this area now positions students well for future careers.', direction: 'positive' },
        { group: 'Society', impact: 'Broader social implications require careful consideration of ethics and equity.', direction: 'mixed' },
      ],
    },
    trendDNA: {
      origin: { period: 'Historical', event: `Early foundations and initial research establishing the conceptual basis for ${cleanTopic}.` },
      trigger: { period: 'Key Period', event: 'A specific breakthrough, product launch, or event that catalyzed mainstream attention.' },
      growth: { period: 'Growth Phase', event: 'Expanding research community, early commercial applications, and growing investment.' },
      acceleration: { period: 'Acceleration', event: 'Multiple factors converging to rapidly expand adoption and capability.' },
      now: { period: 'Present', event: `Current state: ${['rapidly expanding', 'consolidating around key players', 'entering mainstream adoption'][h % 3]}.` },
      future: { period: 'Future', event: 'Continued evolution depending on technical progress, regulation, and market dynamics.' },
    },
    timeline: [
      { year: '2015', date: '2015', event: 'Foundational Period', who: 'Early Researchers', what: 'Initial groundwork established.', why: 'Laid conceptual foundation.', impact: 'MEDIUM' },
      { year: '2018', date: '2018', event: 'Early Development', who: 'Researchers & Companies', what: 'First practical demonstrations and products.', why: 'Proved feasibility.', impact: 'MEDIUM' },
      { year: '2020', date: '2020', event: 'Acceleration Begins', who: 'Industry', what: 'Investment and interest accelerates.', why: 'Enabling technologies matured.', impact: 'HIGH', turningPoint: true },
      { year: '2022', date: '2022', event: 'Mainstream Attention', who: 'Media & Public', what: 'Enters mainstream discourse.', why: 'High-profile products and events.', impact: 'HIGH' },
      { year: '2024', date: '2024', event: 'Current State', who: 'Global Community', what: 'Continued growth and maturation.', why: 'Strong momentum.', impact: 'HIGH' },
    ],
    people: [
      { name: 'Leading Researchers', role: 'Research & Development', org: 'Academic & Industry Labs', contribution: 'Pushing the boundaries of what is technically possible.', influence: 'high' },
      { name: 'Entrepreneurs & Founders', role: 'Commercial Development', org: 'Startups & Companies', contribution: 'Translating research into products and services.', influence: 'high' },
    ],
    entities: [
      { name: 'Leading Companies', type: 'company', industry: category, role: `Primary commercial developers in the ${cleanTopic} space.`, products: ['Core products', 'Services', 'Platforms'], relationship: 'Primary commercial actors' },
      { name: 'Research Institutions', type: 'company', industry: 'Academia', role: 'Generating foundational knowledge and training next generation of experts.', products: ['Research', 'Papers', 'Graduates'], relationship: 'Knowledge generation' },
    ],
    currentEvents: [
      { headline: `Recent Developments in ${cleanTopic}`, date: 'Recent', source: 'Industry Reports', summary: `Multiple organizations are actively developing and deploying solutions in the ${cleanTopic} space, with increasing investment and attention.`, whyItMatters: 'Indicates active and growing ecosystem.', evidence: 'medium' },
    ],
    drivers: [
      { name: 'Technological Progress', type: 'technological', description: 'Continued improvement in enabling technologies reduces barriers and expands possibilities.', impact: 'Primary technical driver' },
      { name: 'Market Demand', type: 'economic', description: 'Growing commercial demand drives investment and competitive development.', impact: 'Commercial momentum' },
    ],
    problems: [
      { id: 'p1', category: 'Technical', title: 'Technical Complexity & Reliability', description: `Achieving consistent reliability and performance at scale remains challenging in ${cleanTopic}.`, evidence: 'Common challenge documented across similar technology areas.', affected: ['Developers', 'End Users', 'Enterprises'], severity: 'medium', solutions: ['Improved tooling', 'Better standards', 'More research'], gaps: 'No complete solution exists yet.', evidenceStrength: 'medium' },
      { id: 'p2', category: 'Economic', title: 'Access & Cost Barriers', description: 'Current solutions may be too expensive or complex for broad adoption.', evidence: 'Adoption patterns suggest cost is a significant barrier.', affected: ['Small businesses', 'Developing regions', 'Individuals'], severity: 'medium', solutions: ['Open source alternatives', 'Cost reduction through scale'], gaps: 'Accessibility gap remains significant.', evidenceStrength: 'medium' },
    ],
    opportunities: [
      { problem: `Complexity of ${cleanTopic}`, improvement: 'Tools and platforms that make it easier for non-experts to benefit', whoCouldBuild: 'Startups, established tech companies', impact: 'Massive expansion of accessible users', difficulty: 'Medium' },
      { problem: 'Education gap', improvement: `Courses, resources, and communities helping people learn ${cleanTopic}`, whoCouldBuild: 'EdTech companies, universities, creators', impact: 'Build next generation of skilled practitioners', difficulty: 'Low' },
    ],
    deepDiscovery: [
      { title: `The ${cleanTopic} Connection Nobody Talks About`, description: `${cleanTopic} has interesting structural similarities to previous technology transitions that most commentators overlook.`, whyInteresting: 'Historical patterns can provide insight into likely trajectory and timing of key transitions.', type: 'connection' },
    ],
    futureScenarios: {
      nearTerm: [
        { scenario: 'Continued Growth', signals: ['Investment trends', 'Adoption metrics', 'Talent flows'], assumptions: ['Current conditions persist'], trigger: 'No major disruption', impact: 'Incremental expansion of capabilities and applications', uncertainty: 'low', type: 'growth' },
        { scenario: 'Regulatory Intervention', signals: ['Government attention', 'Public concern'], assumptions: ['Major incident triggers policy response'], trigger: 'High-profile negative event', impact: 'Compliance burden increases; may slow development', uncertainty: 'medium', type: 'risk' },
      ],
      mediumTerm: [
        { scenario: 'Market Consolidation', signals: ['M&A activity', 'VC pullback from smaller players'], assumptions: ['Winner-take-most dynamics emerge'], trigger: 'One or two dominant platforms emerge', impact: 'Smaller players struggle; dominant platforms gain pricing power', uncertainty: 'medium', type: 'risk' },
      ],
      longTerm: [
        { scenario: 'Mature, Commoditized Infrastructure', signals: ['Open source alternatives', 'Standardization efforts'], assumptions: ['Technology matures and standardizes'], trigger: 'Open source equivalent reaches parity', impact: 'Democratization of access; commoditization of current differentiators', uncertainty: 'medium', type: 'growth' },
      ],
    },
    heatmap: [
      { area: `Core ${cleanTopic}`, heat: 4, trend: 'rising', description: 'Primary area of activity and investment.' },
      { area: 'Applications & Products', heat: 4, trend: 'rising', description: 'Commercial products and services.' },
      { area: 'Infrastructure', heat: 3, trend: 'stable', description: 'Enabling infrastructure and tools.' },
      { area: 'Education & Community', heat: 3, trend: 'rising', description: 'Learning resources and communities.' },
      { area: 'Policy & Regulation', heat: 3, trend: 'rising', description: 'Regulatory and governance frameworks.' },
      { area: 'Research', heat: 4, trend: 'rising', description: 'Academic and industry research.' },
    ],
    comparison: {
      headers: ['Aspect', 'Leader A', 'Leader B', 'Leader C'],
      rows: [
        ['Market Position', 'Dominant', 'Challenger', 'Emerging'],
        ['Key Strength', 'Scale & Resources', 'Innovation', 'Specialized Focus'],
        ['Primary Weakness', 'Organizational complexity', 'Resource constraints', 'Limited reach'],
        ['Recent Activity', 'Major product launch', 'Funding round', 'Partnership announcement'],
      ],
    },
    sources: [
      { name: 'Industry Reports', title: `Analysis of ${cleanTopic} trends`, type: 'data', date: '2025', url: '#' },
      { name: 'Academic Research', title: 'Peer-reviewed studies in related areas', type: 'research', date: '2024-2025', url: '#' },
    ],
    earlySignals: [
      { signal: `Emerging new approaches to ${cleanTopic}`, why: 'Early-stage research suggests alternative approaches may gain traction.', confidence: 'early', source: 'Research papers' },
    ],
    summaryModes: {
      quick: `${cleanTopic} is an area of growing importance with significant activity across research, commercial development, and public discourse. Multiple stakeholders are investing in its development.`,
      deep: `A comprehensive analysis of ${cleanTopic} reveals a complex landscape of technical development, commercial competition, and social implications that rewards careful study...`,
      student: `${cleanTopic} is a topic worth learning about because it's going to affect many fields and careers. At its core, it's about [core concept] and why people and organizations are investing time and money in developing it further.`,
      business: `${cleanTopic} represents both an opportunity and a risk for businesses. Organizations that develop capability early will gain competitive advantages, while those that ignore it risk disruption.`,
      builder: `For builders, ${cleanTopic} offers opportunities to create tools, products, and services that address real needs. Key starting points: understand the current technical stack, identify underserved user segments, and look for problems that existing solutions don't address well.`,
      research: `${cleanTopic} has several important open research questions including technical challenges around scale and reliability, social questions around equity and access, and policy questions around appropriate governance.`,
    },
    projectIdeas: [
      { title: `${cleanTopic} Dashboard`, problem: 'Lack of comprehensive visibility into the ${cleanTopic} landscape', solution: `Aggregation and visualization platform for ${cleanTopic} data and trends`, tech: ['React', 'Node.js', 'Relevant APIs'], difficulty: 'Medium', mvp: 'Basic data aggregation and visualization', users: 'Researchers, professionals, investors' },
    ],
    followUpQuestions: [
      { question: `What's the history of ${cleanTopic}?`, topic: `History of ${cleanTopic}` },
      { question: `Who are the main players in ${cleanTopic}?`, topic: `Key Players ${cleanTopic}` },
      { question: `What problems does ${cleanTopic} solve?`, topic: `${cleanTopic} Applications` },
      { question: `What could disrupt ${cleanTopic}?`, topic: `${cleanTopic} Disruption` },
    ],
  };
}

// ──────────────────────────────────────────────────
// LOOKUP TABLE
// ──────────────────────────────────────────────────
const REPORTS = {
  'artificial intelligence': AI_REPORT,
  'ai': AI_REPORT,
  'nvidia': NVIDIA_REPORT,
};

export function getMockReport(topic) {
  const key = topic.toLowerCase().trim();
  // Fuzzy match
  for (const [k, v] of Object.entries(REPORTS)) {
    if (key === k || key.includes(k) || k.includes(key)) return { ...v };
  }
  return generateDynamicReport(topic);
}
