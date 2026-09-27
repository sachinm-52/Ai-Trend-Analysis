// ═══════════════════════════════════════════════════
// AI Trend Analyzer — FutureSection Component
// 🔮 FUTURE: Scenarios, Signals, Timeline Possibilities
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { TrendingUp, Clock, AlertCircle, Zap, ArrowRight } from 'lucide-react';
import { FutureSignalsMobile } from './FutureSignals';

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

function SubSectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', marginTop: '28px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
        {label}
      </h3>
    </div>
  );
}

const SCENARIO_COLORS = {
  growth: { text: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' },
  risk: { text: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
  disruption: { text: 'var(--accent-2)', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
};

function ScenarioCard({ scenario }) {
  const [expanded, setExpanded] = useState(false);
  const colors = SCENARIO_COLORS[scenario.type] || SCENARIO_COLORS.growth;

  return (
    <div
      className="glass-card hover-card"
      style={{
        padding: '20px 22px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(p => !p)}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700,
            color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.border}`,
            padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase',
          }}>
            {scenario.type?.toUpperCase() || 'GROWTH'} SCENARIO
          </span>
          <span style={{
            fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
          }}>
            Uncertainty: <strong style={{ color: 'var(--text-secondary)' }}>{scenario.uncertainty?.toUpperCase() || 'MEDIUM'}</strong>
          </span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
          {scenario.horizon || ''}
        </span>
      </div>

      {/* Scenario title */}
      <h4 style={{
        fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600,
        color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
      }}>
        {scenario.scenario}
      </h4>

      {/* Impact */}
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
        {scenario.impact}
      </p>

      {/* Observable signals */}
      {scenario.signals && scenario.signals.length > 0 && (
        <div>
          <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>
            OBSERVABLE SIGNALS:
          </span>
          <ul style={{ margin: '5px 0 0', paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            {scenario.signals.map((sig, i) => <li key={i}>{sig}</li>)}
          </ul>
        </div>
      )}

      {/* Expanded details */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {scenario.opportunities && scenario.opportunities.length > 0 && (
            <div>
              <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#22c55e', fontWeight: 700 }}>
                ✅ OPPORTUNITIES:
              </span>
              <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {scenario.opportunities.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          )}
          {scenario.challenges && scenario.challenges.length > 0 && (
            <div>
              <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700 }}>
                ⚠️ CHALLENGES:
              </span>
              <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {scenario.challenges.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
          {scenario.trigger && (
            <div style={{
              padding: '10px 14px', borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface-2)', border: '1px solid var(--border)',
              fontSize: '12.5px', color: 'var(--text-secondary)',
            }}>
              <strong style={{ color: 'var(--accent-warm)' }}>Catalyst Trigger: </strong>
              {scenario.trigger}
            </div>
          )}
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
            Click to collapse
          </p>
        </div>
      )}

      {!expanded && (
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
          Click to see opportunities, challenges & catalyst →
        </p>
      )}
    </div>
  );
}

function HorizonSection({ title, icon, scenarios = [] }) {
  if (!scenarios || scenarios.length === 0) return null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
        <h4 style={{
          fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700,
          color: 'var(--text-primary)', margin: 0,
        }}>
          {title}
        </h4>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
        {scenarios.map((scen, idx) => <ScenarioCard key={idx} scenario={scen} />)}
      </div>
    </div>
  );
}

export function FutureSection({ report }) {
  const [activeTab, setActiveTab] = useState('nearTerm');

  // Support both new 'future' field and old 'futureScenarios' field
  const future = report?.future;
  const legacyScenarios = report?.futureScenarios;
  const earlySignals = report?.earlySignals || [];

  const nearTerm = future?.nearTerm || legacyScenarios?.nearTerm || [];
  const mediumTerm = future?.mediumTerm || legacyScenarios?.mediumTerm || [];
  const longTerm = future?.longTerm || legacyScenarios?.longTerm || [];
  const futureSignals = future?.futureSignals || [];

  const hasFutureContent = nearTerm.length > 0 || mediumTerm.length > 0 || longTerm.length > 0;
  if (!hasFutureContent && futureSignals.length === 0 && earlySignals.length === 0) return null;

  const tabs = [
    { key: 'nearTerm', label: '⏱ Near Future', sub: 'Next several months' },
    { key: 'mediumTerm', label: '📅 Medium Future', sub: '1–3 years' },
    { key: 'longTerm', label: '🔭 Long Term', sub: '3–10 years' },
  ];

  const currentScenarios = activeTab === 'nearTerm' ? nearTerm
    : activeTab === 'mediumTerm' ? mediumTerm
    : longTerm;

  return (
    <section style={{ marginTop: '48px' }}>
      <SectionDivider
        id="sec-future"
        emoji="🔮"
        label="FUTURE — What Could Happen Next?"
        color="var(--accent)"
      />

      {/* Disclaimer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px 16px', marginBottom: '24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(167,139,250,0.3)',
        backgroundColor: 'rgba(167,139,250,0.06)',
      }}>
        <AlertCircle size={16} style={{ color: 'var(--accent-2)', flexShrink: 0 }} />
        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
          <strong style={{ color: 'var(--accent-2)' }}>AI-generated scenario analysis</strong> — based on current observable signals and reasoning. These are possible futures, not predictions. Not confirmed information.
        </p>
      </div>

      {/* Scenario Tabs */}
      {hasFutureContent && (
        <>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12.5px', padding: '7px 16px', whiteSpace: 'nowrap' }}
              >
                <Clock size={13} />
                <span>{tab.label}</span>
                <span style={{ fontSize: '10px', color: activeTab === tab.key ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {tab.sub}
                </span>
              </button>
            ))}
          </div>

          {currentScenarios.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              {currentScenarios.map((scen, idx) => <ScenarioCard key={idx} scenario={scen} />)}
            </div>
          ) : (
            <div style={{
              padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)',
            }}>
              No scenarios generated for this time horizon.
            </div>
          )}
        </>
      )}

      {/* Future Signals */}
      {futureSignals.length > 0 && (
        <>
          <SubSectionHeader label="⚡ Future Signals — Observable Evidence" />
          <FutureSignalsMobile signals={futureSignals} />
        </>
      )}

      {/* Early / Weak Signals (legacy) */}
      {earlySignals.length > 0 && futureSignals.length === 0 && (
        <>
          <SubSectionHeader label="📡 Early Signals & Horizon Scanning" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {earlySignals.map((sig, idx) => (
              <div key={idx} style={{
                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(167,139,250,0.25)',
                backgroundColor: 'rgba(167,139,250,0.05)',
                fontSize: '13px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{sig.signal}</strong>
                  <span style={{
                    fontSize: '9.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-2)',
                    backgroundColor: 'rgba(167,139,250,0.15)', padding: '2px 6px', borderRadius: '3px',
                  }}>
                    {sig.confidence?.toUpperCase() || 'EARLY'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {sig.why}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
