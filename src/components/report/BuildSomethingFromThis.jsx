// ═══════════════════════════════════════════════════
// AI Trend Intelligence — Build Something From This
// Practical project concept generator for developers/students
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Code2, Lightbulb, Users, Cpu, Database, ChevronDown, ChevronUp, Rocket } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

const DIFFICULTY_CONFIG = {
  beginner: { color: '#22c55e', label: 'Beginner' },
  intermediate: { color: '#f97316', label: 'Intermediate' },
  advanced: { color: '#ef4444', label: 'Advanced' },
  low: { color: '#22c55e', label: 'Low' },
  medium: { color: '#f97316', label: 'Medium' },
  high: { color: '#ef4444', label: 'High' },
};

function ProjectCard({ project, idx, featured = false }) {
  const [expanded, setExpanded] = useState(featured);
  const diffKey = (project.difficulty || 'intermediate').toLowerCase();
  const diff = DIFFICULTY_CONFIG[diffKey] || DIFFICULTY_CONFIG.intermediate;

  const accentColors = [
    { text: '#38bdf8', bg: 'rgba(56,189,248,0.06)', border: 'rgba(56,189,248,0.2)', glow: 'rgba(56,189,248,0.15)' },
    { text: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.2)', glow: 'rgba(167,139,250,0.15)' },
    { text: '#22c55e', bg: 'rgba(34,197,94,0.06)', border: 'rgba(34,197,94,0.2)', glow: 'rgba(34,197,94,0.15)' },
    { text: '#fb923c', bg: 'rgba(251,146,60,0.06)', border: 'rgba(251,146,60,0.2)', glow: 'rgba(251,146,60,0.15)' },
  ];
  const c = accentColors[idx % accentColors.length];

  return (
    <div style={{
      borderRadius: '14px',
      border: `1px solid ${featured ? c.border : 'var(--border)'}`,
      backgroundColor: featured ? c.bg : 'var(--bg-surface)',
      overflow: 'hidden',
      boxShadow: featured ? `0 0 30px ${c.glow}` : 'none',
      transition: 'all 0.25s ease',
    }}>
      {featured && (
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, ${c.text}, transparent)`,
        }} />
      )}

      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              backgroundColor: `${c.text}20`, border: `1px solid ${c.text}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {featured ? <Rocket size={16} style={{ color: c.text }} /> : <Code2 size={16} style={{ color: c.text }} />}
            </div>
            <div style={{ minWidth: 0 }}>
              {featured && (
                <div style={{
                  fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: c.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px',
                }}>
                  ⭐ FEATURED PROJECT
                </div>
              )}
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700,
                color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
              }}>
                {project.title}
              </h3>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
            <span style={{
              fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: diff.color, backgroundColor: `${diff.color}15`,
              border: `1px solid ${diff.color}40`, padding: '2px 8px', borderRadius: '4px',
            }}>
              {diff.label}
            </span>
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                background: 'none', border: '1px solid var(--border)', cursor: 'pointer',
                width: '26px', height: '26px', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </div>

        {project.problem && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {project.problem}
          </p>
        )}

        {/* Tech tags (always visible) */}
        {(project.tech || project.techStack) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
            {(project.tech || project.techStack || []).map((t, i) => (
              <span key={i} style={{
                fontSize: '10.5px', fontFamily: 'var(--font-mono)',
                color: c.text, backgroundColor: `${c.text}10`,
                border: `1px solid ${c.border}`,
                padding: '2px 8px', borderRadius: '4px',
              }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable details */}
      {expanded && (
        <div style={{
          padding: '0 20px 18px',
          borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: '14px',
          paddingTop: '16px',
        }}>
          {project.solution && project.solution !== project.problem && (
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Lightbulb size={10} /> HOW IT WORKS
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {project.solution}
              </p>
            </div>
          )}

          {(project.users || project.targetUser) && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Users size={13} style={{ color: c.text, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '3px' }}>
                  TARGET USERS
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  {project.users || project.targetUser}
                </span>
              </div>
            </div>
          )}

          {project.mvp && (
            <div style={{
              padding: '10px 12px', borderRadius: '8px',
              backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#22c55e', fontWeight: 700, marginBottom: '4px' }}>
                MVP SCOPE
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {project.mvp}
              </p>
            </div>
          )}

          {(project.aiComponents || project.datasetsAndApis) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {project.aiComponents && project.aiComponents.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Cpu size={10} /> AI COMPONENTS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {project.aiComponents.map((a, i) => (
                      <span key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>• {a}</span>
                    ))}
                  </div>
                </div>
              )}
              {project.datasetsAndApis && project.datasetsAndApis.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Database size={10} /> DATASETS & APIs
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {project.datasetsAndApis.map((d, i) => (
                      <span key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>• {d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {project.futureExpansion && (
            <p style={{
              fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic',
              margin: 0, lineHeight: 1.5,
              paddingTop: '8px', borderTop: '1px solid var(--border)',
            }}>
              🚀 Future expansion: {project.futureExpansion}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function BuildSomethingFromThis({ report }) {
  const featured = report?.buildSomething;
  const ideas = report?.projectIdeas || [];

  if (!featured && !ideas.length) return null;

  return (
    <SectionWrapper
      id="sec-build-something"
      sectionNum="09"
      title="Build Something From This"
      subtitle="Practical project ideas for developers and students — turn intelligence into action"
      icon={Code2}
      badgeType="analysis"
      badgeLabel="BUILDER CONCEPTS"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Featured project */}
        {featured && (
          <ProjectCard project={featured} idx={0} featured={true} />
        )}

        {/* Additional project ideas */}
        {ideas.length > 0 && (
          <>
            {featured && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  MORE IDEAS
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
              {ideas.map((idea, idx) => (
                <ProjectCard key={idx} project={idea} idx={featured ? idx + 1 : idx} />
              ))}
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
