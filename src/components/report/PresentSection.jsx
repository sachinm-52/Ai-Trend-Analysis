// ═══════════════════════════════════════════════════
// AI Trend Analyzer — PresentSection Component
// 🔴 PRESENT: Current Status, Latest Developments, Sources
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Newspaper, Radio, Filter, ExternalLink } from 'lucide-react';
import { NewsCard, GroupedCoverage } from './NewsCard';

function SectionDivider({ id, emoji, label, color }) {
  return (
    <div id={id} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '20px 0 16px',
      borderBottom: `2px solid ${color}30`,
      marginBottom: '24px',
    }}>
      <span style={{ fontSize: '24px' }}>{emoji}</span>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {label}
        </h2>
      </div>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}50, transparent)` }} />
    </div>
  );
}

function SubSectionHeader({ label, color = 'var(--accent)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', marginTop: '28px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
        {label}
      </h3>
    </div>
  );
}

function CurrentStatusCard({ present }) {
  if (!present?.currentStatus) return null;

  return (
    <div className="glass-card" style={{
      padding: '24px 26px',
      border: '1px solid rgba(239,68,68,0.3)',
      backgroundColor: 'rgba(239,68,68,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Live indicator */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #ef4444, #f87171)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444',
          boxShadow: '0 0 8px rgba(239,68,68,0.6)',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em' }}>
          CURRENT STATUS
        </span>
        {present.statusDate && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
            As of {present.statusDate}
          </span>
        )}
      </div>

      <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
        {present.currentStatus}
      </p>
    </div>
  );
}

export function PresentSection({ report }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const present = report?.present;
  const currentEvents = report?.currentEvents || [];

  // Use present.latestDevelopments if available, fall back to currentEvents
  const developments = present?.latestDevelopments?.length
    ? present.latestDevelopments
    : currentEvents.map(ev => ({
        headline: ev.headline,
        date: ev.date,
        entity: ev.source,
        summary: ev.summary,
        source: ev.source,
        url: '#',
        type: 'news',
      }));

  const groupedCoverage = present?.groupedCoverage || [];
  const sources = report?.sources || [];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'news', label: '📰 News' },
    { key: 'announcement', label: '📣 Announcements' },
    { key: 'regulatory', label: '⚖️ Regulatory' },
    { key: 'research', label: '🔬 Research' },
  ];

  const filteredDevelopments = activeFilter === 'all'
    ? developments
    : developments.filter(d => d.type === activeFilter);

  const hasPresentContent = present || developments.length > 0;
  if (!hasPresentContent) return null;

  return (
    <section style={{ marginTop: '48px' }}>
      <SectionDivider
        id="sec-present"
        emoji="🔴"
        label="PRESENT — What Is Happening Now?"
        color="#ef4444"
      />

      {/* Current Status */}
      <CurrentStatusCard present={present} />

      {/* Latest Developments */}
      {developments.length > 0 && (
        <>
          <SubSectionHeader label="📰 Latest Developments" color="#ef4444" />

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', overflowX: 'auto' }}>
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`btn ${activeFilter === f.key ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12px', padding: '5px 12px', whiteSpace: 'nowrap' }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filteredDevelopments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {filteredDevelopments.map((item, idx) => (
                <NewsCard key={idx} item={item} />
              ))}
            </div>
          ) : (
            <div style={{
              padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px',
            }}>
              No {activeFilter} items found for this topic.
            </div>
          )}
        </>
      )}

      {/* Grouped Coverage */}
      {groupedCoverage.length > 0 && (
        <>
          <SubSectionHeader label="📡 Coverage by Event" color="#ef4444" />
          <GroupedCoverage groups={groupedCoverage} />
        </>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <>
          <SubSectionHeader label="🔗 Sources & References" color="#ef4444" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {sources.map((src, idx) => {
              const hasUrl = src.url && src.url !== '#' && src.url.startsWith('http');
              const typeColors = {
                news: 'var(--accent)',
                research: '#22c55e',
                company: 'var(--accent-2)',
                government: '#f59e0b',
                data: 'var(--accent-warm)',
              };
              const color = typeColors[src.type] || 'var(--accent)';

              return (
                <div key={idx} className="glass-card" style={{
                  padding: '14px 16px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{
                        fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                        color, textTransform: 'uppercase', letterSpacing: '0.04em',
                      }}>
                        {src.name}
                      </span>
                      {src.date && (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {src.date}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                      {src.title}
                    </p>
                    {src.description && (
                      <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.45 }}>
                        {src.description}
                      </p>
                    )}
                  </div>
                  {hasUrl && (
                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{
                          fontSize: '11.5px', color, display: 'inline-flex', alignItems: 'center', gap: '4px',
                          textDecoration: 'none', fontWeight: 600,
                        }}
                      >
                        <span>Visit source</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
