// ═══════════════════════════════════════════════════
// AI Trend Intelligence Platform — Graph Builder
// Transforms an intelligence report into nodes & typed edges for Knowledge Graph
// ═══════════════════════════════════════════════════

export const NODE_TYPES = {
  topic: { label: 'Primary Topic', color: '#38BDF8', radius: 30 },
  person: { label: 'People', color: '#A78BFA', radius: 20 },
  company: { label: 'Companies & Orgs', color: '#34D399', radius: 22 },
  technology: { label: 'Technologies & Products', color: '#38BDF8', radius: 20 },
  research: { label: 'Research & Papers', color: '#F472B6', radius: 18 },
  problem: { label: 'Problems & Bottlenecks', color: '#F87171', radius: 16 },
  opportunity: { label: 'Opportunities', color: '#FB923C', radius: 16 },
  market: { label: 'Markets & Regions', color: '#FBBF24', radius: 18 },
};

export const RELATIONSHIP_TYPES = [
  'founded', 'created', 'invested', 'partnered', 'competed',
  'acquired', 'researched', 'used', 'announced', 'influenced',
];

export function buildGraphData(report, width = 740, height = 480) {
  if (!report) return { nodes: [], edges: [] };

  const cx = width / 2;
  const cy = height / 2;

  const nodes = [];
  const edges = [];

  // Center node: The exact searched topic
  nodes.push({
    id: 'center',
    label: report.exactTopic || report.topic,
    type: 'topic',
    category: report.category || 'Topic',
    x: cx,
    y: cy,
    r: 32,
    color: '#38BDF8',
    glow: true,
    detail: {
      description: report.profile?.description || report.summary || 'Core searched topic',
      category: report.category,
      subcategory: report.subcategory,
      status: report.currentStatus,
    },
  });

  // 1. Key People (Ring 1, Upper right quadrant)
  const people = (report.people || []).slice(0, 5);
  const peopleRadius = 150;
  people.forEach((p, i) => {
    const angle = -Math.PI * 0.35 + (i / Math.max(people.length, 1)) * (Math.PI * 0.55);
    const x = cx + Math.cos(angle) * peopleRadius;
    const y = cy + Math.sin(angle) * peopleRadius;
    const id = `person_${i}`;
    nodes.push({
      id,
      label: p.name,
      sublabel: p.role,
      type: 'person',
      x,
      y,
      r: 20,
      color: '#A78BFA',
      detail: p,
      exploreTopic: p.name,
    });
    edges.push({
      source: 'center',
      target: id,
      label: p.role?.toLowerCase().includes('founder') || p.role?.toLowerCase().includes('ceo') ? 'leads' : 'influences',
      relationship: 'influenced',
    });
  });

  // 2. Companies & Organizations (Ring 1, Left / Bottom-left quadrant)
  const entities = (report.entities || []).slice(0, 5);
  const entityRadius = 160;
  entities.forEach((e, i) => {
    const angle = Math.PI * 0.65 + (i / Math.max(entities.length, 1)) * (Math.PI * 0.6);
    const x = cx + Math.cos(angle) * entityRadius;
    const y = cy + Math.sin(angle) * entityRadius;
    const id = `entity_${i}`;
    nodes.push({
      id,
      label: e.name,
      sublabel: e.type || e.industry || 'Organization',
      type: 'company',
      x,
      y,
      r: 22,
      color: '#34D399',
      detail: e,
      exploreTopic: e.name,
    });
    edges.push({
      source: 'center',
      target: id,
      label: e.relationship ? e.relationship.slice(0, 18) : 'developed by',
      relationship: 'created',
    });
  });

  // 3. Technologies & Products (Outer ring, Top)
  const techItems = (report.profile?.majorTechnologies || report.products || []).slice(0, 4);
  const techRadius = 210;
  techItems.forEach((t, i) => {
    const tName = typeof t === 'string' ? t : t.name;
    const angle = -Math.PI * 0.85 + (i / Math.max(techItems.length, 1)) * (Math.PI * 0.5);
    const x = cx + Math.cos(angle) * techRadius;
    const y = cy + Math.sin(angle) * techRadius;
    const id = `tech_${i}`;
    nodes.push({
      id,
      label: tName,
      sublabel: 'Technology Pillar',
      type: 'technology',
      x,
      y,
      r: 18,
      color: '#38BDF8',
      detail: typeof t === 'object' ? t : { name: t, role: 'Key architectural component' },
      exploreTopic: tName,
    });
    edges.push({
      source: 'center',
      target: id,
      label: 'powered by',
      relationship: 'used',
    });
  });

  // 4. Critical Problems & Bottlenecks (Outer ring, Bottom-right)
  const problems = (report.problems || []).slice(0, 3);
  const probRadius = 210;
  problems.forEach((p, i) => {
    const angle = Math.PI * 0.15 + (i / Math.max(problems.length, 1)) * (Math.PI * 0.4);
    const x = cx + Math.cos(angle) * probRadius;
    const y = cy + Math.sin(angle) * probRadius;
    const id = `problem_${i}`;
    nodes.push({
      id,
      label: p.title,
      sublabel: p.category || 'Problem',
      type: 'problem',
      x,
      y,
      r: 16,
      color: '#F87171',
      detail: p,
      exploreTopic: p.title,
    });
    edges.push({
      source: 'center',
      target: id,
      label: 'constrained by',
      relationship: 'competed',
    });
  });

  // 5. Strategic Opportunities (Outer ring, Right)
  const opps = (report.opportunities || []).slice(0, 3);
  const oppRadius = 200;
  opps.forEach((o, i) => {
    const angle = -Math.PI * 0.05 + (i / Math.max(opps.length, 1)) * (Math.PI * 0.35);
    const x = cx + Math.cos(angle) * oppRadius;
    const y = cy + Math.sin(angle) * oppRadius;
    const id = `opp_${i}`;
    nodes.push({
      id,
      label: o.problem || o.improvement || 'Opportunity',
      sublabel: 'Strategic Gap',
      type: 'opportunity',
      x,
      y,
      r: 16,
      color: '#FB923C',
      detail: o,
      exploreTopic: o.problem || o.improvement,
    });
    edges.push({
      source: 'center',
      target: id,
      label: 'unlocks',
      relationship: 'partnered',
    });
  });

  // 6. Cross-Connections (Person -> Company, Tech -> Company)
  if (nodes.find(n => n.id === 'person_0') && nodes.find(n => n.id === 'entity_0')) {
    edges.push({
      source: 'person_0',
      target: 'entity_0',
      label: 'leads',
      relationship: 'founded',
    });
  }
  if (nodes.find(n => n.id === 'tech_0') && nodes.find(n => n.id === 'entity_0')) {
    edges.push({
      source: 'entity_0',
      target: 'tech_0',
      label: 'developed',
      relationship: 'announced',
    });
  }

  return { nodes, edges };
}
