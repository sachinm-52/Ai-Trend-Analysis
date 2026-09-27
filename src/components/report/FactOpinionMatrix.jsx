// ═══════════════════════════════════════════════════
// AI Trend Intelligence — FactOpinionMatrix Component
// Fact vs Analysis vs Opinion vs Unconfirmed (Requirement #13)
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { CheckCircle2, LineChart, MessageSquareQuote, HelpCircle, ExternalLink } from 'lucide-react';
import { stripHtml } from '../../utils/formatters';

export function FactOpinionMatrix({ factVsOpinion = {} }) {
  const [activeTab, setActiveTab] = useState('facts');

  const {
    facts = [],
    analysis = [],
    opinions = [],
    unconfirmed = [],
  } = factVsOpinion;

  const TABS = [
    {
      id: 'facts',
      label: 'Verified Facts',
      count: facts.length,
      icon: CheckCircle2,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.3)',
      desc: 'Directly corroborated by primary official documentation, regulatory filings, or multi-source press reports.',
    },
    {
      id: 'analysis',
      label: 'Evidence-Based Analysis',
      count: analysis.length,
      icon: LineChart,
      color: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.12)',
      border: 'rgba(14, 165, 233, 0.3)',
      desc: 'Logical implications, market synthesis, and structural interpretations derived from the collected evidence.',
    },
    {
      id: 'opinions',
      label: 'Attributed Opinions',
      count: opinions.length,
      icon: MessageSquareQuote,
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.12)',
      border: 'rgba(139, 92, 246, 0.3)',
      desc: 'Stated perspectives, forecasts, and public commentary attributed to named leaders, executives, or analysts.',
    },
    {
      id: 'unconfirmed',
      label: 'Unconfirmed / Rumors',
      count: unconfirmed.length,
      icon: HelpCircle,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.3)',
      desc: 'Emerging claims lacking multi-source corroboration or official verification. Never presented as facts.',
    },
  ];

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 28px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface)',
        marginBottom: '28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            ⚖️ Fact vs. Opinion & Analysis Matrix
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Strict epistemic segregation: facts are never conflated with opinions or speculation
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '18px', overflowX: 'auto' }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? tab.bg : 'transparent',
                border: `1px solid ${isActive ? tab.border : 'transparent'}`,
                color: isActive ? tab.color : 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              <span style={{
                fontSize: '10.5px',
                fontFamily: 'var(--font-mono)',
                padding: '2px 6px',
                borderRadius: '999px',
                backgroundColor: isActive ? tab.color : 'var(--bg-surface-2)',
                color: isActive ? '#0f172a' : 'var(--text-muted)',
                fontWeight: 700,
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Description */}
      <div style={{
        padding: '10px 14px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: currentTab.bg,
        border: `1px solid ${currentTab.border}`,
        fontSize: '12px',
        color: currentTab.color,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <currentTab.icon size={14} />
        <span>{currentTab.desc}</span>
      </div>

      {/* Tab Content List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activeTab === 'facts' && facts.map((item, idx) => {
          const cleanFact = stripHtml(item.fact);
          let cleanDetail = stripHtml(item.supportingDetail);

          // Remove duplicate headline in supporting detail if it starts with or matches the headline
          if (cleanDetail) {
            const normF = cleanFact.toLowerCase().replace(/[^a-z0-9]/g, '');
            const normD = cleanDetail.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (normD === normF || normD.startsWith(normF)) {
              const remaining = cleanDetail.slice(cleanFact.length).replace(/^[\s—\-:|,]+/, '').trim();
              cleanDetail = remaining.length > 5 ? remaining : '';
            }
          }

          const cleanSource = stripHtml(item.source);

          return (
            <div
              key={idx}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-2)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: cleanDetail ? '6px' : '0',
                  lineHeight: 1.45,
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                }}>
                  {cleanFact}
                </div>
                {cleanDetail && (
                  <div style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                  }}>
                    {cleanDetail}
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '80px' }}>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  display: 'block',
                  marginBottom: '4px',
                  maxWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {cleanSource}
                </span>
                {item.url && item.url !== '#' && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '11px', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '3px', textDecoration: 'none' }}
                  >
                    Verify <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {activeTab === 'analysis' && analysis.map((item, idx) => {
          const cleanInterp = stripHtml(item.interpretation);
          const cleanEv = stripHtml(item.evidence);
          const cleanSource = stripHtml(item.source);

          return (
            <div
              key={idx}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-2)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: cleanEv ? '6px' : '0',
                lineHeight: 1.45,
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }}>
                {cleanInterp}
              </div>
              {cleanEv && (
                <div style={{
                  fontSize: '12.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '6px',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                }}>
                  Evidence: {cleanEv}
                </div>
              )}
              {cleanSource && (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Reported by {cleanSource}
                </span>
              )}
            </div>
          );
        })}

        {activeTab === 'opinions' && opinions.map((item, idx) => {
          const cleanStmt = stripHtml(item.statement);
          const cleanAttr = stripHtml(item.attributedTo || item.source);

          return (
            <div
              key={idx}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-2)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <blockquote style={{
                margin: '0 0 8px 0',
                fontSize: '13.5px',
                color: 'var(--text-primary)',
                fontStyle: 'italic',
                lineHeight: 1.55,
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }}>
                "{cleanStmt}"
              </blockquote>
              <span style={{ fontSize: '11.5px', color: '#8b5cf6', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                Attributed to: {cleanAttr}
              </span>
            </div>
          );
        })}

        {activeTab === 'unconfirmed' && (
          unconfirmed.length > 0 ? unconfirmed.map((item, idx) => {
            const cleanClaim = stripHtml(item.claim || item);

            return (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#f59e0b',
                  marginBottom: '4px',
                  lineHeight: 1.45,
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                }}>
                  ⚠️ {cleanClaim}
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Status: Pending formal corroboration or company announcement.
                </span>
              </div>
            );
          }) : (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No unconfirmed rumors or speculation detected in current verified coverage.
            </div>
          )
        )}
      </div>
    </div>
  );
}
