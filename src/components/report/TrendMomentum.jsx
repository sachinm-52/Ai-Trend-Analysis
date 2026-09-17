// ═══════════════════════════════════════════════════
// AI Trend Analyzer — TrendMomentum Component (Section 13)
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { BarChart3, TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';
import { MOMENTUM_CONFIG } from '../../utils/colors';

export function TrendMomentum({ momentum }) {
  if (!momentum) return null;

  const signal = momentum.signal || 'rising';
  const cfg = MOMENTUM_CONFIG[signal] || MOMENTUM_CONFIG.rising;
  const level = momentum.level || 4;

  return (
    <SectionWrapper
      id="sec-momentum"
      sectionNum="14"
      title="Trend Momentum & Velocity"
      subtitle="Current market acceleration, adoption velocity, and institutional interest signal"
      icon={BarChart3}
      badgeType="analysis"
      badgeLabel="VELOCITY GAUGE"
    >
      <div
        className="glass-card"
        style={{
          padding: '24px',
          border: `1px solid ${cfg.border}`,
          backgroundColor: 'var(--bg-surface)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        {/* Left: Signal Badge + Velocity Meter */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: cfg.bg,
                border: `1px solid ${cfg.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cfg.color,
              }}
            >
              <TrendingUp size={24} />
            </div>

            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                CURRENT MOMENTUM SIGNAL
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: cfg.color,
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                {cfg.label}
              </h3>
            </div>
          </div>

          {/* 5-step Velocity Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              <span>VELOCITY INTENSITY</span>
              <span style={{ color: cfg.color, fontWeight: 700 }}>LEVEL {level} OF 5</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map((step) => {
                const isActive = step <= level;
                return (
                  <div
                    key={step}
                    style={{
                      flex: 1,
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? cfg.color : 'var(--bg-surface-3)',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? `0 0 8px ${cfg.color}66` : 'none',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Narrative Description */}
        <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '24px' }} className="hide-mobile">
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            MOMENTUM NARRATIVE
          </span>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
            {momentum.description || cfg.description}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
