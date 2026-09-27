// ═══════════════════════════════════════════════════
// AI Trend Analyzer — NewsCard Component
// Clickable news/source card with real URL, date, source name
// ═══════════════════════════════════════════════════

import React from 'react';
import { ExternalLink, Calendar, Building2, Tag } from 'lucide-react';

const TYPE_COLORS = {
  news: { bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)', text: 'var(--accent)' },
  announcement: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', text: 'var(--accent-2)' },
  research: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', text: '#22c55e' },
  regulatory: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
};

export function NewsCard({ item, compact = false }) {
  if (!item) return null;

  const typeStyle = TYPE_COLORS[item.type] || TYPE_COLORS.news;
  const hasUrl = item.url && item.url !== '#' && item.url.startsWith('http');

  return (
    <div
      className="glass-card hover-card"
      style={{
        padding: compact ? '14px 16px' : '20px 22px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line by type */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: typeStyle.text,
        opacity: 0.6,
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          {/* Source badge */}
          {item.source && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              fontWeight: 700,
              color: typeStyle.text,
              backgroundColor: typeStyle.bg,
              border: `1px solid ${typeStyle.border}`,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {item.source}
            </span>
          )}
          {/* Type badge */}
          {item.type && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9.5px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {item.type}
            </span>
          )}
        </div>

        {/* Date */}
        {item.date && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            <Calendar size={11} />
            {item.date}
          </span>
        )}
      </div>

      {/* Headline */}
      <h4 style={{
        fontFamily: 'var(--font-display)',
        fontSize: compact ? '14px' : '16px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: '1.35',
      }}>
        {item.headline || item.title}
      </h4>

      {/* Entity */}
      {item.entity && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
          <Building2 size={12} style={{ color: 'var(--accent-2)' }} />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.entity}</span>
        </div>
      )}

      {/* Summary */}
      {item.summary && !compact && (
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          margin: 0,
        }}>
          {item.summary}
        </p>
      )}

      {/* URL button */}
      {hasUrl && (
        <div style={{ marginTop: '4px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer noopener"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(56,189,248,0.15)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(56,189,248,0.08)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)';
            }}
          >
            <span>Read full article</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  );
}

// Grouped coverage component
export function GroupedCoverage({ groups = [] }) {
  if (!groups || groups.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {groups.map((group, idx) => (
        <div
          key={idx}
          className="glass-card"
          style={{
            padding: '14px 18px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-surface-2)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {group.event}
            </span>
            {group.date && (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {group.date}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginRight: '4px', alignSelf: 'center' }}>
              Reported by:
            </span>
            {(group.sources || []).map((src, i) => (
              src.url && src.url.startsWith('http') ? (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11.5px',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(56,189,248,0.25)',
                    backgroundColor: 'rgba(56,189,248,0.07)',
                  }}
                >
                  {src.name}
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span key={i} style={{
                  fontSize: '11.5px',
                  color: 'var(--text-secondary)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-surface)',
                }}>
                  {src.name}
                </span>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
