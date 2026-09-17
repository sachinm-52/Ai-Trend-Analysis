// ═══════════════════════════════════════════════════
// AI Trend Analyzer — TenPoints Component (Section 35)
// The Story in 10 Points — Core Executive Summary
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { ListOrdered, ChevronRight } from 'lucide-react';

export function TenPoints({ points = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!points || points.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-ten-points"
      sectionNum="01"
      title="The Story in 10 Points"
      subtitle="Executive distillation: from origins and mechanics to challenges and future trajectory"
      icon={ListOrdered}
      badgeType="fact"
      badgeLabel="STRUCTURED SYNTHESIS"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '12px',
        }}
      >
        {points.map((pt, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <div
              key={pt.num || idx}
              onClick={() => setActiveIdx(idx)}
              className="glass-card hover-card"
              style={{
                padding: '16px 18px',
                border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                backgroundColor: isSelected ? 'var(--bg-surface-3)' : 'var(--bg-surface)',
                cursor: 'pointer',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: isSelected ? 'var(--accent)' : 'var(--text-muted)',
                  backgroundColor: 'var(--bg-surface-2)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--border)',
                }}
              >
                {pt.num || String(idx + 1).padStart(2, '0')}
              </div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{pt.question}</span>
                  <ChevronRight size={14} style={{ opacity: isSelected ? 1 : 0.4 }} />
                </h4>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.55',
                    margin: 0,
                  }}
                >
                  {pt.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
