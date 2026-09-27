// ═══════════════════════════════════════════════════
// AI Trend Intelligence — Time Machine Component
// Interactive historical timeline slider with era-specific
// events, people, organizations, and products
// ═══════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import { Clock, User, Building2, Zap, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

function groupTimelineByEra(timeline = []) {
  if (!timeline.length) return [];
  const sorted = [...timeline].sort((a, b) => {
    const ya = parseInt(a.year || a.date || '0');
    const yb = parseInt(b.year || b.date || '0');
    return ya - yb;
  });
  return sorted;
}

function EraSlider({ eras, selectedIdx, onChange }) {
  return (
    <div style={{ position: 'relative', padding: '20px 0 10px' }}>
      {/* Track */}
      <div style={{
        position: 'relative',
        height: '4px',
        backgroundColor: 'var(--bg-surface-3)',
        borderRadius: '2px',
        margin: '0 20px',
      }}>
        {/* Fill */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: `${eras.length > 1 ? (selectedIdx / (eras.length - 1)) * 100 : 100}%`,
          background: 'linear-gradient(90deg, var(--accent-2), var(--accent))',
          borderRadius: '2px',
          transition: 'width 0.3s ease',
        }} />
        {/* Nodes */}
        {eras.map((era, idx) => {
          const isSelected = idx === selectedIdx;
          const isBefore = idx <= selectedIdx;
          const position = eras.length > 1 ? (idx / (eras.length - 1)) * 100 : 50;
          return (
            <button
              key={idx}
              onClick={() => onChange(idx)}
              title={era.year || era.date}
              style={{
                position: 'absolute',
                left: `${position}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: isSelected ? '20px' : '12px',
                height: isSelected ? '20px' : '12px',
                borderRadius: '50%',
                backgroundColor: isSelected ? 'var(--accent)' : isBefore ? 'var(--accent-2)' : 'var(--bg-surface-3)',
                border: isSelected ? '3px solid var(--accent)' : `2px solid ${isBefore ? 'var(--accent-2)' : 'var(--border-bright)'}`,
                boxShadow: isSelected ? '0 0 16px rgba(56,189,248,0.6)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: isSelected ? 3 : 2,
              }}
            />
          );
        })}
      </div>

      {/* Year labels (show 5 evenly spaced) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 16px' }}>
        {eras.filter((_, i) => {
          const step = Math.max(1, Math.floor(eras.length / 5));
          return i === 0 || i === eras.length - 1 || i % step === 0;
        }).map((era, i) => (
          <span key={i} style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
          }}>
            {era.year || era.date?.slice(0, 4)}
          </span>
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const impactColors = {
    HIGH: { text: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)' },
    MEDIUM: { text: 'var(--accent)', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
    LOW: { text: 'var(--text-muted)', bg: 'var(--bg-surface-2)', border: 'var(--border)' },
  };
  const c = impactColors[event.impact] || impactColors.MEDIUM;

  return (
    <div style={{
      padding: '20px 22px',
      borderRadius: '12px',
      border: event.turningPoint ? '1px solid rgba(251,146,60,0.4)' : '1px solid var(--border)',
      backgroundColor: event.turningPoint ? 'rgba(251,146,60,0.04)' : 'var(--bg-surface)',
      boxShadow: event.turningPoint ? '0 4px 24px rgba(251,146,60,0.1)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '6px',
          backgroundColor: 'rgba(56,189,248,0.1)',
          border: '1px solid rgba(56,189,248,0.2)',
        }}>
          <Calendar size={12} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
            {event.date || event.year}
          </span>
        </div>
        {event.turningPoint && (
          <span style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
            color: '#fb923c', backgroundColor: 'rgba(251,146,60,0.12)',
            border: '1px solid rgba(251,146,60,0.3)', padding: '3px 8px', borderRadius: '5px',
          }}>
            ⭐ TURNING POINT
          </span>
        )}
        <span style={{
          fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
          color: c.text, backgroundColor: c.bg, border: `1px solid ${c.border}`,
          padding: '3px 8px', borderRadius: '5px', marginLeft: 'auto',
        }}>
          {event.impact || 'MEDIUM'} IMPACT
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700,
        color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.3,
      }}>
        {event.event}
      </h3>

      {event.what && (
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 14px' }}>
          {event.what}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {event.who && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '10px 12px', borderRadius: '8px',
            backgroundColor: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
          }}>
            <User size={14} style={{ color: 'var(--accent-2)', flexShrink: 0, marginTop: '1px' }} />
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-2)', fontWeight: 700, marginBottom: '3px' }}>
                ARCHITECTS
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {event.who}
              </div>
            </div>
          </div>
        )}
        {event.why && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '10px 12px', borderRadius: '8px',
            backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)',
          }}>
            <Zap size={14} style={{ color: '#22c55e', flexShrink: 0, marginTop: '1px' }} />
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#22c55e', fontWeight: 700, marginBottom: '3px' }}>
                SIGNIFICANCE
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {event.why}
              </div>
            </div>
          </div>
        )}
      </div>

      {event.source && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Source: {event.source}
          </span>
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '10.5px', color: 'var(--accent)', textDecoration: 'none' }}
            >
              →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function TimeMachine({ report }) {
  const timeline = useMemo(() => groupTimelineByEra(report?.timeline || []), [report]);
  const [selectedIdx, setSelectedIdx] = useState(Math.max(0, timeline.length - 1));

  if (!timeline.length) return null;

  const currentEvent = timeline[selectedIdx];
  const hasPrev = selectedIdx > 0;
  const hasNext = selectedIdx < timeline.length - 1;

  return (
    <SectionWrapper
      id="sec-time-machine"
      sectionNum="05"
      title="Time Machine"
      subtitle="Slide through history — explore each turning point, event, and era in chronological order"
      icon={Clock}
      badgeType="verified"
      badgeLabel="HISTORICAL TIMELINE"
    >
      {/* Slider */}
      <EraSlider eras={timeline} selectedIdx={selectedIdx} onChange={setSelectedIdx} />

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', marginTop: '8px' }}>
        <button
          onClick={() => setSelectedIdx(i => Math.max(0, i - 1))}
          disabled={!hasPrev}
          className="btn btn-secondary"
          style={{ fontSize: '12px', padding: '7px 14px', gap: '6px', opacity: hasPrev ? 1 : 0.4 }}
        >
          <ChevronLeft size={14} /> Earlier
        </button>

        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Event {selectedIdx + 1} of {timeline.length}
        </span>

        <button
          onClick={() => setSelectedIdx(i => Math.min(timeline.length - 1, i + 1))}
          disabled={!hasNext}
          className="btn btn-secondary"
          style={{ fontSize: '12px', padding: '7px 14px', gap: '6px', opacity: hasNext ? 1 : 0.4 }}
        >
          Later <ChevronRight size={14} />
        </button>
      </div>

      {/* Current event card */}
      {currentEvent && (
        <div key={selectedIdx} style={{ animation: 'fadeIn 0.25s ease' }}>
          <EventCard event={currentEvent} />
        </div>
      )}

      {/* Mini timeline overview */}
      <div style={{
        marginTop: '24px',
        padding: '16px 18px',
        borderRadius: '10px',
        backgroundColor: 'var(--bg-surface-2)',
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>
          TIMELINE OVERVIEW — {timeline.length} EVENTS
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {timeline.map((event, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              title={`${event.year || event.date}: ${event.event}`}
              style={{
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: idx === selectedIdx ? 700 : 400,
                color: idx === selectedIdx ? 'var(--accent)' : event.turningPoint ? '#fb923c' : 'var(--text-muted)',
                backgroundColor: idx === selectedIdx ? 'rgba(56,189,248,0.12)' : 'transparent',
                border: idx === selectedIdx ? '1px solid rgba(56,189,248,0.3)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {event.year || event.date?.slice(0, 4)}
              {event.turningPoint ? ' ⭐' : ''}
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
