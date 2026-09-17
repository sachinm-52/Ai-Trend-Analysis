// ═══════════════════════════════════════════════════
// AI Trend Analyzer — PeopleExplorer Component (Section 5)
// Key Individuals Shaping the Trend
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Users, Building, Award, Search } from 'lucide-react';
import { Badge } from '../common/Badge';

export function PeopleExplorer({ people = [] }) {
  const [search, setSearch] = useState('');

  if (!people || people.length === 0) return null;

  const filtered = people.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.org && p.org.toLowerCase().includes(search.toLowerCase())) ||
    (p.role && p.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <SectionWrapper
      id="sec-people"
      sectionNum="05"
      title="Key People & Architects"
      subtitle="The researchers, founders, executives, and pioneers driving this domain"
      icon={Users}
      badgeType="fact"
      badgeLabel="PROFILED INDIVIDUALS"
      action={
        people.length > 4 && (
          <div style={{ position: 'relative', width: '180px' }} className="hide-mobile">
            <input
              type="text"
              placeholder="Filter people..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base"
              style={{
                padding: '4px 8px 4px 28px',
                fontSize: '11.5px',
                height: '28px',
              }}
            />
            <Search size={12} style={{ position: 'absolute', left: '8px', top: '8px', color: 'var(--text-muted)' }} />
          </div>
        )
      }
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {filtered.map((person, idx) => {
          const isHigh = person.influence === 'very high' || person.influence === 'high';
          const influenceColor = isHigh ? 'var(--accent)' : 'var(--accent-2)';

          return (
            <div
              key={person.name || idx}
              className="glass-card hover-card"
              style={{
                padding: '20px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header: Avatar + Meta */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--bg-surface-3) 0%, var(--border-bright) 100%)',
                      border: '1px solid var(--border-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      flexShrink: 0,
                    }}
                  >
                    {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '16px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        {person.name}
                      </h4>
                    </div>

                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--accent)',
                        fontWeight: 500,
                        margin: '2px 0 0 0',
                      }}
                    >
                      {person.role}
                    </p>

                    {person.org && (
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '2px',
                        }}
                      >
                        <Building size={11} />
                        {person.org}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contribution */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: '0 0 14px 0',
                  }}
                >
                  {person.contribution}
                </p>
              </div>

              {/* Bottom tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={12} style={{ color: influenceColor }} />
                  INFLUENCE
                </span>
                <span
                  style={{
                    color: influenceColor,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {person.influence || 'HIGH'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
