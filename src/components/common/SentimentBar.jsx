import React from 'react';
import { COLORS } from '../../utils/formatters';

export function SentimentBar({ overall }) {
  if (!overall) return null;

  const segs = [
    { key: 'positive', val: overall.positive ?? 0, color: COLORS.positive, label: 'Positive' },
    { key: 'neutral', val: overall.neutral ?? 0, color: COLORS.neutral, label: 'Neutral' },
    { key: 'negative', val: overall.negative ?? 0, color: COLORS.negative, label: 'Negative' },
  ];

  return (
    <div>
      <div style={styles.stackBar}>
        {segs.map((s) => (
          <div
            key={s.key}
            className="sp-bar-fill"
            style={{
              width: `${s.val}%`,
              background: s.color,
              height: '100%',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            title={`${s.label}: ${s.val}%`}
          />
        ))}
      </div>
      <div style={styles.stackLegend}>
        {segs.map((s) => (
          <span key={s.key} className="sp-mono" style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: s.color }} />
            {s.label} <strong style={{ color: COLORS.text }}>{s.val}%</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  stackBar: {
    display: 'flex',
    height: 14,
    borderRadius: 4,
    overflow: 'hidden',
    background: COLORS.surface2,
  },
  stackLegend: {
    display: 'flex',
    gap: 20,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  legendItem: {
    fontSize: 12,
    color: COLORS.muted,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
  },
};
