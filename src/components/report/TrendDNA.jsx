// ═══════════════════════════════════════════════════
// AI Trend Analyzer — TrendDNA Component (Wow Feature)
// Biological lifecycle analysis: Origin to Future
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Dna, ArrowRight } from 'lucide-react';

const DNA_PHASES = [
  { key: 'origin', title: 'Origin', color: '#64748B', desc: 'Foundational concept & early experiments' },
  { key: 'trigger', title: 'Trigger', color: '#38BDF8', desc: 'Catalyst that proved viable execution' },
  { key: 'growth', title: 'Growth', color: '#34D399', desc: 'Ecosystem formation & early adoption' },
  { key: 'acceleration', title: 'Acceleration', color: '#A78BFA', desc: 'Capital rush, mass attention, inflection' },
  { key: 'now', title: 'Now', color: '#FB923C', desc: 'Current frontier & mainstream deployment' },
  { key: 'future', title: 'Future', color: '#FBBF24', desc: 'Projected paradigm shifts & scenarios' },
];

export function TrendDNA({ trendDNA }) {
  if (!trendDNA) return null;

  return (
    <SectionWrapper
      id="sec-trend-dna"
      sectionNum="03"
      title="Trend DNA"
      subtitle="Structural evolution: from conceptual spark to market acceleration and future frontier"
      icon={Dna}
      badgeType="analysis"
      badgeLabel="EVOLUTIONARY TRAJECTORY"
    >
      {/* Horizontal Phase Tracker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          position: 'relative',
        }}
      >
        {DNA_PHASES.map((phase, idx) => {
          const data = trendDNA[phase.key] || {};
          const isNow = phase.key === 'now';

          return (
            <div
              key={phase.key}
              className="glass-card hover-card"
              style={{
                padding: '16px',
                border: isNow ? `1px solid ${phase.color}` : '1px solid var(--border)',
                backgroundColor: isNow ? 'rgba(251, 146, 60, 0.05)' : 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: isNow ? `0 0 20px ${phase.color}22` : 'none',
              }}
            >
              {/* Top Row: Phase + Period */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: phase.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    PHASE 0{idx + 1}
                  </span>
                  {isNow && (
                    <span
                      style={{
                        fontSize: '9.5px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: `${phase.color}22`,
                        color: phase.color,
                        fontWeight: 700,
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {phase.title}
                </h4>

                {data.period && (
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    {data.period}
                  </span>
                )}

                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.55',
                    margin: 0,
                  }}
                >
                  {data.event || phase.desc}
                </p>
              </div>

              {/* Connector indicator for desktop */}
              {idx < DNA_PHASES.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: '12px',
                    color: 'var(--text-muted)',
                    opacity: 0.5,
                  }}
                  className="hide-mobile"
                >
                  <ArrowRight size={13} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
