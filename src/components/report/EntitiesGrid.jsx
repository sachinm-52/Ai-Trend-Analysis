// ═══════════════════════════════════════════════════
// AI Trend Analyzer — EntitiesGrid Component (Section 5)
// Organizations, Companies, Labs, and Technologies
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Building2, Cpu, Link as LinkIcon, Package } from 'lucide-react';
import { Badge } from '../common/Badge';

export function EntitiesGrid({ entities = [] }) {
  if (!entities || entities.length === 0) return null;

  return (
    <SectionWrapper
      id="sec-entities"
      sectionNum="06"
      title="Organizations, Labs & Core Tech"
      subtitle="The corporate entities, research labs, open-source projects, and technical architectures"
      icon={Building2}
      badgeType="fact"
      badgeLabel="VERIFIED ENTITIES"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {entities.map((ent, idx) => {
          const isTech = ent.type === 'technology';
          const Icon = isTech ? Cpu : Building2;
          const typeColor = isTech ? 'var(--accent-2)' : 'var(--accent)';

          return (
            <div
              key={ent.name || idx}
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
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-surface-3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: typeColor,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '16px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        {ent.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {ent.industry || ent.type}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: `${typeColor}15`,
                      color: typeColor,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {ent.type || 'ENTITY'}
                  </span>
                </div>

                {/* Role Description */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '14px',
                  }}
                >
                  {ent.role}
                </p>

                {/* Products / Offerings */}
                {ent.products && ent.products.length > 0 && (
                  <div style={{ marginBottom: '14px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '6px',
                      }}
                    >
                      <Package size={11} /> KEY PRODUCTS / INVENTIONS
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {ent.products.map((p) => (
                        <span
                          key={p}
                          style={{
                            fontSize: '11px',
                            backgroundColor: 'var(--bg-surface-2)',
                            color: 'var(--text-primary)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Relationship to Trend */}
              {ent.relationship && (
                <div
                  style={{
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border)',
                    fontSize: '11.5px',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <LinkIcon size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{ent.relationship}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
