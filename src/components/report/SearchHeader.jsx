// ═══════════════════════════════════════════════════
// AI Trend Analyzer — SearchHeader Component
// Topic header with timestamp, data mode badge, actions
// ═══════════════════════════════════════════════════

import React from 'react';
import { RefreshCw, Search, Clock, Shield, Zap, Globe, Tag } from 'lucide-react';

export function SearchHeader({ report, topic, onRefresh, onDeepDive, isRefreshing, isDeepDiving }) {
  const isDemo = report?._source === 'demo';
  const isDeepDive = report?._deepDive;

  const timestamp = report?.researchTimestamp
    ? new Date(report.researchTimestamp).toLocaleString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
      })
    : 'Unknown';

  const geoContext = report?.geographicContext?.filter(Boolean) || [];
  const topicType = report?.topicType || '';

  return (
    <div style={styles.wrapper}>
      {/* Top meta bar */}
      <div style={styles.metaBar}>
        <div style={styles.metaLeft}>
          <span style={styles.appLabel}>AI TREND ANALYSIS</span>
          <span style={styles.metaDivider}>·</span>
          <Clock size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <span style={styles.timestamp}>Research updated: {timestamp}</span>
        </div>

        <div style={styles.metaRight}>
          {isDemo ? (
            <span style={styles.demoBadge}>
              <Shield size={11} />
              DEMO DATA
            </span>
          ) : (
            <span style={styles.liveBadge}>
              <Zap size={11} />
              LIVE RESEARCH
            </span>
          )}
          {isDeepDive && (
            <span style={styles.deepBadge}>
              <Search size={11} />
              DEEP DIVE
            </span>
          )}
        </div>
      </div>

      {/* Topic Display */}
      <div style={styles.topicRow}>
        <div style={styles.topicMeta}>
          <span style={styles.topicLabel}>Topic:</span>
        </div>
        <h2 style={styles.topicTitle}>{report?.topic || topic}</h2>
      </div>

      {/* Context tags */}
      {(geoContext.length > 0 || topicType) && (
        <div style={styles.tagsRow}>
          {topicType && (
            <span style={styles.typeTag}>
              <Tag size={11} />
              {topicType.toUpperCase()}
            </span>
          )}
          {geoContext.map((geo, i) => (
            <span key={i} style={styles.geoTag}>
              <Globe size={11} />
              {geo}
            </span>
          ))}
        </div>
      )}

      {/* PPF Navigation breadcrumb */}
      <div style={styles.ppfNav}>
        <a href="#sec-past" style={styles.ppfLink}>
          <span style={{ ...styles.ppfDot, background: 'var(--accent-2)' }} />
          ⏳ PAST
        </a>
        <span style={styles.ppfArrow}>→</span>
        <a href="#sec-present" style={styles.ppfLink}>
          <span style={{ ...styles.ppfDot, background: '#ef4444' }} />
          🔴 PRESENT
        </a>
        <span style={styles.ppfArrow}>→</span>
        <a href="#sec-future" style={styles.ppfLink}>
          <span style={{ ...styles.ppfDot, background: 'var(--accent)' }} />
          🔮 FUTURE
        </a>
      </div>

      {/* Action buttons */}
      <div style={styles.actions}>
        <button
          id="btn-refresh-research"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="btn btn-secondary"
          style={styles.actionBtn}
        >
          <RefreshCw size={14} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          <span>{isRefreshing ? 'Refreshing...' : '🔄 Refresh Research'}</span>
        </button>
        <button
          id="btn-deep-dive"
          onClick={onDeepDive}
          disabled={isDeepDiving}
          className="btn btn-primary"
          style={styles.actionBtn}
        >
          <Search size={14} />
          <span>{isDeepDiving ? 'Diving Deep...' : '🔎 Deep Dive'}</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '24px 28px',
    marginBottom: '32px',
    borderRadius: 'var(--radius-lg)',
    background: 'linear-gradient(135deg, rgba(15,21,32,0.95) 0%, rgba(20,28,50,0.9) 100%)',
    border: '1px solid var(--border-bright)',
    boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
  },
  metaBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '14px',
  },
  metaLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  metaRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  appLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '0.08em',
  },
  metaDivider: {
    color: 'var(--text-muted)',
    fontSize: '12px',
  },
  timestamp: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  demoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    color: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em',
  },
  liveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    color: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em',
  },
  deepBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    color: 'var(--accent)',
    backgroundColor: 'rgba(56,189,248,0.1)',
    border: '1px solid rgba(56,189,248,0.3)',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.05em',
  },
  topicRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  topicMeta: {
    flexShrink: 0,
  },
  topicLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  topicTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(22px, 3.5vw, 36px)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  },
  typeTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    color: 'var(--accent-2)',
    backgroundColor: 'rgba(167,139,250,0.1)',
    border: '1px solid rgba(167,139,250,0.25)',
    padding: '3px 9px',
    borderRadius: '999px',
  },
  geoTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent)',
    backgroundColor: 'rgba(56,189,248,0.08)',
    border: '1px solid rgba(56,189,248,0.2)',
    padding: '3px 9px',
    borderRadius: '999px',
  },
  ppfNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface-2)',
    border: '1px solid var(--border)',
    flexWrap: 'wrap',
  },
  ppfLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  ppfDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  ppfArrow: {
    color: 'var(--text-muted)',
    fontSize: '14px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  actionBtn: {
    fontSize: '13px',
    padding: '8px 16px',
    gap: '8px',
  },
};
