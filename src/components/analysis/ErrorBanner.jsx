import React from 'react';
import { AlertCircle } from 'lucide-react';
import { COLORS } from '../../utils/formatters';

export function ErrorBanner({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div style={styles.container}>
      <AlertCircle size={16} color={COLORS.negative} />
      <span className="sp-mono" style={styles.text}>
        {error}
      </span>
      {onDismiss && (
        <button className="sp-mono" style={styles.dismissBtn} onClick={onDismiss}>
          dismiss
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 560,
    margin: '0 auto 24px',
    background: 'rgba(248, 113, 113, 0.08)',
    border: '1px solid rgba(248, 113, 113, 0.3)',
    borderRadius: 8,
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    flex: 1,
    color: COLORS.negative,
    fontSize: 12.5,
  },
  dismissBtn: {
    background: 'transparent',
    border: 'none',
    color: COLORS.muted,
    fontSize: 11,
    cursor: 'pointer',
    padding: '2px 6px',
  },
};
