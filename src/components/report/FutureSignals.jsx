// ═══════════════════════════════════════════════════
// AI Trend Analyzer — FutureSignals Component
// Signal → Possible Impact → Future Implication grid
// ═══════════════════════════════════════════════════

import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export function FutureSignals({ signals = [] }) {
  if (!signals || signals.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {signals.map((sig, idx) => (
        <div
          key={idx}
          className="glass-card hover-card"
          style={{
            padding: '16px 18px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-surface)',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {/* Signal */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Zap size={12} style={{ color: 'var(--accent-warm)', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-warm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Signal
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
              {sig.signal}
            </p>
          </div>

          {/* Arrow 1 */}
          <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />

          {/* Impact */}
          <div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-2)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
              Possible Impact
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              {sig.impact}
            </p>
          </div>

          {/* Arrow 2 */}
          <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />

          {/* Implication */}
          <div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
              Future Implication
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              {sig.implication}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Mobile-friendly stacked version
export function FutureSignalsMobile({ signals = [] }) {
  if (!signals || signals.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {signals.map((sig, idx) => (
        <div
          key={idx}
          className="glass-card"
          style={{
            padding: '16px 18px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-warm)', fontWeight: 700, textTransform: 'uppercase' }}>⚡ Signal</span>
              <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', margin: '4px 0 0', fontWeight: 500 }}>{sig.signal}</p>
            </div>
            <div style={{ paddingLeft: '12px', borderLeft: '2px solid var(--border-bright)' }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-2)', fontWeight: 700, textTransform: 'uppercase' }}>→ Impact</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{sig.impact}</p>
            </div>
            <div style={{ paddingLeft: '12px', borderLeft: '2px solid var(--accent)', borderColor: 'rgba(56,189,248,0.4)' }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>→ Future</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{sig.implication}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
