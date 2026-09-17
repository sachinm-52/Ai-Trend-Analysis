// ═══════════════════════════════════════════════════
// AI Trend Analyzer — CurrentEvents Component (Section 6)
// Recent Verified Intelligence Feed
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Newspaper, ExternalLink, Calendar, HelpCircle, ShieldCheck } from 'lucide-react';
import { EvidenceTag } from '../common/EvidenceTag';

export function CurrentEvents({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-current-events"
      sectionNum="07"
      title="Current Intelligence & Signals"
      subtitle="Verified recent developments, strategic maneuvers, regulatory actions, and market events"
      icon={Newspaper}
      badgeType="fact"
      badgeLabel="VERIFIED SIGNALS"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="glass-card hover-card"
            style={{
              padding: '20px 24px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            {/* Top row: Source + Date + Evidence */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {ev.source || 'Intelligence Feed'}
                </span>
                {ev.date && (
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <Calendar size={11} />
                    {ev.date}
                  </span>
                )}
              </div>

              <EvidenceTag level={ev.evidence || 'high'} />
            </div>

            {/* Headline */}
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
                lineHeight: '1.35',
              }}
            >
              {ev.headline}
            </h4>

            {/* Summary */}
            <p
              style={{
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '12px',
              }}
            >
              {ev.summary}
            </p>

            {/* Why it matters */}
            {ev.whyItMatters && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(56, 189, 248, 0.05)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  fontSize: '12.5px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <HelpCircle size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>Why it matters:</strong>
                  {ev.whyItMatters}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
