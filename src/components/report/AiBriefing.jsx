import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ReportSection } from './ReportSection';
import { COLORS } from '../../utils/formatters';

export function AiBriefing({ insight, authenticity }) {
  const [copied, setCopied] = useState(false);

  if (!insight) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(insight);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAction = (
    <button
      className="sp-mono"
      style={styles.copyBtn}
      onClick={handleCopy}
      title="Copy briefing to clipboard"
    >
      {copied ? <Check size={13} color={COLORS.positive} /> : <Copy size={13} />}
      <span>{copied ? 'copied' : 'copy'}</span>
    </button>
  );

  return (
    <ReportSection num="06" title="AI Briefing" actions={copyAction}>
      <p className="sp-display" style={styles.insight}>
        {insight}
      </p>

      {authenticity && (
        <div style={styles.authBox}>
          <div style={styles.authHeader}>
            <span className="sp-mono" style={styles.authTitle}>
              AUTHENTICITY &amp; COORDINATION METRIC
            </span>
            <span className="sp-mono" style={styles.authScore}>
              {authenticity.normal}% organic
            </span>
          </div>
          <p className="sp-mono" style={styles.authNote}>
            {authenticity.note}
          </p>
        </div>
      )}
    </ReportSection>
  );
}

const styles = {
  insight: {
    fontSize: 17.5,
    lineHeight: 1.68,
    color: '#D9DEEA',
    maxWidth: 680,
  },
  copyBtn: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 6,
    padding: '3px 8px',
    fontSize: 11,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    transition: 'all 0.15s ease',
  },
  authBox: {
    marginTop: 18,
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '12px 16px',
    maxWidth: 680,
  },
  authHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  authTitle: {
    fontSize: 10.5,
    color: COLORS.accent,
    letterSpacing: '0.08em',
  },
  authScore: {
    fontSize: 11,
    color: COLORS.positive,
  },
  authNote: {
    fontSize: 11.5,
    color: COLORS.muted,
    lineHeight: 1.5,
  },
};
