import React from 'react';
import { ReportSection } from './ReportSection';
import { SentimentBar } from '../common/SentimentBar';
import { COLORS } from '../../utils/formatters';

export function OverviewSection({ analysis }) {
  const isPostsMode = analysis._mode === 'posts';

  return (
    <ReportSection num="01" title="Overview">
      <div style={styles.confRow}>
        <span className="sp-mono" style={styles.confLabel}>
          {isPostsMode ? 'BATCH' : 'TOPIC'}
        </span>
        <span className="sp-display" style={styles.confTopic}>
          {analysis.topic}
        </span>
        {isPostsMode && (
          <span className="sp-mono" style={styles.sourceBadge}>
            {analysis.sampleSize ?? '?'} real posts
          </span>
        )}
        <span className="sp-mono" style={styles.confBadge}>
          confidence {analysis.confidence}%
        </span>
        {analysis._source === 'live' && (
          <span className="sp-mono" style={styles.liveBadge}>
            LIVE CLAUDE
          </span>
        )}
      </div>
      <SentimentBar overall={analysis.overall} />
    </ReportSection>
  );
}

const styles = {
  confRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  confLabel: {
    fontSize: 10.5,
    color: COLORS.muted,
    letterSpacing: '0.12em',
  },
  confTopic: {
    fontSize: 20,
    flex: 1,
    color: COLORS.text,
  },
  sourceBadge: {
    fontSize: 11,
    color: COLORS.accentWarm,
    border: `1px solid ${COLORS.accentWarm}55`,
    borderRadius: 20,
    padding: '3px 10px',
    background: 'rgba(245, 166, 35, 0.06)',
  },
  confBadge: {
    fontSize: 11,
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}55`,
    borderRadius: 20,
    padding: '3px 10px',
    background: 'rgba(45, 212, 191, 0.06)',
  },
  liveBadge: {
    fontSize: 10,
    color: COLORS.positive,
    border: `1px solid ${COLORS.positive}55`,
    borderRadius: 20,
    padding: '2px 8px',
    background: 'rgba(74, 222, 128, 0.08)',
  },
};
