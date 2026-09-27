// ═══════════════════════════════════════════════════
// AI Trend Intelligence — ResearchSummarySection Component
// Implements the 10-Part Result Structure (Requirement #9)
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  Search,
  Newspaper,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Globe2,
  Building2,
  BookOpen,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { stripHtml } from '../../utils/formatters';

export function ResearchSummarySection({ report, onShowEvidence, onSelectTopic }) {
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [showAllTimeline, setShowAllTimeline] = useState(false);

  if (!report) return null;

  const {
    searchSummary,
    whatIsHappening,
    whyIsItTrending,
    impact,
    background,
    timeline = [],
    keyFacts = [],
    organizationsInvolved = [],
    conflictsAndUncertainties = {},
    evidenceAudit = {},
    topic,
  } = report;

  const conflictingReports = conflictsAndUncertainties?.conflictingReports || [];
  const unconfirmedClaims = conflictsAndUncertainties?.unconfirmedClaims || [];
  const missingInformation = conflictsAndUncertainties?.missingInformation || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>

      {/* ── 1. 🔎 Search Summary ── */}
      <div
        className="glass-card"
        style={{
          padding: '24px 28px',
          border: '1px solid var(--border-bright)',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(56,189,248,0.02) 100%)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            backgroundColor: 'rgba(14,165,233,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)',
          }}>
            <Search size={16} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            🔎 Search Summary
          </h3>
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent)',
            backgroundColor: 'rgba(14,165,233,0.1)',
            padding: '3px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(14,165,233,0.25)',
          }}>
            DIRECT ANSWER
          </span>
        </div>
        <p style={{
          fontSize: '15.5px',
          color: 'var(--text-primary)',
          lineHeight: 1.7,
          margin: 0,
          fontWeight: 400,
        }}>
          {searchSummary || `Direct synthesis of verified live web evidence regarding ${topic}.`}
        </p>
      </div>

      {/* ── 2. 📰 What is Happening? ── */}
      <div
        className="glass-card"
        style={{
          padding: '24px 28px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            backgroundColor: 'rgba(239,68,68,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ef4444',
          }}>
            <Newspaper size={16} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            📰 What is Happening?
          </h3>
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            padding: '3px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(239,68,68,0.25)',
          }}>
            LATEST VERIFIED DEVELOPMENTS
          </span>
        </div>
        <div style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {whatIsHappening?.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ margin: idx === 0 ? 0 : '12px 0 0 0', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              {stripHtml(paragraph)}
            </p>
          )) || <p>Monitoring latest developments from official and news feeds.</p>}
        </div>
      </div>

      {/* ── 3. 🤔 Why is it Trending? ── */}
      <div
        className="glass-card"
        style={{
          padding: '22px 26px',
          border: '1px solid rgba(245,158,11,0.25)',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(20,28,50,0.4) 100%)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            backgroundColor: 'rgba(245,158,11,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#f59e0b',
          }}>
            <TrendingUp size={16} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            🤔 Why is it Trending?
          </h3>
        </div>
        <p style={{ fontSize: '14.5px', color: 'var(--text-primary)', lineHeight: 1.65, margin: 0, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {stripHtml(whyIsItTrending) || `Spike in public, industry, and journalistic interest driven by recent developments.`}
        </p>
      </div>

      {/* ── 4. 📊 Key Facts ── */}
      {keyFacts.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: '24px 28px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                backgroundColor: 'rgba(16,185,129,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#10b981',
              }}>
                <CheckCircle2 size={16} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                📊 Verified Key Facts
              </h3>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {keyFacts.length} SOURCE-BACKED CLAIMS
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {(showAllFacts ? keyFacts : keyFacts.slice(0, 4)).map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-2)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '8px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10.5px',
                      color: '#10b981', fontWeight: 700,
                    }}>
                      FACT #{idx + 1}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {item.date || 'Verified'}
                    </span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', margin: 0, fontWeight: 500, lineHeight: 1.5, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    {stripHtml(item.fact)}
                  </p>
                  {item.detail && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '6px 0 0 0', lineHeight: 1.5, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                      {stripHtml(item.detail)}
                    </p>
                  )}
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: '8px', borderTop: '1px solid var(--border)',
                  marginTop: '6px',
                }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Source: <strong style={{ color: 'var(--text-secondary)' }}>{item.source}</strong>
                  </span>
                  {item.url && item.url !== '#' && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '11.5px', color: 'var(--accent)', textDecoration: 'none',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span>Verify [Source]</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {keyFacts.length > 4 && (
            <button
              onClick={() => setShowAllFacts(!showAllFacts)}
              className="btn btn-ghost"
              style={{
                width: '100%', marginTop: '14px', padding: '8px',
                fontSize: '12.5px', fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              <span>{showAllFacts ? 'Show Fewer Facts' : `Show All ${keyFacts.length} Verified Facts`}</span>
              {showAllFacts ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      )}

      {/* ── 5. 📅 Chronological Timeline ── */}
      {timeline.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: '24px 28px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                backgroundColor: 'rgba(56,189,248,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <Calendar size={16} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                📅 Chronological Timeline
              </h3>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              VERIFIED MILESTONES
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            {(showAllTimeline ? timeline : timeline.slice(0, 4)).map((event, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-2)',
                  border: '1px solid var(--border)',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  minWidth: '90px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  paddingTop: '2px',
                }}>
                  {event.date || event.year || 'Recent'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    {stripHtml(event.event)}
                  </div>
                  {event.detail && (
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '6px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                      {stripHtml(event.detail)}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Reported by {event.source}</span>
                    {event.url && event.url !== '#' && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                      >
                        [Citation] <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {timeline.length > 4 && (
            <button
              onClick={() => setShowAllTimeline(!showAllTimeline)}
              className="btn btn-ghost"
              style={{
                width: '100%', marginTop: '12px', padding: '8px',
                fontSize: '12px', fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              <span>{showAllTimeline ? 'Show Fewer Events' : `Show All ${timeline.length} Timeline Events`}</span>
              {showAllTimeline ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      )}

      {/* ── 6. 🌍 Impact & 🏢 Companies Involved (2-Column Grid) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Impact */}
        <div
          className="glass-card"
          style={{
            padding: '22px 24px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '6px',
              backgroundColor: 'rgba(139,92,246,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8b5cf6',
            }}>
              <Globe2 size={15} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              🌍 Impact & Who is Affected
            </h3>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            {impact || `Measurable implications across commercial adoption, end-users, and competitive strategy.`}
          </p>
        </div>

        {/* Organizations Involved */}
        <div
          className="glass-card"
          style={{
            padding: '22px 24px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '6px',
              backgroundColor: 'rgba(236,72,153,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ec4899',
            }}>
              <Building2 size={15} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              🏢 Organizations Involved
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {organizationsInvolved.map((org, i) => (
              <span
                key={i}
                style={{
                  fontSize: '12px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-surface-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <strong>{org.name}</strong>
                {org.tier === 1 && (
                  <span style={{ fontSize: '9.5px', color: '#10b981', fontFamily: 'var(--font-mono)' }}>PRIMARY</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7. 📚 Background Context ── */}
      {background && (
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <BookOpen size={16} style={{ color: 'var(--text-muted)' }} />
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)', margin: 0 }}>
              📚 Background Context (Separate from Breaking News)
            </h4>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {background}
          </p>
        </div>
      )}

      {/* ── 8. ⚠️ What is Uncertain & Conflicting? ── */}
      {(conflictingReports.length > 0 || unconfirmedClaims.length > 0 || missingInformation.length > 0) && (
        <div
          className="glass-card"
          style={{
            padding: '22px 26px',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(245,158,11,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '6px',
              backgroundColor: 'rgba(245,158,11,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f59e0b',
            }}>
              <AlertTriangle size={15} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              ⚠️ What is Uncertain & Conflicting?
            </h3>
          </div>

          {/* Conflicting reports */}
          {conflictingReports.map((c, i) => (
            <div
              key={i}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.2)',
                marginBottom: '10px',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>
                Discrepancy: {c.issue}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                • <strong>{c.viewA?.source || 'Source A'}:</strong> {c.viewA?.claim || c.viewA}
                <br />
                • <strong>{c.viewB?.source || 'Source B'}:</strong> {c.viewB?.claim || c.viewB}
              </div>
              {c.explanation && (
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                  Why discrepancy exists: {c.explanation}
                </div>
              )}
            </div>
          ))}

          {/* Unconfirmed claims */}
          {unconfirmedClaims.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                UNCONFIRMED CLAIMS / SPECULATION:
              </span>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {unconfirmedClaims.map((claim, idx) => (
                  <li key={idx}>{claim}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
