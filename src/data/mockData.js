export const EXAMPLES = [
  "Bengaluru traffic",
  "iPhone 17",
  "Indian electric vehicles",
  "New education policy",
];

export const EMOTION_META = [
  { key: "joy", label: "Joy" },
  { key: "anger", label: "Anger" },
  { key: "sadness", label: "Sadness" },
  { key: "fear", label: "Fear" },
  { key: "surprise", label: "Surprise" },
  { key: "disgust", label: "Disgust" },
  { key: "neutral", label: "Neutral" },
];

export const MOCK_TOPIC_DATA = {
  "bengaluru traffic": {
    topic: "Bengaluru traffic",
    confidence: 94,
    overall: { positive: 8, neutral: 19, negative: 73 },
    emotions: {
      joy: 2,
      anger: 48,
      sadness: 21,
      fear: 6,
      surprise: 5,
      disgust: 14,
      neutral: 4,
    },
    aspects: [
      {
        name: "Silk Board & Outer Ring Road",
        sentiment: "negative",
        note: "Chronic choke points causing 2+ hour daily commuter delays and severe frustration.",
      },
      {
        name: "Namma Metro Yellow Line Expansion",
        sentiment: "positive",
        note: "High public anticipation for driverless train corridors to relieve tech park congestion.",
      },
      {
        name: "Cab & Auto Surge Pricing",
        sentiment: "negative",
        note: "Rider backlash against exorbitant surge rates and frequent ride cancellations.",
      },
      {
        name: "Hybrid & Remote Work Demands",
        sentiment: "mixed",
        note: "Employees urging IT firms for continued work-from-home flexibility to bypass commutes.",
      },
      {
        name: "Traffic Police AI Signal Upgrades",
        sentiment: "mixed",
        note: "Moderate optimism for adaptive signal lights, though physical enforcement bottlenecks persist.",
      },
    ],
    topics: [
      { name: "ORR Congestion & Commute Times", pct: 36 },
      { name: "Metro Network Expansion", pct: 24 },
      { name: "Ride-Hailing & Auto Fares", pct: 18 },
      { name: "Potholes & Road Quality", pct: 14 },
      { name: "WFH vs Return to Office", pct: 8 },
    ],
    forecast: [
      { name: "Public outrage on peak monsoon waterlogging", direction: "up", level: "high" },
      { name: "Pressure on tech firms for staggered work hours", direction: "up", level: "medium" },
      { name: "Commuter shift toward operational metro feeder buses", direction: "stable", level: "medium" },
      { name: "Trust in road repair municipal deadlines", direction: "down", level: "high" },
    ],
    insight:
      "Public sentiment regarding Bengaluru traffic is overwhelmingly hostile, centered on Outer Ring Road bottlenecks and ride-hailing frictions. However, the impending Namma Metro connectivity represents a rare beacon of sustained positive anticipation among tech corridors.",
  },

  "iphone 17": {
    topic: "iPhone 17",
    confidence: 88,
    overall: { positive: 56, neutral: 28, negative: 16 },
    emotions: {
      joy: 42,
      anger: 8,
      sadness: 4,
      fear: 5,
      surprise: 26,
      disgust: 4,
      neutral: 11,
    },
    aspects: [
      {
        name: "Ultra-Thin 'Air' Redesign",
        sentiment: "positive",
        note: "Widespread aesthetic intrigue surrounding the rumored super-slim form factor.",
      },
      {
        name: "Apple Intelligence Integration",
        sentiment: "mixed",
        note: "Excitement over native on-device reasoning balanced against delayed regional rollouts.",
      },
      {
        name: "Pricing & Upgrade Value",
        sentiment: "negative",
        note: "Consumer fatigue regarding marginal annual upgrades at escalating premium prices.",
      },
      {
        name: "Camera Sensor Overhaul",
        sentiment: "positive",
        note: "Pro model telephoto lens enhancements generating strong buzz among mobile creators.",
      },
      {
        name: "Battery Capacity Trade-offs",
        sentiment: "mixed",
        note: "Apprehension that slimming the chassis might compromise all-day battery performance.",
      },
    ],
    topics: [
      { name: "Slim Form Factor Design", pct: 34 },
      { name: "Apple Intelligence Features", pct: 26 },
      { name: "Camera System Upgrades", pct: 19 },
      { name: "Pricing vs Value Proposition", pct: 13 },
      { name: "Display & ProMotion Refresh Rate", pct: 8 },
    ],
    forecast: [
      { name: "Hype around the sleek redesign variant", direction: "up", level: "high" },
      { name: "Debate over AI utility vs marketing novelty", direction: "up", level: "medium" },
      { name: "Patience with incremental standard model updates", direction: "down", level: "medium" },
      { name: "Pre-order momentum across Tier-1 markets", direction: "stable", level: "high" },
    ],
    insight:
      "Discourse around the iPhone 17 is predominantly enthusiastic, buoyed by the prospect of the first substantial chassis redesign in years. Critical attention remains tightly locked onto whether battery longevity will be compromised by the slim profile.",
  },

  "indian electric vehicles": {
    topic: "Indian electric vehicles",
    confidence: 91,
    overall: { positive: 51, neutral: 26, negative: 23 },
    emotions: {
      joy: 32,
      anger: 16,
      sadness: 7,
      fear: 12,
      surprise: 14,
      disgust: 6,
      neutral: 13,
    },
    aspects: [
      {
        name: "Two-Wheeler Market Penetration",
        sentiment: "positive",
        note: "Rapid adoption driven by lower running costs and expanding delivery fleet electrification.",
      },
      {
        name: "Highway Charging Infrastructure",
        sentiment: "negative",
        note: "Inter-city range anxiety persists due to broken chargers and inconsistent app networks.",
      },
      {
        name: "Battery Thermal Safety & Monsoon Reliability",
        sentiment: "mixed",
        note: "Substantial regulatory improvements noted since early fires, but skepticism lingers.",
      },
      {
        name: "FAME Subsidy Rationalization",
        sentiment: "mixed",
        note: "Higher entry prices post-subsidy offset by domestic manufacturing cost efficiencies.",
      },
      {
        name: "Sub-15 Lakh EV Passenger Cars",
        sentiment: "positive",
        note: "New affordable SUV launches broadening mainstream urban family consideration.",
      },
    ],
    topics: [
      { name: "Running Cost Savings vs Petrol", pct: 31 },
      { name: "Public Charging Accessibility", pct: 28 },
      { name: "Battery Longevity & Replacement Cost", pct: 19 },
      { name: "New Vehicle Launches & Range", pct: 14 },
      { name: "Government Subsidies & Road Tax", pct: 8 },
    ],
    forecast: [
      { name: "Adoption speed in commercial & delivery 2W fleets", direction: "up", level: "high" },
      { name: "Highway charging reliability complaints", direction: "down", level: "medium" },
      { name: "Competition in the mass-market Rs 10-15L segment", direction: "up", level: "high" },
      { name: "Consumer reliance on home AC slow charging", direction: "stable", level: "medium" },
    ],
    insight:
      "India's EV landscape commands upbeat sentiment in the commuter 2-wheeler and urban runabout categories, celebrated for fuel savings. The primary friction holding back full mainstream passenger conversion remains inter-city fast-charging reliability.",
  },

  "new education policy": {
    topic: "New education policy",
    confidence: 89,
    overall: { positive: 43, neutral: 34, negative: 23 },
    emotions: {
      joy: 20,
      anger: 15,
      sadness: 9,
      fear: 14,
      surprise: 18,
      disgust: 5,
      neutral: 19,
    },
    aspects: [
      {
        name: "Multidisciplinary & Flexible Curricula",
        sentiment: "positive",
        note: "Widespread praise for breaking traditional rigid science-commerce-humanities silos.",
      },
      {
        name: "Implementation Readiness in State Schools",
        sentiment: "negative",
        note: "Concerns regarding infrastructure deficits and teacher retraining capacity.",
      },
      {
        name: "Regional Language Medium Focus",
        sentiment: "mixed",
        note: "Debate over mother-tongue primary learning versus global English fluency.",
      },
      {
        name: "Vocational Training Integration",
        sentiment: "positive",
        note: "Strong appreciation for early practical skills, internships, and digital literacy.",
      },
      {
        name: "Four-Year Undergraduate Degree Structure",
        sentiment: "mixed",
        note: "Students weigh international masters equivalency against an extra year of tuition costs.",
      },
    ],
    topics: [
      { name: "Curriculum Modernization & Choice", pct: 32 },
      { name: "Teacher Training & Infrastructure", pct: 25 },
      { name: "Language Medium in Early Education", pct: 21 },
      { name: "4-Year College Degrees vs 3-Year", pct: 14 },
      { name: "Research & Academic Bank of Credits", pct: 8 },
    ],
    forecast: [
      { name: "State-level curriculum adaptation momentum", direction: "up", level: "medium" },
      { name: "Student enrollment in multidisciplinary majors", direction: "up", level: "high" },
      { name: "Disparity between private and public school execution", direction: "up", level: "high" },
      { name: "Resistance from traditional rote-learning boards", direction: "down", level: "medium" },
    ],
    insight:
      "Public response to the New Education Policy is forward-looking and philosophically supportive of holistic, flexible learning pathways. Scepticism is concentrated almost exclusively on the operational readiness of state-run institutions to execute the transformation.",
  },
};

export function getMockTopicAnalysis(topicName) {
  const normalized = topicName.toLowerCase().trim();
  const matchedKey = Object.keys(MOCK_TOPIC_DATA).find((k) =>
    normalized.includes(k) || k.includes(normalized)
  );

  if (matchedKey) {
    return {
      ...MOCK_TOPIC_DATA[matchedKey],
      topic: topicName.trim(),
      _mode: "topic",
    };
  }

  return generateDynamicTopicAnalysis(topicName);
}

export function generateDynamicTopicAnalysis(topic) {
  const cleanTopic = topic.trim();
  const hash = Array.from(cleanTopic).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const positive = Math.max(15, Math.min(75, 40 + (hash % 35) - 15));
  const negative = Math.max(10, Math.min(50, 30 + ((hash * 3) % 25) - 10));
  const neutral = 100 - (positive + negative);

  const joy = Math.max(5, Math.round((positive * 0.7)));
  const anger = Math.max(5, Math.round((negative * 0.6)));
  const sadness = Math.max(3, Math.round((negative * 0.3)));
  const fear = Math.max(4, Math.round(((positive + negative) * 0.15)));
  const surprise = Math.max(5, 15);
  const disgust = Math.max(2, Math.round((negative * 0.1)));
  const rem = 100 - (joy + anger + sadness + fear + surprise + disgust);
  const neutralEmotion = Math.max(3, rem);

  return {
    topic: cleanTopic,
    confidence: Math.min(95, 78 + (hash % 17)),
    overall: { positive, neutral, negative },
    emotions: {
      joy,
      anger,
      sadness,
      fear,
      surprise,
      disgust,
      neutral: neutralEmotion,
    },
    aspects: [
      {
        name: `Core Value & Impact of ${cleanTopic}`,
        sentiment: positive > 45 ? "positive" : "mixed",
        note: `Primary discussion emphasizes societal relevance and emerging community interest.`,
      },
      {
        name: "Accessibility & Adoption Barriers",
        sentiment: negative > 30 ? "negative" : "mixed",
        note: `Users actively discuss accessibility constraints, costs, and learning curve friction.`,
      },
      {
        name: "Public Awareness & Media Discourse",
        sentiment: "positive",
        note: `Noticeable uptick in social conversations, educational explainers, and thought pieces.`,
      },
      {
        name: "Long-term Sustainability & Outlook",
        sentiment: "mixed",
        note: `Stakeholders weigh future viability against shifting market and cultural dynamics.`,
      },
    ],
    topics: [
      { name: "Ecosystem Growth & Expansion", pct: 35 },
      { name: "Usability & Everyday Practicality", pct: 28 },
      { name: "Cost vs Return on Investment", pct: 21 },
      { name: "Regulatory & Policy Dynamics", pct: 16 },
    ],
    forecast: [
      { name: `Online engagement around ${cleanTopic}`, direction: "up", level: "high" },
      { name: "Scrutiny over transparency and verified claims", direction: "up", level: "medium" },
      { name: "Skepticism from early non-adopters", direction: "down", level: "medium" },
      { name: "Community consensus on foundational benefits", direction: "stable", level: "high" },
    ],
    insight: `Conversation regarding "${cleanTopic}" displays an active balance of optimism and pragmatic interrogation. While enthusiasm for its upside is evident, sustained momentum hinges on overcoming adoption friction and clarifying real-world outcomes.`,
    _mode: "topic",
  };
}

export function generateDynamicPostsAnalysis(posts) {
  const count = posts.length;
  const combined = posts.join(" ").toLowerCase();

  const positiveWords = ["love", "great", "awesome", "good", "fast", "unreal", "amazing", "smooth", "happy", "best", "saving", "clean"];
  const negativeWords = ["broken", "annoying", "bad", "slow", "terrible", "worst", "high", "hate", "issue", "delay", "pothole", "expensive", "cancel", "frustrat"];

  let posCount = 0;
  let negCount = 0;

  posts.forEach((p) => {
    const text = p.toLowerCase();
    const hasPos = positiveWords.some((w) => text.includes(w));
    const hasNeg = negativeWords.some((w) => text.includes(w));
    if (hasPos && !hasNeg) posCount++;
    else if (hasNeg && !hasPos) negCount++;
  });

  const totalEvaluated = posCount + negCount || 1;
  const positive = Math.max(10, Math.min(80, Math.round((posCount / count) * 80) + 10));
  const negative = Math.max(10, Math.min(80, Math.round((negCount / count) * 80) + 10));
  const neutral = Math.max(5, 100 - (positive + negative));

  const confidence = count < 3 ? 52 : count < 6 ? 74 : Math.min(96, 82 + count * 2);

  return {
    topic: `Batch Analysis (${count} raw social inputs)`,
    sampleSize: count,
    confidence,
    overall: { positive, neutral, negative },
    emotions: {
      joy: Math.round(positive * 0.6),
      anger: Math.round(negative * 0.65),
      sadness: Math.round(negative * 0.2),
      fear: Math.max(5, Math.round(negative * 0.15)),
      surprise: 14,
      disgust: Math.max(4, Math.round(negative * 0.1)),
      neutral: Math.max(8, neutral),
    },
    aspects: [
      {
        name: "Reported User Experience",
        sentiment: positive >= negative ? "positive" : "negative",
        note: `Direct feedback reflects immediate experiential reactions found across the sampled batch.`,
      },
      {
        name: "Service Reliability & Expectations",
        sentiment: negative > 35 ? "negative" : "mixed",
        note: `Common pain points touch upon consistency, downtime, and operational friction.`,
      },
      {
        name: "Overall Value Assessment",
        sentiment: positive > 40 ? "positive" : "mixed",
        note: `Commenters contrast personal time or financial expenditure against perceived payoff.`,
      },
    ],
    topics: [
      { name: "Direct Operational Experiences", pct: 45 },
      { name: "Pricing & Service Expectations", pct: 32 },
      { name: "Alternative Comparisons", pct: 23 },
    ],
    authenticity: {
      normal: count > 8 ? 92 : 100,
      repetitive: count > 8 ? 8 : 0,
      note: count < 4 ? "Small sample size, low probability of bot coordination." : "Organic, varied phrasing across posts without significant template duplication.",
    },
    insight: count < 3
      ? `Analysis grounded in a limited sample of ${count} posts. While actionable nuances exist, expand the batch for statistically robust intelligence.`
      : `The ${count} analyzed posts reveal a strong polarization around tangible operational reliability. Specific grievances dominate the negative discourse while satisfied users emphasize convenience.`,
    _mode: "posts",
  };
}
