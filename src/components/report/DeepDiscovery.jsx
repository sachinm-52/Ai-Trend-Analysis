// ═══════════════════════════════════════════════════
// AI Trend Analyzer — DeepDiscovery Component (Section 10)
// Surprising Connections, Counterintuitive Realities & Historical Rhymes
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Sparkles, Eye, Compass, Lightbulb } from 'lucide-react';
import { Badge } from '../common/Badge';

export function DeepDiscovery({ discoveries = [] }) {
  if (!discoveries || discoveries.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-deep-discovery"
      sectionNum="12"
      title="Deep Discovery & Hidden Dynamics"
      subtitle="Counterintuitive realities, historical accidents, and non-obvious structural connections"
      icon={Sparkles}
      badgeType="analysis"
      badgeLabel="NON-OBVIOUS INSIGHTS"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {discoveries.map((d, idx) => (
          <div
            key={idx}
            className="glass-card hover-card"
            style={{
              padding: '20px 24px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient accent top bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)',
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--accent-2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {d.type || 'PARADOX'} 0{idx + 1}
                </span>
                <Eye size={14} style={{ color: 'var(--accent-2)', opacity: 0.7 }} />
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  lineHeight: '1.35',
                }}
              >
                {d.title}
              </h4>

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

            {d.whyInteresting && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(167, 139, 250, 0.08)',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                <strong style={{ color: 'var(--accent-2)', marginRight: '6px' }}>Why this matters:</strong>
                {d.whyInteresting}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
