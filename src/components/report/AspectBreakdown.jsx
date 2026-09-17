import React from 'react';
import { ReportSection } from './ReportSection';
import { COLORS } from '../../utils/formatters';

export function AspectBreakdown({ aspects }) {
  if (!aspects || aspects.length === 0) return null;

  return (
    <ReportSection num="02" title="Aspect Breakdown">
      <div className="sp-aspect-grid" style={styles.aspectGrid}>
        {aspects.map((a, i) => (
          <div key={i} style={styles.aspectCard}>
            <div style={styles.aspectHead}>
              <span
                style={{
                  ...styles.dot,
                  background:
                    a.sentiment === 'positive'
                      ? COLORS.positive
                      : a.sentiment === 'negative'
                      ? COLORS.negative
                      : COLORS.neutral,
                }}
              />
              <span className="sp-display" style={styles.aspectName}>
                {a.name}
              </span>
            </div>
            <div className="sp-mono" style={styles.aspectNote}>
              {a.note}
            </div>
          </div>
        ))}
      </div>
    </ReportSection>
  );
}

const styles = {
  aspectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: 12,
  },
  aspectCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '14px 16px',
    transition: 'border-color 0.2s ease, transform 0.2s ease',
  },
  aspectHead: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    marginBottom: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    flexShrink: 0,
  },
  aspectName: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 1.3,
  },
  aspectNote: {
    fontSize: 11.5,
    color: COLORS.muted,
    lineHeight: 1.5,
  },
};
