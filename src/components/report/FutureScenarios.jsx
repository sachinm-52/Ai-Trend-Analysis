// ═══════════════════════════════════════════════════
// AI Trend Analyzer — FutureScenarios Component (Section 12)
// Forward-Looking Scenario Modeling (Clearly Labeled as Analysis)
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { TrendingUp, Clock, AlertCircle, Sparkles, Compass } from 'lucide-react';
import { Badge } from '../common/Badge';

export function FutureScenarios({ futureScenarios }) {
  const [activeTab, setActiveTab] = useState('nearTerm');

  if (!futureScenarios) return null;

  const tabs = [
    { key: 'nearTerm', label: 'Near-Term (1–2 Yrs)', desc: 'Immediate inflection points & roadmap execution' },
    { key: 'mediumTerm', label: 'Medium-Term (3–5 Yrs)', desc: 'Market consolidation & paradigm maturation' },
    { key: 'longTerm', label: 'Long-Term (5–10+ Yrs)', desc: 'Structural societal shifts & frontier disruption' },
  ];

  const currentScenarios = futureScenarios[activeTab] || [];

  return (
    <SectionWrapper
      id="sec-future"
      sectionNum="13"
      title="Future Scenarios & Trajectory Analysis"
      subtitle="Structured probabilistic forecasting based on observable signals, assumptions, and trigger events"
      icon={TrendingUp}
      badgeType="scenario"
      badgeLabel="PROBABILISTIC SCENARIOS"
      action={
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-2)',
            backgroundColor: 'rgba(167, 139, 250, 0.1)',
            padding: '3px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(167, 139, 250, 0.25)',
          }}
          className="hide-mobile"
        >
          NOTE: AI ANALYSIS · NOT GUARANTEED FACTS
        </span>
      }
    >
      {/* Time Horizon Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '12.5px', padding: '7px 16px' }}
          >
            <Clock size={13} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Scenarios Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {currentScenarios.map((scen, idx) => {
          const isRisk = scen.type === 'risk';
          const isDisruption = scen.type === 'disruption';
          const typeColor = isRisk ? 'var(--negative)' : isDisruption ? 'var(--accent-2)' : 'var(--positive)';

          return (
            <div
              key={idx}
              className="glass-card hover-card"
              style={{
                padding: '22px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header tags */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: typeColor,
                      backgroundColor: `${typeColor}15`,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {scen.type?.toUpperCase() || 'GROWTH'} SCENARIO
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    UNCERTAINTY: <strong style={{ color: 'var(--text-secondary)' }}>{scen.uncertainty?.toUpperCase() || 'MEDIUM'}</strong>
                  </span>
                </div>

                {/* Scenario Title */}
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    lineHeight: '1.3',
                  }}
                >
                  {scen.scenario}
                </h4>

                {/* Impact Statement */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '14px',
                  }}
                >
                  {scen.impact}
                </p>

                {/* Supporting Signals */}
                {scen.signals && scen.signals.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                      OBSERVABLE SIGNALS:
                    </span>
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {scen.signals.map((sig, i) => (
                        <li key={i}>{sig}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Catalyst trigger */}
              {scen.trigger && (
                <div
                  style={{
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border)',
                    fontSize: '11.5px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <strong style={{ color: 'var(--accent-warm)' }}>Catalyst Trigger: </strong>
                  <span>{scen.trigger}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
