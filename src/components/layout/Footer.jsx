import React from 'react';
import { COLORS } from '../../utils/formatters';

export function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.left}>
          <span className="sp-mono" style={styles.logo}>
            SOCIALPULSE AI
          </span>
          <span className="sp-mono" style={styles.version}>
            v1.0.0 · Dual-Engine Architecture
          </span>
        </div>
        <p className="sp-mono" style={styles.disclaimer}>
          AI-reasoned social intelligence synthesis. For live enterprise feeds, connect Twitter/X,
          Reddit, or news firehose APIs via the configuration drawer.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    padding: '32px 24px',
    marginTop: 'auto',
  },
  container: {
    maxWidth: 880,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
    textAlign: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 11,
    letterSpacing: '0.14em',
    color: COLORS.accent,
    fontWeight: 600,
  },
  version: {
    fontSize: 11,
    color: COLORS.muted,
  },
  disclaimer: {
    fontSize: 11,
    color: '#5A6377',
    maxWidth: 620,
    lineHeight: 1.6,
  },
};
