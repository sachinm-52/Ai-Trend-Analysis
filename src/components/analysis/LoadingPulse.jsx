import React from 'react';
import { Activity } from 'lucide-react';
import { COLORS } from '../../utils/formatters';

export function LoadingPulse({ message = 'reading the signal…' }) {
  return (
    <div style={styles.loadingBox}>
      <div style={styles.pulseContainer}>
        <Activity size={24} color={COLORS.accent} className="sp-signal-pulse" />
      </div>
      <span className="sp-mono" style={styles.loadingText}>
        {message}
      </span>
      <div style={styles.miniBar}>
        <div className="sp-pulse-path" style={styles.miniLine} />
      </div>
    </div>
  );
}

const styles = {
  loadingBox: {
    textAlign: 'center',
    padding: '48px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
  },
  pulseContainer: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'rgba(45, 212, 191, 0.08)',
    border: '1px solid rgba(45, 212, 191, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: 13,
    letterSpacing: '0.04em',
  },
  miniBar: {
    width: 120,
    height: 2,
    background: COLORS.surface2,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 2,
  },
  miniLine: {
    width: '100%',
    height: '100%',
    background: COLORS.accent,
  },
};
