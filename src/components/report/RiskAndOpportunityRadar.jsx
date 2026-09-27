// ═══════════════════════════════════════════════════
// AI Trend Intelligence — Risk & Opportunity Radar
// 8-factor Risk Radar + 6-factor Opportunity Radar
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Shield, Zap, Target, Code2 } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

const RISK_COLORS = [
  { text: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' },
  { text: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)' },
  { text: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.25)' },
  { text: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' },
  { text: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)' },
  { text: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
  { text: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)' },
  { text: '#e879f9', bg: 'rgba(232,121,249,0.08)', border: 'rgba(232,121,249,0.25)' },
];

const OPP_COLORS = [
  { text: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' },
  { text: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)' },
  { text: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
  { text: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)' },
  { text: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.25)' },
  { text: '#e879f9', bg: 'rgba(232,121,249,0.08)', border: 'rgba(232,121,249,0.25)' },
];

const DIFFICULTY_COLORS = {
  'high': '#ef4444',
  'medium': '#f97316',
  'low': '#22c55e',
};

function RiskCard({ risk, idx, onExpand, expanded }) {
  const c = RISK_COLORS[idx % RISK_COLORS.length];
  return (
    <div style={{
      borderRadius: '12px',
      border: `1px solid ${c.border}`,
      backgroundColor: c.bg,
      overflow: 'hidden',
      transition: 'all 0.2s ease',
    }}>
      <button
        onClick={onExpand}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '16px 18px',
          display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left',
        }}
      >
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          backgroundColor: `${c.text}22`,
          border: `1px solid ${c.text}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: c.text,
        }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
            {risk.category && (
              <span style={{
                fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                color: c.text, textTransform: 'uppercase',
              }}>
                {risk.category}
              </span>
            )}
            {expanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
          </div>
          <h4 style={{
            fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700,
            color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
          }}>
            {risk.problem || risk.title}
          </h4>
        </div>
      </button>

      {expanded && (
        <div style={{ padding: '0 18px 16px', borderTop: '1px solid var(--border)' }}>
          {risk.evidence && (
            <div style={{ marginTop: '12px', marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                EVIDENCE
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {risk.evidence}
              </p>
            </div>
          )}
          {risk.affected && risk.affected.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                WHO'S AFFECTED
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {risk.affected.map((a, i) => (
                  <span key={i} style={{
                    fontSize: '11px', color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-surface-2)', border: '1px solid var(--border)',
                    padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)',
                  }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
          {risk.mitigation && (
            <div style={{
              padding: '10px 12px', borderRadius: '8px',
              backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)',
              display: 'flex', gap: '8px', alignItems: 'flex-start',
            }}>
              <Shield size={13} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#22c55e', fontWeight: 700, marginBottom: '3px' }}>
                  MITIGATION
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {risk.mitigation}
                </p>
              </div>
            </div>
          )}
          {risk.openQuestion && (
            <p style={{
              fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic',
              margin: '10px 0 0', lineHeight: 1.5,
            }}>
              🤔 Open question: {risk.openQuestion}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function OpportunityCard({ opp, idx }) {
  const [expanded, setExpanded] = useState(false);
  const c = OPP_COLORS[idx % OPP_COLORS.length];
  const diffColor = DIFFICULTY_COLORS[opp.difficulty?.toLowerCase()] || '#f97316';

  return (
    <div style={{
      borderRadius: '12px',
      border: `1px solid ${c.border}`,
      backgroundColor: c.bg,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '16px 18px',
          display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left',
        }}
      >
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          backgroundColor: `${c.text}22`,
          border: `1px solid ${c.text}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: c.text,
        }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {opp.type && (
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: c.text, textTransform: 'uppercase',
                }}>
                  {opp.type}
                </span>
              )}
              {opp.difficulty && (
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: diffColor,
                }}>
                  · {opp.difficulty.toUpperCase()} DIFFICULTY
                </span>
              )}
            </div>
            {expanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
          </div>
          <h4 style={{
            fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700,
            color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
          }}>
            {opp.problem || opp.solution}
          </h4>
        </div>
      </button>

      {expanded && (
        <div style={{ padding: '0 18px 16px', borderTop: '1px solid var(--border)' }}>
          {opp.solution && opp.solution !== opp.problem && (
            <div style={{ marginTop: '12px', marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                SOLUTION CONCEPT
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {opp.solution}
              </p>
            </div>
          )}
          {opp.targetUser && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '10px' }}>
              <Target size={13} style={{ color: c.text, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '3px' }}>
                  TARGET USER
                </div>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{opp.targetUser}</span>
              </div>
            </div>
          )}
          {opp.tech && opp.tech.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Code2 size={10} /> TECH STACK
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {opp.tech.map((t, i) => (
                  <span key={i} style={{
                    fontSize: '11px', color: c.text,
                    backgroundColor: `${c.text}10`, border: `1px solid ${c.border}`,
                    padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {opp.whyNow && (
            <div style={{
              padding: '10px 12px', borderRadius: '8px',
              backgroundColor: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)',
              display: 'flex', gap: '8px', alignItems: 'flex-start',
            }}>
              <Zap size={13} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700, marginBottom: '3px' }}>
                  WHY NOW
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {opp.whyNow}
                </p>
              </div>
            </div>
          )}
          {opp.openGap && (
            <p style={{
              fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic',
              margin: '10px 0 0', lineHeight: 1.5,
            }}>
              🔍 Open gap: {opp.openGap}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function RiskAndOpportunityRadar({ report }) {
  const risks = report?.riskRadar || report?.problems || [];
  const opportunities = report?.opportunityRadar || report?.opportunities || [];
  const [activeTab, setActiveTab] = useState('risk');
  const [expandedRisk, setExpandedRisk] = useState(null);

  if (!risks.length && !opportunities.length) return null;

  return (
    <SectionWrapper
      id="sec-risk-radar"
      sectionNum="08"
      title="Risk & Opportunity Radar"
      subtitle="Evidence-backed risk analysis and builder opportunities emerging from this topic"
      icon={AlertTriangle}
      badgeType="analysis"
      badgeLabel="STRATEGIC INTELLIGENCE"
    >
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
        <button
          onClick={() => setActiveTab('risk')}
          style={{
            padding: '10px 18px',
            fontSize: '13px', fontWeight: 700,
            color: activeTab === 'risk' ? '#ef4444' : 'var(--text-muted)',
            background: 'none', border: 'none',
            borderBottom: activeTab === 'risk' ? '2px solid #ef4444' : '2px solid transparent',
            cursor: 'pointer', fontFamily: 'var(--font-display)',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'color 0.2s', marginBottom: '-1px',
          }}
        >
          <AlertTriangle size={14} />
          Risk Radar ({risks.length})
        </button>
        <button
          onClick={() => setActiveTab('opportunity')}
          style={{
            padding: '10px 18px',
            fontSize: '13px', fontWeight: 700,
            color: activeTab === 'opportunity' ? '#22c55e' : 'var(--text-muted)',
            background: 'none', border: 'none',
            borderBottom: activeTab === 'opportunity' ? '2px solid #22c55e' : '2px solid transparent',
            cursor: 'pointer', fontFamily: 'var(--font-display)',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'color 0.2s', marginBottom: '-1px',
          }}
        >
          <TrendingUp size={14} />
          Opportunities ({opportunities.length})
        </button>
      </div>

      {activeTab === 'risk' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {risks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              No specific risk data documented for this topic.
            </div>
          ) : (
            risks.map((risk, idx) => (
              <RiskCard
                key={idx}
                risk={risk}
                idx={idx}
                expanded={expandedRisk === idx}
                onExpand={() => setExpandedRisk(expandedRisk === idx ? null : idx)}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'opportunity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {opportunities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              No specific opportunity data documented for this topic.
            </div>
          ) : (
            opportunities.map((opp, idx) => (
              <OpportunityCard key={idx} opp={opp} idx={idx} />
            ))
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
