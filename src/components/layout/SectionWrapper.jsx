// ═══════════════════════════════════════════════════
// AI Trend Analyzer — SectionWrapper Component
// Standard container for each of the intelligence sections
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../common/Badge';

export function SectionWrapper({
  id,
  sectionNum,
  title,
  subtitle,
  icon: Icon,
  badgeType = 'analysis',
  badgeLabel,
  children,
  defaultExpanded = true,
  className = '',
  action,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section
      id={id}
      className={`glass-card ${className}`}
      style={{
        padding: '24px 28px',
        marginBottom: '24px',
        scrollMarginTop: '80px',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          {Icon && (
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-3)',
                border: '1px solid var(--border-bright)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <Icon size={18} />
            </div>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {sectionNum && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                  }}
                >
                  SEC {sectionNum}
                </span>
              )}
              {badgeType && <Badge type={badgeType} label={badgeLabel} size="xs" />}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: '1.3',
                margin: 0,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginTop: '4px',
                  marginBottom: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={e => e.stopPropagation()}>
          {action}
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="btn-ghost"
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
            }}
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          {children}
        </div>
      )}
    </section>
  );
}
