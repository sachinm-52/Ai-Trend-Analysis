// ═══════════════════════════════════════════════════
// AI Trend Analyzer — EvidenceTag Component
// ═══════════════════════════════════════════════════

import React from 'react';
import { EVIDENCE_LEVELS } from '../../utils/colors';

export function EvidenceTag({ level = 'medium' }) {
  const normLevel = String(level).toLowerCase();
  const cfg = EVIDENCE_LEVELS[normLevel] || EVIDENCE_LEVELS.medium;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '10.5px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.color}33`,
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: cfg.color,
        }}
      />
      {cfg.label}
    </span>
  );
}
