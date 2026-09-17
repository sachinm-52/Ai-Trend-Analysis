// ═══════════════════════════════════════════════════
// AI Trend Analyzer — WhoIsDriving Component (Section 7)
// The primary forces, incentives, and engines behind momentum
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Flame, Cpu, DollarSign, Building, Users, ShoppingCart } from 'lucide-react';

const DRIVER_ICONS = {
  technological: { icon: Cpu, color: '#38BDF8' },
  economic: { icon: DollarSign, color: '#34D399' },
  institutional: { icon: Building, color: '#A78BFA' },
  community: { icon: Users, color: '#FB923C' },
  market: { icon: ShoppingCart, color: '#FBBF24' },
};

export function WhoIsDriving({ drivers = [] }) {
  if (!drivers || drivers.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-drivers"
      sectionNum="08"
      title="Who & What Is Driving It"
      subtitle="Structural forces propelling momentum: technological breakthroughs, capital, and market pressure"
      icon={Flame}
      badgeType="analysis"
      badgeLabel="CAUSAL DRIVERS"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {drivers.map((d, idx) => {
          const typeKey = (d.type || '').toLowerCase();
          const cfg = DRIVER_ICONS[typeKey] || { icon: Flame, color: '#38BDF8' };
          const Icon = cfg.icon;

          return (
            <div
              key={d.name || idx}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: `${cfg.color}15`,
                      border: `1px solid ${cfg.color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cfg.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {d.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: 'var(--font-mono)',
                        color: cfg.color,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {d.type} DRIVER
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '14px',
                  }}
                >
                  {d.description}
                </p>
              </div>

              {d.impact && (
                <div
                  style={{
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border)',
                    fontSize: '11.5px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <strong style={{ color: 'var(--text-secondary)' }}>IMPACT: </strong>
                  <span>{d.impact}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
