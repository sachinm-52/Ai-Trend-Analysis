// ═══════════════════════════════════════════════════
// AI Trend Analyzer — PastPresentFutureConnector
// Visual connector showing the P→P→F flow
// ═══════════════════════════════════════════════════

import React from 'react';
import { ArrowDown } from 'lucide-react';

export function PastPresentFutureConnector({ fromSection, toSection, fromLabel, toLabel, question }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '24px 0',
    }}>
      {/* Flow connector */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '16px 24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface-2)',
        maxWidth: '500px',
        width: '100%',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--accent)',
          letterSpacing: '0.05em',
          marginBottom: '4px',
        }}>
          PAST → PRESENT CONNECTION
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.5 }}>
          {question || 'What changed the trajectory?'}
        </div>

        <ArrowDown size={20} style={{ color: 'var(--accent)', marginTop: '4px' }} />
      </div>
    </div>
  );
}

export function PPFFlowBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      padding: '20px',
      marginTop: '16px',
      marginBottom: '8px',
    }}>
      {/* PAST */}
      <div style={flowNode('#a78bfa', '⏳', 'PAST', 'Where did it come from?')} />

      {/* Arrow + Bridge */}
      <div style={flowBridge()}>
        <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #a78bfa, #ef4444)' }} />
        <div style={bridgeLabel}>What changed?</div>
      </div>

      {/* PRESENT */}
      <div style={flowNode('#ef4444', '🔴', 'PRESENT', 'What is happening now?')} />

      {/* Arrow + Bridge */}
      <div style={flowBridge()}>
        <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg, #ef4444, #38bdf8)' }} />
        <div style={bridgeLabel}>What signals?</div>
      </div>

      {/* FUTURE */}
      <div style={flowNode('#38bdf8', '🔮', 'FUTURE', 'What could happen next?')} />
    </div>
  );
}

function flowNode(color, emoji, label, sub) {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '14px 18px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${color}40`,
    backgroundColor: `${color}0d`,
    minWidth: '120px',
    textAlign: 'center',
    // Children rendered by the component
    _emoji: emoji,
    _label: label,
    _sub: sub,
    _color: color,
  };
}

// Helper to style the flow bridge
function flowBridge() {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '0 8px',
  };
}

const bridgeLabel = {
  fontSize: '10px',
  fontFamily: 'var(--font-mono)',
  color: 'var(--text-muted)',
  whiteSpace: 'nowrap',
};

// Simplified inline component version
export function PPFConnector() {
  const nodes = [
    { emoji: '⏳', label: 'PAST', sub: 'Where did it come from?', color: '#a78bfa', id: 'sec-past' },
    { emoji: '🔴', label: 'PRESENT', sub: 'What is happening now?', color: '#ef4444', id: 'sec-present' },
    { emoji: '🔮', label: 'FUTURE', sub: 'What could happen next?', color: '#38bdf8', id: 'sec-future' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap: '0',
      padding: '16px 0 24px',
      flexWrap: 'wrap',
    }}>
      {nodes.map((node, idx) => (
        <React.Fragment key={node.label}>
          <a
            href={`#${node.id}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '14px 20px',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${node.color}40`,
              backgroundColor: `${node.color}0d`,
              minWidth: '120px',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = `${node.color}18`;
              e.currentTarget.style.borderColor = `${node.color}70`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = `${node.color}0d`;
              e.currentTarget.style.borderColor = `${node.color}40`;
            }}
          >
            <span style={{ fontSize: '20px' }}>{node.emoji}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              color: node.color, letterSpacing: '0.06em',
            }}>
              {node.label}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {node.sub}
            </span>
          </a>

          {idx < nodes.length - 1 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 8px',
            }}>
              <div style={{
                height: '2px', width: '32px',
                background: `linear-gradient(90deg, ${nodes[idx].color}, ${nodes[idx + 1].color})`,
                margin: '0 4px',
              }} />
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '4px', whiteSpace: 'nowrap' }}>
                →
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
