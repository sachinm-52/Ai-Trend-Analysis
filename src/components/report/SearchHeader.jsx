// ═══════════════════════════════════════════════════
// AI Trend Analyzer — SearchHeader Component
// Topic header with freshness, transparent trust indicator & action buttons
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { RefreshCw, Search, Clock, ShieldCheck, Zap, Globe, Tag, Sparkles, FileText, Info } from 'lucide-react';

export function SearchHeader({
  report,
  topic,
  onRefresh,
  onDeepDive,
  onSearchMore,
  onShowEvidence,
  isRefreshing,
  isDeepDiving,
}) {
  const [showAuditInfo, setShowAuditInfo] = useState(false);

  const timestamp = report?.researchTimestamp
    ? new Date(report.researchTimestamp).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
      })
    : 'Live';

  const audit = report?.evidenceAudit || {};
  const freshness = audit.freshness || 'Recent';
  const evidenceLevel = audit.level || 'High';
  const tier1Count = audit.tier1Count || report?.officialSources?.length || 0;
  const tier2Count = audit.tier2Count || 0;
  const totalSources = audit.totalSources || report?.sources?.length || 0;

  const topicType = report?.queryContext?.domain || report?.topicType || 'Trend Intelligence';

  return (
    <div style={styles.wrapper}>
      {/* Top Meta Bar */}
      <div style={styles.metaBar}>
        <div style={styles.metaLeft}>
          <span style={styles.appLabel}>REAL-TIME VERIFIED RESEARCH ENGINE</span>
          <span style={styles.metaDivider}>·</span>
          <Clock size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <span style={styles.timestamp}>Last researched: {timestamp}</span>
          <span style={styles.metaDivider}>·</span>
          {/* Freshness Badge (Requirement #7) */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', fontFamily: 'var(--font-mono)',
            color: freshness.includes('Very') ? '#10b981' : 'var(--accent)',
            fontWeight: 600,
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: freshness.includes('Very') ? '#10b981' : 'var(--accent)',
              animation: 'pulse 1.5s infinite',
            }} />
            {freshness}
          </span>
        </div>

        <div style={styles.metaRight}>
          {/* Evidence Trust Quality Indicator (Requirement #22) */}
          <button
            onClick={() => setShowAuditInfo(!showAuditInfo)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: evidenceLevel === 'High' ? '#10b981' : '#f59e0b',
              backgroundColor: evidenceLevel === 'High' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
              border: `1px solid ${evidenceLevel === 'High' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
              padding: '4px 10px', borderRadius: '999px', cursor: 'pointer',
            }}
          >
            <ShieldCheck size={13} />
            <span>Evidence Quality: {evidenceLevel}</span>
            <Info size={11} />
          </button>
        </div>
      </div>

      {/* Audit Breakdown Tooltip */}
      {showAuditInfo && (
        <div style={{
          padding: '12px 16px', borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-surface-2)', border: '1px solid var(--border)',
          marginBottom: '16px', fontSize: '12px', color: 'var(--text-secondary)',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          <strong style={{ color: 'var(--text-primary)' }}>Transparent Evidence Quality Breakdown:</strong>
          <div>• {totalSources} verified live web sources inspected</div>
          {tier1Count > 0 && <div>• {tier1Count} Tier-1 Primary / Official sources verified</div>}
          {tier2Count > 0 && <div>• {tier2Count} Tier-2 Reputable Journalism publications</div>}
          <div>• Freshness: {freshness}</div>
          {audit.reasons?.map((r, i) => (
            <div key={i} style={{ color: 'var(--text-muted)' }}>• {r}</div>
          ))}
        </div>
      )}

      {/* Topic Display */}
      <div style={styles.topicRow}>
        <div style={styles.topicMeta}>
          <span style={styles.topicLabel}>Research Topic:</span>
        </div>
        <h2 style={styles.topicTitle}>{report?.topic || topic}</h2>
      </div>

      {/* Context Tags */}
      <div style={styles.tagsRow}>
        <span style={styles.typeTag}>
          <Tag size={11} />
          {topicType.replace(/_/g, ' ').toUpperCase()}
        </span>
        <span style={styles.geoTag}>
          <Globe size={11} />
          {totalSources} VERIFIED SOURCES
        </span>
      </div>

      {/* PPF Navigation breadcrumbs */}
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

      {/* Action Buttons: Refresh, Search More, Show Evidence, Deep Dive */}
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

        {/* "Search More" (Requirement #24) */}
        <button
          id="btn-search-more"
          onClick={onSearchMore || onDeepDive}
          className="btn btn-secondary"
          style={{ ...styles.actionBtn, borderColor: 'var(--accent)' }}
        >
          <Search size={14} style={{ color: 'var(--accent)' }} />
          <span>🔎 Search More</span>
        </button>

        {/* "Show Evidence" (Requirement #23) */}
        <button
          id="btn-show-evidence"
          onClick={() => onShowEvidence && onShowEvidence(report?.searchSummary || report?.topic, report?.sources, 'VERIFIED')}
          className="btn btn-secondary"
          style={styles.actionBtn}
        >
          <FileText size={14} />
          <span>🔍 Show Evidence</span>
        </button>

        <button
          id="btn-deep-dive"
          onClick={onDeepDive}
          disabled={isDeepDiving}
          className="btn btn-primary"
          style={styles.actionBtn}
        >
          <Sparkles size={14} />
          <span>{isDeepDiving ? 'Deep Researching...' : '🧠 Deep Research'}</span>
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
    flexWrap: 'wrap',
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
  topicRow: {
    marginBottom: '10px',
  },
  topicMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px',
  },
  topicLabel: {
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  topicTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(24px, 3.5vw, 36px)',
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
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-surface-2)',
    border: '1px solid var(--border)',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
  },
  geoTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-surface-2)',
    border: '1px solid var(--border)',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent)',
  },
  ppfNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(0,0,0,0.25)',
    border: '1px solid var(--border)',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  ppfLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
  },
  ppfDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  ppfArrow: {
    color: 'var(--text-muted)',
    fontSize: '11px',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    paddingTop: '16px',
    borderTop: '1px solid var(--border)',
  },
  actionBtn: {
    fontSize: '13px',
    padding: '8px 16px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
};
