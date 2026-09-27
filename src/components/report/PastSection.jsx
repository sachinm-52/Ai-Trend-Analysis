// ═══════════════════════════════════════════════════
// AI Trend Analyzer — PastSection Component
// ⏳ PAST: Origin, People, Orgs, Timeline, Turning Points
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Clock, Users, Building2, GitBranch, Milestone, ChevronDown, ChevronUp, User, Calendar } from 'lucide-react';

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

function OriginCard({ origin }) {
  if (!origin) return null;
  return (
    <div className="glass-card" style={{
      padding: '22px 24px',
      border: '1px solid var(--border)',
      backgroundColor: 'var(--bg-surface)',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '20px',
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(56,189,248,0.15))',
        border: '1px solid rgba(167,139,250,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <GitBranch size={22} style={{ color: 'var(--accent-2)' }} />
      </div>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {origin.period && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
              color: 'var(--accent-2)', backgroundColor: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.25)', padding: '3px 10px', borderRadius: '4px',
            }}>
              {origin.period}
            </span>
          )}
          {origin.location && (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📍 {origin.location}
            </span>
          )}
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Origin
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
          {origin.description}
        </p>
      </div>
    </div>
  );
}

function PeopleGrid({ people = [] }) {
  if (!people.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
      {people.map((person, idx) => (
        <div key={idx} className="glass-card hover-card" style={{
          padding: '16px 18px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(56,189,248,0.15))',
              border: '1px solid rgba(167,139,250,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 700, color: 'var(--accent-2)',
              fontFamily: 'var(--font-display)',
            }}>
              {person.name?.[0] || <User size={18} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                {person.name}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--accent-2)', marginBottom: '2px', fontWeight: 500 }}>
                {person.role}
              </div>
              {person.org && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {person.org}
                </div>
              )}
              {person.period && (
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent)',
                  backgroundColor: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)',
                  padding: '1px 6px', borderRadius: '3px',
                }}>
                  {person.period}
                </span>
              )}
            </div>
          </div>
          {person.contribution && (
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)', marginBottom: 0 }}>
              {person.contribution}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function OrgsGrid({ orgs = [] }) {
  if (!orgs.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
      {orgs.map((org, idx) => (
        <div key={idx} className="glass-card hover-card" style={{
          padding: '16px 18px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Building2 size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {org.name}
              </div>
              {org.period && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {org.period}
                </div>
              )}
            </div>
          </div>
          {org.type && (
            <span style={{
              fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'var(--accent-warm)', backgroundColor: 'rgba(251,146,60,0.1)',
              border: '1px solid rgba(251,146,60,0.25)', padding: '1px 6px', borderRadius: '3px',
              textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block',
            }}>
              {org.type}
            </span>
          )}
          {org.role && (
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: '8px', marginBottom: 0 }}>
              {org.role}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function TurningPoints({ points = [] }) {
  if (!points.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {points.map((pt, idx) => (
        <div key={idx} className="glass-card hover-card" style={{
          padding: '16px 20px',
          border: '1px solid rgba(251,146,60,0.25)',
          backgroundColor: 'rgba(251,146,60,0.04)',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            flexShrink: 0, padding: '6px 10px', borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--accent-warm)',
            lineHeight: 1.2, textAlign: 'center', minWidth: '48px',
          }}>
            {pt.year}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {pt.event}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 0 }}>
              {pt.significance}
            </p>
            {pt.entities && pt.entities.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {pt.entities.map((e, i) => (
                  <span key={i} style={{
                    fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--bg-surface-2)', border: '1px solid var(--border)',
                    padding: '2px 7px', borderRadius: '4px',
                  }}>
                    {e}
                  </span>
                ))}
              </div>
            )}
          </div>
          <Milestone size={16} style={{ color: 'var(--accent-warm)', flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
}

function VerticalTimeline({ timeline = [] }) {
  const [filterTurning, setFilterTurning] = useState(false);
  const list = filterTurning ? timeline.filter(t => t.turningPoint) : timeline;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setFilterTurning(p => !p)}
          className={`btn ${filterTurning ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '12px', padding: '5px 12px' }}
        >
          {filterTurning ? '⭐ Turning Points Only' : 'All Events'}
        </button>
      </div>
      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        <div style={{
          position: 'absolute', left: '9px', top: '8px', bottom: '24px',
          width: '2px', background: 'linear-gradient(to bottom, rgba(167,139,250,0.5), rgba(56,189,248,0.3))',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {list.map((item, idx) => {
            const isTurning = item.turningPoint;
            const impactColor = item.impact === 'HIGH' ? 'var(--accent-warm)' : 'var(--accent)';

            return (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Node */}
                <div style={{
                  position: 'absolute', left: '-28px', top: '18px',
                  width: isTurning ? '18px' : '12px',
                  height: isTurning ? '18px' : '12px',
                  borderRadius: '50%',
                  backgroundColor: isTurning ? 'var(--accent-warm)' : 'var(--bg-surface-3)',
                  border: `2px solid ${isTurning ? 'var(--accent-warm)' : 'var(--border-bright)'}`,
                  boxShadow: isTurning ? '0 0 12px rgba(251,146,60,0.4)' : 'none',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                }} />

                <div className="glass-card hover-card" style={{
                  padding: '16px 20px',
                  border: `1px solid ${isTurning ? 'rgba(251,146,60,0.3)' : 'var(--border)'}`,
                  backgroundColor: isTurning ? 'rgba(251,146,60,0.04)' : 'var(--bg-surface)',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--accent)',
                        backgroundColor: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
                        padding: '2px 8px', borderRadius: '4px',
                      }}>
                        {item.date || item.year}
                      </span>
                      {isTurning && (
                        <span style={{
                          fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                          color: 'var(--accent-warm)', backgroundColor: 'rgba(251,146,60,0.12)',
                          border: '1px solid rgba(251,146,60,0.3)', padding: '2px 6px', borderRadius: '4px',
                        }}>
                          TURNING POINT
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: impactColor, fontWeight: 600 }}>
                      {item.impact || 'MEDIUM'} IMPACT
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {item.event}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: item.who || item.why ? '10px' : 0 }}>
                    {item.what}
                  </p>

                  {(item.who || item.why) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}>
                      {item.who && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={12} style={{ color: 'var(--accent-2)' }} />
                          <strong style={{ color: 'var(--text-secondary)' }}>Architects:</strong> {item.who}
                        </span>
                      )}
                      {item.why && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: 'var(--accent-3)' }}>💡</span>
                          <strong style={{ color: 'var(--text-secondary)' }}>Significance:</strong> {item.why}
                        </span>
                      )}
                      {item.source && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                            Source: {item.source}
                          </span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SubSectionHeader({ icon: Icon, label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', marginTop: '28px' }}>
      {Icon && <Icon size={18} style={{ color }} />}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
        {label}
      </h3>
    </div>
  );
}

export function PastSection({ report }) {
  const past = report?.past;
  const timeline = report?.timeline || [];
  const people = past?.importantPeople || report?.people || [];
  const orgs = past?.importantOrgs || [];
  const turningPoints = past?.turningPoints || [];
  const discoveries = report?.deepDiscovery || [];

  const hasPastContent = past || timeline.length > 0 || people.length > 0;
  if (!hasPastContent) return null;

  return (
    <section>
      <SectionDivider
        id="sec-past"
        emoji="⏳"
        label="PAST — Where Did It Come From?"
        color="var(--accent-2)"
      />

      {/* Origin */}
      {past?.origin && (
        <>
          <SubSectionHeader icon={GitBranch} label="Origin" color="var(--accent-2)" />
          <OriginCard origin={past.origin} />
        </>
      )}

      {/* Important People */}
      {people.length > 0 && (
        <>
          <SubSectionHeader icon={Users} label="Important People" color="var(--accent-2)" />
          <PeopleGrid people={people} />
        </>
      )}

      {/* Important Organizations */}
      {orgs.length > 0 && (
        <>
          <SubSectionHeader icon={Building2} label="Important Organizations" color="var(--accent)" />
          <OrgsGrid orgs={orgs} />
        </>
      )}

      {/* Major Turning Points */}
      {turningPoints.length > 0 && (
        <>
          <SubSectionHeader icon={Milestone} label="Major Turning Points" color="var(--accent-warm)" />
          <TurningPoints points={turningPoints} />
        </>
      )}

      {/* Historical Timeline */}
      {timeline.length > 0 && (
        <>
          <SubSectionHeader icon={Calendar} label="Historical Timeline" color="var(--accent)" />
          <VerticalTimeline timeline={timeline} />
        </>
      )}

      {/* Interesting Discoveries */}
      {discoveries.length > 0 && (
        <>
          <SubSectionHeader
            icon={null}
            label="⚡ Interesting Discoveries"
            color="var(--accent-2)"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {discoveries.map((d, idx) => (
              <div key={idx} className="glass-card hover-card" style={{
                padding: '18px 20px',
                border: '1px solid rgba(167,139,250,0.25)',
                backgroundColor: 'rgba(167,139,250,0.04)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, var(--accent-2), var(--accent))',
                }} />
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-2)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {d.type || 'Discovery'}
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '6px 0 8px' }}>
                  {d.title}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: d.whyInteresting ? '10px' : 0 }}>
                  {d.description}
                </p>
                {d.whyInteresting && (
                  <div style={{
                    padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
                    fontSize: '12px', color: 'var(--text-secondary)',
                  }}>
                    <strong style={{ color: 'var(--accent-2)' }}>Why this matters: </strong>
                    {d.whyInteresting}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
