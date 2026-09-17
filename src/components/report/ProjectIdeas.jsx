// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ProjectIdeas Component (Section 19)
// "If I Want to Build Something" — Practical Starter Blueprints
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Code2, Target, CheckCircle2, Layers, Users } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ProjectIdeas({ ideas = [] }) {
  if (!ideas || ideas.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-project-ideas"
      sectionNum="18"
      title="If I Want to Build Something"
      subtitle="Executable project blueprints, architecture stacks, MVP scopes, and target demographics"
      icon={Code2}
      badgeType="idea"
      badgeLabel="BUILDER BLUEPRINTS"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {ideas.map((idea, idx) => {
          const diffColor = idea.difficulty === 'Hard' ? 'var(--negative)' : idea.difficulty === 'Medium' ? 'var(--warning)' : 'var(--positive)';

          return (
            <div
              key={idx}
              className="glass-card hover-card"
              style={{
                padding: '22px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header tags */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    BLUEPRINT 0{idx + 1}
                  </span>

                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono)',
                      color: diffColor,
                      backgroundColor: `${diffColor}15`,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                  >
                    {idea.difficulty || 'MEDIUM'} DIFFICULTY
                  </span>
                </div>

                {/* Title */}
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    lineHeight: '1.3',
                  }}
                >
                  {idea.title}
                </h4>

                {/* Problem */}
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    THE PROBLEM:
                  </span>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: '1.5' }}>
                    {idea.problem}
                  </p>
                </div>

                {/* Solution */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                    PROPOSED SOLUTION:
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: '2px 0 0 0', lineHeight: '1.55' }}>
                    {idea.solution}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                {idea.tech && idea.tech.length > 0 && (
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      RECOMMENDED TECH STACK
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {idea.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            backgroundColor: 'var(--bg-surface-2)',
                            color: 'var(--accent)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MVP Blueprint + Target Users */}
              <div
                style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '11.5px',
                }}
              >
                {idea.mvp && (
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--positive)', marginRight: '4px' }}>MVP Scope:</strong>
                    {idea.mvp}
                  </div>
                )}
                {idea.users && (
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} style={{ color: 'var(--accent-2)' }} />
                    <span><strong style={{ color: 'var(--text-secondary)' }}>Target Users:</strong> {idea.users}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
