// ═══════════════════════════════════════════════════
// AI Trend Analyzer — OpportunityRadar Component (Section 9)
// White Spaces, Actionable Improvements & High-Impact Frontiers
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Lightbulb, Rocket, Target, Zap } from 'lucide-react';
import { Badge } from '../common/Badge';

export function OpportunityRadar({ opportunities = [] }) {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-opportunities"
      sectionNum="11"
      title="Opportunity Radar"
      subtitle="Unsolved market white spaces, missing infrastructure, and high-impact build vectors"
      icon={Lightbulb}
      badgeType="idea"
      badgeLabel="ACTIONABLE VECTORS"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {opportunities.map((opp, idx) => {
          const diffColor = opp.difficulty === 'Hard' ? 'var(--negative)' : opp.difficulty === 'Medium' ? 'var(--warning)' : 'var(--positive)';

          return (
            <div
              key={idx}
              className="glass-card hover-card"
              style={{
                padding: '20px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Top badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--accent-warm)',
                      backgroundColor: 'rgba(251, 146, 60, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    OPPORTUNITY 0{idx + 1}
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
                    {opp.difficulty || 'MEDIUM'} DIFFICULTY
                  </span>
                </div>

                {/* Target problem */}
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    TARGET PROBLEM
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: '2px 0 0 0',
                    }}
                  >
                    {opp.problem}
                  </h4>
                </div>

                {/* Proposed Improvement */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-3)' }}>
                    PROPOSED IMPROVEMENT
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '4px 0 0 0' }}>
                    {opp.improvement}
                  </p>
                </div>
              </div>

              {/* Bottom Meta: Who can build + Impact */}
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
                {opp.whoCouldBuild && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <Target size={12} style={{ color: 'var(--accent)' }} />
                    <span><strong style={{ color: 'var(--text-secondary)' }}>Who Can Build:</strong> {opp.whoCouldBuild}</span>
                  </div>
                )}
                {opp.impact && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <Zap size={12} style={{ color: 'var(--accent-warm)' }} />
                    <span><strong style={{ color: 'var(--text-secondary)' }}>Potential Impact:</strong> {opp.impact}</span>
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
