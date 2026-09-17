// ═══════════════════════════════════════════════════
// AI Trend Analyzer — TopicProfile Component (Section 2)
// ═══════════════════════════════════════════════════

import React from 'react';
import { Compass, Globe, Tag, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getCategoryStyle, MOMENTUM_CONFIG } from '../../utils/colors';

export function TopicProfile({ report, onSelectRelated }) {
  if (!report) return null;

  const catStyle = getCategoryStyle(report.category);
  const momCfg = MOMENTUM_CONFIG[report.trendMomentum?.signal] || MOMENTUM_CONFIG.rising;

  return (
    <div
      className="glass-card"
      style={{
        padding: '28px 32px',
        marginBottom: '28px',
        border: '1px solid var(--border-bright)',
        background: 'linear-gradient(135deg, rgba(15, 21, 32, 0.9) 0%, rgba(20, 28, 42, 0.7) 100%)',
      }}
    >
      {/* Top Row: Meta Badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            {report.category || 'Technology'}
          </span>
          {report.subcategory && (
            <span
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-surface-3)',
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid var(--border)',
              }}
            >
              {report.subcategory}
            </span>
          )}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: momCfg.bg,
              color: momCfg.color,
              border: `1px solid ${momCfg.border}`,
            }}
          >
            <TrendingUp size={13} />
            {momCfg.label}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge type="fact" label={`${report.confidence || 90}% CONFIDENCE`} size="xs" />
          <Badge
            type={report._source === 'live' ? 'analysis' : 'demo'}
            label={report._source === 'live' ? 'LIVE AI SYNTHESIS' : 'TREND MODEL'}
            size="xs"
          />
        </div>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: '14px',
        }}
      >
        {report.topic}
      </h1>

      {/* Profile Summary */}
      <p
        style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          maxWidth: '880px',
          marginBottom: '24px',
        }}
      >
        {report.profile?.description || report.bigPicture?.whatIsHappening}
      </p>

      {/* Scope, Entities, & Geographic Footprint */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Major Entities */}
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            MAJOR ENTITIES
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(report.profile?.majorEntities || []).map((e) => (
              <span key={e} className="tag" style={{ fontSize: '11.5px' }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Major Tech */}
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            CORE TECHNOLOGIES
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(report.profile?.majorTechnologies || []).map((t) => (
              <span key={t} className="tag" style={{ fontSize: '11.5px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Geographic Relevance */}
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            GEOGRAPHIC SCOPE
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(report.geographicRelevance || ['Global']).map((geo) => (
              <span key={geo} className="tag" style={{ fontSize: '11.5px', color: 'var(--accent)' }}>
                <Globe size={11} style={{ marginRight: '4px' }} />
                {geo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Topics Bar */}
      {report.relatedTopics && report.relatedTopics.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
            fontSize: '12px',
          }}
        >
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Tag size={12} /> Related Trends:
          </span>
          {report.relatedTopics.map((rel) => (
            <button
              key={rel}
              onClick={() => onSelectRelated && onSelectRelated(rel)}
              className="tag"
              style={{
                cursor: 'pointer',
                borderColor: 'var(--border-bright)',
                background: 'var(--bg-surface-2)',
              }}
            >
              {rel}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
