// ═══════════════════════════════════════════════════
// AI Trend Analyzer — RecentSearches Component
// ═══════════════════════════════════════════════════

import React from 'react';
import { History, X, Trash2, ArrowUpRight } from 'lucide-react';

export function RecentSearches({ searches = [], onSelect, onRemove, onClear }) {
  if (!searches || searches.length === 0) return null;

  return (
    <div
      className="glass-card"
      style={{
        maxWidth: '780px',
        margin: '24px auto 0',
        padding: '16px 20px',
        border: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '12.5px', fontWeight: 500 }}>
          <History size={14} />
          <span>Recently Explored Trends</span>
        </div>
        <button
          onClick={onClear}
          className="btn-ghost"
          style={{ fontSize: '11px', padding: '2px 6px', color: 'var(--text-muted)' }}
          title="Clear all recent searches"
        >
          <Trash2 size={12} style={{ marginRight: '4px' }} />
          Clear
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {searches.map((item) => (
          <div
            key={item}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface-3)',
              borderRadius: '999px',
              padding: '4px 10px',
              border: '1px solid var(--border)',
              fontSize: '12px',
            }}
          >
            <span
              onClick={() => onSelect(item)}
              style={{
                cursor: 'pointer',
                color: 'var(--text-primary)',
                marginRight: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {item}
              <ArrowUpRight size={11} style={{ opacity: 0.6 }} />
            </span>
            <button
              onClick={() => onRemove(item)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              title={`Remove ${item}`}
            >
              <X size={11} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
