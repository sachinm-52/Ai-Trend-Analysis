import React from 'react';
import { COLORS } from '../../utils/formatters';

export function ReportSection({ num, title, children, actions }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHead}>
        <span className="sp-mono" style={styles.sectionNum}>
          {num}
        </span>
        <span className="sp-display" style={styles.sectionTitle}>
          {title}
        </span>
        <div style={styles.sectionRule} />
        {actions && <div style={styles.sectionActions}>{actions}</div>}
      </div>
      <div style={styles.sectionBody}>{children}</div>
    </div>
  );
}

const styles = {
  section: {
    borderTop: `1px solid ${COLORS.border}`,
    padding: '28px 0',
  },
  sectionHead: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 20,
  },
  sectionNum: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 600,
    color: COLORS.text,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    background: COLORS.border,
  },
  sectionActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  sectionBody: {},
};
