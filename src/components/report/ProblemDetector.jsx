// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ProblemDetector Component (Section 8)
// Critical Vulnerabilities, Bottlenecks, Risks & Gaps
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { AlertTriangle, ShieldAlert, CheckCircle, AlertCircle } from 'lucide-react';
import { EvidenceTag } from '../common/EvidenceTag';

export function ProblemDetector({ problems = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  if (!problems || problems.length === 0) return null;

  const categories = ['ALL', ...new Set(problems.map(p => p.category || 'General'))];

  const filtered = activeCategory === 'ALL'
    ? problems
    : problems.filter(p => (p.category || 'General') === activeCategory);

  return (
    <SectionWrapper
      id="sec-problems"
      sectionNum="10"
      title="Problem Detector & Structural Gaps"
      subtitle="Critical technical bottlenecks, ethical challenges, economic externalities, and safety risks"
      icon={AlertTriangle}
      badgeType="analysis"
      badgeLabel="VULNERABILITY AUDIT"
      action={
        categories.length > 2 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`tag ${activeCategory === cat ? 'active' : ''}`}
                style={{ fontSize: '11px', padding: '3px 8px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        )
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map((prob, idx) => {
          const isHigh = prob.severity === 'high';
          const sevColor = isHigh ? 'var(--negative)' : 'var(--warning)';

          return (
            <div
              key={prob.id || idx}
              className="glass-card hover-card"
              style={{
                padding: '20px 24px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              {/* Header: Category + Severity + Evidence */}
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
                      color: 'var(--accent-warm)',
                      backgroundColor: 'rgba(251, 146, 60, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {prob.category?.toUpperCase() || 'CHALLENGE'}
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono)',
                      color: sevColor,
                      backgroundColor: `${sevColor}15`,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                  >
                    {prob.severity?.toUpperCase()} SEVERITY
                  </span>
                </div>

                <EvidenceTag level={prob.evidenceStrength || 'high'} />
              </div>

              {/* Problem Title */}
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                {prob.title}
              </h4>

              {/* Description */}
              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '14px',
                }}
              >
                {prob.description}
              </p>

              {/* Evidence statement */}
              {prob.evidence && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface-2)',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>Documented Evidence:</strong>
                  {prob.evidence}
                </div>
              )}

              {/* Affected + Solutions + Gaps */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '12px',
                }}
              >
                {/* Affected groups */}
                {prob.affected && prob.affected.length > 0 && (
                  <div>
                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      AFFECTED POPULATIONS
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {prob.affected.map(g => (
                        <span key={g} className="tag" style={{ fontSize: '11px' }}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proposed Solutions */}
                {prob.solutions && prob.solutions.length > 0 && (
                  <div>
                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--positive)', display: 'block', marginBottom: '4px' }}>
                      CURRENT MITIGATIONS
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {prob.solutions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Unresolved Gaps */}
                {prob.gaps && (
                  <div>
                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--negative)', display: 'block', marginBottom: '4px' }}>
                      REMAINING GAPS
                    </span>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {prob.gaps}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
