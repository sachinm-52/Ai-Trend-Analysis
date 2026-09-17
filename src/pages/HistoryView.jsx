import React from 'react';
import { Trash2, ExternalLink, Calendar, Database, Sparkles } from 'lucide-react';
import { SentimentBar } from '../components/common/SentimentBar';
import { formatDate, COLORS } from '../utils/formatters';

export function HistoryView({
  history,
  onSelectAnalysis,
  onRemoveItem,
  onClearAll,
}) {
  if (history.length === 0) {
    return (
      <div style={styles.emptyContainer} className="sp-container">
        <div style={styles.emptyIcon}>
          <Database size={32} color={COLORS.muted} />
        </div>
        <h3 className="sp-display" style={styles.emptyTitle}>
          No Saved Analyses Yet
        </h3>
        <p className="sp-mono" style={styles.emptyText}>
          Run any topic synthesis or post batch analysis on the Dashboard to automatically save it
          here for offline comparison.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container} className="sp-container">
      <div style={styles.header}>
        <div>
          <h2 className="sp-display" style={styles.title}>
            Intelligence Archives
          </h2>
          <p className="sp-mono" style={styles.subtitle}>
            {history.length} saved intelligence run{history.length === 1 ? '' : 's'} stored in local
            browser storage
          </p>
        </div>
        <button className="sp-mono" style={styles.clearAllBtn} onClick={onClearAll}>
          <Trash2 size={13} />
          Clear All
        </button>
      </div>

      <div style={styles.grid}>
        {history.map((item) => (
          <div key={item.id || item.timestamp} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <span className="sp-mono" style={styles.cardMode}>
                  {item._mode === 'posts' ? 'BATCH POSTS' : 'TOPIC SYNTHESIS'}
                </span>
                <h3 className="sp-display" style={styles.cardTopic}>
                  {item.topic}
                </h3>
              </div>
              <span className="sp-mono" style={styles.confidence}>
                {item.confidence}%
              </span>
            </div>

            <div style={{ margin: '14px 0' }}>
              <SentimentBar overall={item.overall} />
            </div>

            <p className="sp-display" style={styles.insightSnippet}>
              {item.insight?.slice(0, 140)}...
            </p>

            <div style={styles.cardFooter}>
              <span className="sp-mono" style={styles.date}>
                <Calendar size={12} />
                {formatDate(item.timestamp)}
              </span>
              <div style={styles.cardActions}>
                <button
                  className="sp-mono"
                  style={styles.deleteBtn}
                  onClick={() => onRemoveItem(item.id)}
                  title="Remove from history"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  className="sp-mono sp-analyze"
                  style={styles.viewBtn}
                  onClick={() => onSelectAnalysis(item)}
                >
                  <ExternalLink size={13} />
                  View Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },
  clearAllBtn: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.negative,
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 11.5,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: 16,
  },
  card: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardMode: {
    fontSize: 10,
    color: COLORS.accent,
    letterSpacing: '0.08em',
  },
  cardTopic: {
    fontSize: 19,
    color: COLORS.text,
    margin: '4px 0 0',
  },
  confidence: {
    fontSize: 11,
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}44`,
    borderRadius: 14,
    padding: '2px 8px',
    background: 'rgba(45, 212, 191, 0.05)',
  },
  insightSnippet: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 1.5,
    marginBottom: 16,
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: 12,
    gap: 12,
  },
  date: {
    fontSize: 11,
    color: '#5A6377',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  deleteBtn: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 6,
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    background: COLORS.accent,
    color: '#08120F',
    border: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 11.5,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  emptyContainer: {
    maxWidth: 600,
    margin: '80px auto',
    textAlign: 'center',
    padding: '0 24px',
  },
  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 18px',
  },
  emptyTitle: {
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 1.6,
  },
};
