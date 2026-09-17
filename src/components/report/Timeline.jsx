// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Timeline Component (Section 4 & 23)
// Interactive Historical Timeline with Turning Points & Slider
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Calendar, Filter, Sparkles, User, HelpCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export function Timeline({ timeline = [] }) {
  const [filterTurningOnly, setFilterTurningOnly] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(null);

  if (!timeline || timeline.length === 0) return null;

  const displayList = filterTurningOnly
    ? timeline.filter(item => item.turningPoint)
    : timeline;

  const activeEvent = sliderIndex !== null
    ? displayList[Math.min(sliderIndex, displayList.length - 1)]
    : null;

  return (
    <SectionWrapper
      id="sec-timeline"
      sectionNum="04"
      title="Historical Timeline & Turning Points"
      subtitle="Chronological inflection points, key architects, catalysts, and structural impacts"
      icon={Calendar}
      badgeType="fact"
      badgeLabel="VERIFIED MILESTONES"
      action={
        <button
          onClick={() => setFilterTurningOnly(prev => !prev)}
          className={`btn ${filterTurningOnly ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '5px 10px', fontSize: '11.5px' }}
        >
          <Filter size={12} />
          <span>{filterTurningOnly ? 'Showing Turning Points' : 'All Milestones'}</span>
        </button>
      }
    >
      {/* Time Machine Slider */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          backgroundColor: 'var(--bg-surface-2)',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            <Sparkles size={14} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 600 }}>TIME MACHINE SCRUBBER</span>
          </div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
            {sliderIndex !== null ? `Scrubbing: ${activeEvent?.year || ''}` : 'Drag slider or click milestones'}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={Math.max(0, displayList.length - 1)}
          value={sliderIndex !== null ? sliderIndex : displayList.length - 1}
          onChange={(e) => setSliderIndex(parseInt(e.target.value, 10))}
          style={{
            width: '100%',
            accentColor: 'var(--accent)',
            cursor: 'pointer',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <span>{displayList[0]?.year || 'Past'}</span>
          <span>{displayList[Math.floor(displayList.length / 2)]?.year || ''}</span>
          <span>{displayList[displayList.length - 1]?.year || 'Present'}</span>
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Continuous timeline vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '24px',
            width: '2px',
            backgroundColor: 'var(--border-bright)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {displayList.map((item, idx) => {
            const isHighlighted = sliderIndex === idx;
            const isTurning = item.turningPoint;
            const impactColor = item.impact === 'HIGH' ? 'var(--accent-warm)' : 'var(--accent)';

            return (
              <div
                key={idx}
                style={{ position: 'relative' }}
                onClick={() => setSliderIndex(idx)}
              >
                {/* Node circle on the line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '14px',
                    width: isTurning ? '16px' : '12px',
                    height: isTurning ? '16px' : '12px',
                    borderRadius: '50%',
                    backgroundColor: isHighlighted ? 'var(--accent)' : isTurning ? 'var(--accent-warm)' : 'var(--bg-surface-3)',
                    border: `2px solid ${isHighlighted ? '#FFF' : isTurning ? 'var(--accent-warm)' : 'var(--border-bright)'}`,
                    boxShadow: isTurning ? '0 0 10px rgba(251, 146, 60, 0.4)' : 'none',
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    zIndex: 2,
                    transition: 'all 0.2s ease',
                  }}
                  title={item.year}
                />

                {/* Milestone Content Card */}
                <div
                  className="glass-card hover-card"
                  style={{
                    padding: '18px 20px',
                    border: isHighlighted ? '1px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: isHighlighted ? 'var(--bg-surface-3)' : 'var(--bg-surface)',
                    boxShadow: isHighlighted ? '0 0 20px rgba(56, 189, 248, 0.15)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--accent)',
                          backgroundColor: 'rgba(56, 189, 248, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {item.date || item.year}
                      </span>
                      {isTurning && (
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            color: 'var(--accent-warm)',
                            backgroundColor: 'rgba(251, 146, 60, 0.12)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid rgba(251, 146, 60, 0.3)',
                          }}
                        >
                          TURNING POINT
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: 'var(--font-mono)',
                        color: impactColor,
                        fontWeight: 600,
                      }}
                    >
                      {item.impact || 'MEDIUM'} IMPACT
                    </span>
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    {item.event}
                  </h4>

                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '12px',
                    }}
                  >
                    {item.what}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--border)',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item.who && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={13} style={{ color: 'var(--accent-2)' }} />
                        <strong style={{ color: 'var(--text-secondary)' }}>Architects:</strong> {item.who}
                      </span>
                    )}
                    {item.why && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <HelpCircle size={13} style={{ color: 'var(--accent-3)' }} />
                        <strong style={{ color: 'var(--text-secondary)' }}>Significance:</strong> {item.why}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
