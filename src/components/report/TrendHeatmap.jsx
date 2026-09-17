// ═══════════════════════════════════════════════════
// AI Trend Analyzer — TrendHeatmap Component (Section 14)
// Sub-Domain Activity & Intensity Heatmap
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Layers, Flame, ArrowUpRight } from 'lucide-react';

export function TrendHeatmap({ heatmap = [], onSelectArea }) {
  const [activeTile, setActiveTile] = useState(null);

  if (!heatmap || heatmap.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-heatmap"
      sectionNum="15"
      title="Sub-Domain Ecosystem Heatmap"
      subtitle="Relative heat, developer focus, capital concentration, and adoption intensity across adjacent areas"
      icon={Layers}
      badgeType="analysis"
      badgeLabel="HEAT MATRIX"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
        }}
      >
        {heatmap.map((tile, idx) => {
          const heat = tile.heat || 3;
          // Colors: heat 1 (low) to heat 5 (boiling)
          const heatColors = [
            '#64748B', // 1
            '#38BDF8', // 2
            '#34D399', // 3
            '#A78BFA', // 4
            '#FB923C', // 5
          ];
          const color = heatColors[Math.min(4, Math.max(0, heat - 1))];
          const isSelected = activeTile === idx;

          return (
            <div
              key={tile.area || idx}
              onClick={() => {
                setActiveTile(isSelected ? null : idx);
                if (onSelectArea) onSelectArea(tile.area);
              }}
              className="glass-card hover-card"
              style={{
                padding: '16px',
                border: isSelected ? `1px solid ${color}` : '1px solid var(--border)',
                backgroundColor: isSelected ? 'var(--bg-surface-3)' : 'var(--bg-surface)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Heat bar indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}88`,
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  HEAT {heat}/5
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {tile.trend}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{tile.area}</span>
                <ArrowUpRight size={13} style={{ opacity: 0.5 }} />
              </h4>

              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {tile.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
