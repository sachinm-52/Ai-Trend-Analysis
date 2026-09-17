import React from 'react';
import { ReportSection } from './ReportSection';
import { formatRank, COLORS } from '../../utils/formatters';

export function TopicList({ topics }) {
  if (!topics || topics.length === 0) return null;

  return (
    <ReportSection num="04" title="Discussion Topics">
      <div style={styles.topicList}>
        {topics.map((t, i) => (
          <div key={i} style={styles.topicRow}>
            <span className="sp-mono" style={styles.topicRank}>
              {formatRank(i)}
            </span>
            <span className="sp-display" style={styles.topicName}>
              {t.name}
            </span>
            <div style={styles.trackWide}>
              <div
                className="sp-bar-fill"
                style={{
                  ...styles.fillWide,
                  width: `${t.pct}%`,
                }}
              />
            </div>
            <span className="sp-mono" style={styles.topicPct}>
              {t.pct}%
            </span>
          </div>
        ))}
      </div>
    </ReportSection>
  );
}

const styles = {
  topicList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  topicRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  topicRank: {
    fontSize: 11,
    color: COLORS.accent,
    width: 20,
    flexShrink: 0,
    fontWeight: 600,
  },
  topicName: {
    fontSize: 14.5,
    width: 170,
    flexShrink: 0,
    color: COLORS.text,
  },
  trackWide: {
    flex: 1,
    height: 8,
    background: COLORS.surface2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillWide: {
    height: '100%',
    borderRadius: 4,
    background: COLORS.accent,
    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  topicPct: {
    fontSize: 11.5,
    color: COLORS.muted,
    width: 36,
    textAlign: 'right',
    flexShrink: 0,
  },
};
