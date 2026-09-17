// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ProgressBar Component
// ═══════════════════════════════════════════════════

import React from 'react';

export function ProgressBar({ value = 0, max = 100, color = 'var(--accent)', height = 6 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className="progress-track"
      style={{ height: `${height}px`, background: 'var(--bg-surface-3)' }}
    >
      <div
        className="progress-fill"
        style={{
          width: `${pct}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
