// ═══════════════════════════════════════════════════
// AI Trend Analyzer — BigPicture Component (Section 3)
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Compass, Flame, HelpCircle, Users2, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function BigPicture({ bigPicture }) {
  if (!bigPicture) return null;

  return (
    <SectionWrapper
      id="sec-big-picture"
      sectionNum="02"
      title="The Big Picture"
      subtitle="Fundamental contextual overview: the shift, drivers, relevance, and human impact"
      icon={Compass}
      badgeType="analysis"
      badgeLabel="MACRO SYNTHESIS"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Row 1: What is happening & Why should I care */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {/* What is happening */}
          <div
            className="glass-card"
            style={{
              padding: '20px',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '10px' }}>
              <Compass size={18} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                What Is Happening
              </h4>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
              {bigPicture.whatIsHappening}
            </p>
          </div>

          {/* Why should I care */}
          <div
            className="glass-card"
            style={{
              padding: '20px',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-2)', marginBottom: '10px' }}>
              <HelpCircle size={18} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Why Should You Care
              </h4>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
              {bigPicture.whyShouldICare}
            </p>
          </div>
        </div>

        {/* Row 2: Why it is trending */}
        <div
          className="glass-card"
          style={{
            padding: '20px',
            border: '1px solid var(--border)',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-warm)', marginBottom: '12px' }}>
            <Flame size={18} />
            <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Why It Is Trending Now
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {(bigPicture.whyTrending || []).map((reason, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-2)',
                  border: '1px solid var(--border)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                <span style={{ color: 'var(--accent-warm)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  0{idx + 1}
                </span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Who Is Affected */}
        {bigPicture.whoIsAffected && bigPicture.whoIsAffected.length > 0 && (
          <div
            className="glass-card"
            style={{
              padding: '20px',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-3)', marginBottom: '14px' }}>
              <Users2 size={18} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Stakeholder Impact Matrix
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
              {bigPicture.whoIsAffected.map((item, idx) => {
                const isPos = item.direction === 'positive';
                const isNeg = item.direction === 'negative';
                const dirColor = isPos ? 'var(--positive)' : isNeg ? 'var(--negative)' : 'var(--warning)';
                const DirIcon = isPos ? ArrowUpRight : isNeg ? ArrowDownRight : Minus;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-2)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                        {item.group}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: dirColor,
                          backgroundColor: `${dirColor}15`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        <DirIcon size={12} />
                        {item.direction?.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                      {item.impact}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
