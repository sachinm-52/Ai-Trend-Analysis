// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Graph Builder
// Transforms a report into nodes and edges for SVG Knowledge Graph
// ═══════════════════════════════════════════════════

export function buildGraphData(report, width = 700, height = 450) {
  if (!report) return { nodes: [], edges: [] };

  const cx = width / 2;
  const cy = height / 2;

  const nodes = [];
  const edges = [];

  // Center node: The topic itself
  nodes.push({
    id: 'center',
    label: report.topic,
    type: 'topic',
    category: report.category || 'Topic',
    x: cx,
    y: cy,
    r: 32,
    color: '#38BDF8',
    glow: true,
  });

  // Category 1: Key People (ring 1, angle 0 to 120 deg)
  const people = (report.people || []).slice(0, 5);
  const peopleRadius = 140;
  people.forEach((p, i) => {
    const angle = (i / Math.max(people.length, 1)) * (Math.PI * 0.8) - Math.PI * 0.4;
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
    });
    edges.push({ source: 'center', target: id, label: 'Key Actor' });
  });

  // Category 2: Entities & Companies (ring 1, angle 120 to 240 deg)
  const entities = (report.entities || []).slice(0, 5);
  const entityRadius = 150;
  entities.forEach((e, i) => {
    const angle = Math.PI * 0.5 + (i / Math.max(entities.length, 1)) * (Math.PI * 0.8);
    const x = cx + Math.cos(angle) * entityRadius;
    const y = cy + Math.sin(angle) * entityRadius;
    const id = `entity_${i}`;
    nodes.push({
      id,
      label: e.name,
      sublabel: e.type,
      type: 'entity',
      x,
      y,
      r: 22,
      color: '#34D399',
      detail: e,
    });
    edges.push({ source: 'center', target: id, label: 'Core Org/Tech' });
  });

  // Category 3: Key Problems (outer ring, upper/left)
  const problems = (report.problems || []).slice(0, 3);
  const probRadius = 190;
  problems.forEach((p, i) => {
    const angle = Math.PI * 1.3 + (i / Math.max(problems.length, 1)) * (Math.PI * 0.5);
    const x = cx + Math.cos(angle) * probRadius;
    const y = cy + Math.sin(angle) * probRadius;
    const id = `problem_${i}`;
    nodes.push({
      id,
      label: p.title,
      sublabel: p.category,
      type: 'problem',
      x,
      y,
      r: 16,
      color: '#F87171',
      detail: p,
    });
    edges.push({ source: 'center', target: id, label: 'Challenge' });
  });

  // Category 4: Opportunities (outer ring, right/bottom)
  const opps = (report.opportunities || []).slice(0, 3);
  const oppRadius = 195;
  opps.forEach((o, i) => {
    const angle = -Math.PI * 0.2 + (i / Math.max(opps.length, 1)) * (Math.PI * 0.5);
    const x = cx + Math.cos(angle) * oppRadius;
    const y = cy + Math.sin(angle) * oppRadius;
    const id = `opp_${i}`;
    nodes.push({
      id,
      label: o.problem,
      sublabel: 'Opportunity',
      type: 'opportunity',
      x,
      y,
      r: 16,
      color: '#FB923C',
      detail: o,
    });
    edges.push({ source: 'center', target: id, label: 'Opportunity' });
  });

  return { nodes, edges };
}
