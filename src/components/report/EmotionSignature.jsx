import React from 'react';
import { ReportSection } from './ReportSection';
import { EMOTION_META } from '../../data/mockData';
import { COLORS } from '../../utils/formatters';

export function EmotionSignature({ emotions }) {
  if (!emotions) return null;

  return (
    <ReportSection num="03" title="Emotion Signature">
      <div style={styles.emotionGrid}>
        {EMOTION_META.map((em) => {
          const val = emotions[em.key] ?? 0;
          return (
            <div key={em.key} style={styles.emotionRow}>
              <span className="sp-mono" style={styles.emotionLabel}>
                {em.label}
              </span>
              <div style={styles.trackThin}>
                <div
                  className="sp-bar-fill"
                  style={{
                    ...styles.fillThin,
                    width: `${val}%`,
                    background: COLORS.accentWarm,
                  }}
                />
              </div>
              <span className="sp-mono" style={styles.emotionVal}>
                {val}%
              </span>
            </div>
          );
        })}
      </div>
    </ReportSection>
  );
}

const styles = {
  emotionGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  emotionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  emotionLabel: {
    fontSize: 11.5,
    color: COLORS.muted,
    width: 72,
    flexShrink: 0,
  },
  trackThin: {
    flex: 1,
    height: 6,
    background: COLORS.surface2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fillThin: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  emotionVal: {
    fontSize: 11,
    color: COLORS.muted,
    width: 34,
    textAlign: 'right',
    flexShrink: 0,
  },
};
