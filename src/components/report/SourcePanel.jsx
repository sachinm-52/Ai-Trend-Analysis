// ═══════════════════════════════════════════════════
// AI Trend Analyzer — SourcePanel Component (Sections 16-17)
// Verified Attribution, Evidence Strength & Confidence Audit
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { ShieldCheck, ExternalLink, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export function SourcePanel({ sources = [], earlySignals = [], confidence = 90 }) {
  return (
    <SectionWrapper
      id="sec-sources"
      sectionNum="20"
      title="Sources, Citations & Confidence Audit"
      subtitle="Full provenance tracking: academic literature, regulatory filings, corporate releases, and early signals"
      icon={ShieldCheck}
      badgeType="fact"
      badgeLabel="PROVENANCE AUDIT"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Confidence Audit Bar */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--bg-surface-2)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                OVERALL CONFIDENCE AUDIT
              </span>
              <Badge type="fact" label="VERIFIED GROUNDING" size="xs" />
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--accent)',
                margin: 0,
              }}
            >
              {confidence}% Synthesis Confidence
            </h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Synthesized from primary research papers, direct corporate filings, verified press releases, and observable market data.
            </p>
          </div>

          <div style={{ minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)' }}>RELIABILITY</span>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>HIGH</span>
            </div>
            <div className="progress-track" style={{ height: '8px' }}>
              <div className="progress-fill" style={{ width: `${confidence}%`, backgroundColor: 'var(--accent)' }} />
            </div>
          </div>
        </div>

        {/* Primary Sources List */}
        {sources && sources.length > 0 && (
          <div>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
              PRIMARY ATTRIBUTED SOURCES
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {sources.map((s, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '14px 16px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--accent)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.name}
                      </span>
                      {s.date && (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {s.date}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', margin: 0, fontWeight: 500, lineHeight: '1.4' }}>
                      {s.title}
                    </p>
                  </div>

                  {s.url && s.url !== '#' && (
                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '11px',
                          color: 'var(--accent)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>View Source Document</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Early Signals (Weak Signal Detector) */}
        {earlySignals && earlySignals.length > 0 && (
          <div
            className="glass-card"
            style={{
              padding: '20px',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              backgroundColor: 'rgba(167, 139, 250, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-2)' }} />
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--accent-2)',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Weak Signals & Horizon Scanning
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {earlySignals.map((sig, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface-2)',
                    border: '1px solid var(--border)',
                    fontSize: '12.5px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{sig.signal}</strong>
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-2)',
                        backgroundColor: 'rgba(167, 139, 250, 0.15)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                      }}
                    >
                      {sig.confidence?.toUpperCase() || 'EARLY'}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    {sig.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
