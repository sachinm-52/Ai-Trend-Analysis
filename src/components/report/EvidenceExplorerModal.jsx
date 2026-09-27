// ═══════════════════════════════════════════════════
// AI Trend Intelligence — Evidence Explorer Modal
// "Show Me Why" — Claim provenance audit & source inspector
// ═══════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  X, Shield, ExternalLink, CheckCircle2, AlertCircle,
  Clock, FileText, Globe, BookOpen, Newspaper, FlaskConical,
  Copy, Check
} from 'lucide-react';

const EVIDENCE_LEVELS = {
  VERIFIED: {
    label: 'VERIFIED FACT',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.3)',
    icon: CheckCircle2,
    desc: 'Confirmed by multiple independent primary sources',
  },
  REPORTED: {
    label: 'REPORTED',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
    border: 'rgba(56,189,248,0.3)',
    icon: Newspaper,
    desc: 'Reported by credible news or industry sources',
  },
  AI_ANALYSIS: {
    label: 'AI ANALYSIS',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
    border: 'rgba(167,139,250,0.3)',
    icon: FlaskConical,
    desc: 'AI-synthesized analysis based on verified evidence patterns',
  },
  FUTURE_SCENARIO: {
    label: 'FUTURE SCENARIO',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
    border: 'rgba(251,146,60,0.3)',
    icon: Clock,
    desc: 'Speculative projection — not a confirmed prediction',
  },
};

const SOURCE_TYPE_ICONS = {
  official: Globe,
  news: Newspaper,
  research: BookOpen,
  regulatory: Shield,
  default: FileText,
};

function SourceCard({ source, idx }) {
  const [copied, setCopied] = useState(false);
  const Icon = SOURCE_TYPE_ICONS[source.type] || SOURCE_TYPE_ICONS.default;

  const handleCopy = () => {
    navigator.clipboard.writeText(source.url || source.name).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      padding: '14px 16px',
      borderRadius: '10px',
      border: '1px solid var(--border)',
      backgroundColor: 'var(--bg-surface)',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
        backgroundColor: 'rgba(56,189,248,0.1)',
        border: '1px solid rgba(56,189,248,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={14} style={{ color: 'var(--accent)' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {source.name || `Source ${idx + 1}`}
          </span>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {source.date && (
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {source.date}
              </span>
            )}
            {source.type && (
              <span style={{
                fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                color: 'var(--accent)', backgroundColor: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.2)', padding: '1px 5px', borderRadius: '3px',
                textTransform: 'uppercase',
              }}>
                {source.type}
              </span>
            )}
          </div>
        </div>
        {source.title && (
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 8px', lineHeight: 1.5 }}>
            &ldquo;{source.title}&rdquo;
          </p>
        )}
        {source.description && (
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.5 }}>
            {source.description}
          </p>
        )}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '11px', color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={11} />
              View Source
            </a>
          )}
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '11px', color: 'var(--text-muted)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            {copied ? <Check size={11} style={{ color: '#22c55e' }} /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}

function EvidenceLevelBadge({ level }) {
  const def = EVIDENCE_LEVELS[level] || EVIDENCE_LEVELS.REPORTED;
  const Icon = def.icon;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '6px 12px', borderRadius: '8px',
      backgroundColor: def.bg, border: `1px solid ${def.border}`,
    }}>
      <Icon size={13} style={{ color: def.color }} />
      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: def.color }}>
        {def.label}
      </span>
    </div>
  );
}

export function EvidenceExplorerModal({ isOpen, onClose, claim, sources = [], evidenceLevel, topic }) {
  const [activeTab, setActiveTab] = useState('sources');

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const def = EVIDENCE_LEVELS[evidenceLevel] || EVIDENCE_LEVELS.REPORTED;
  const tabs = [
    { key: 'sources', label: `Sources (${sources.length})` },
    { key: 'methodology', label: 'How We Know' },
  ];

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(6px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', maxWidth: '680px',
        maxHeight: '85vh',
        borderRadius: '16px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-bright)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px',
          background: 'linear-gradient(135deg, rgba(15,21,32,0.8), rgba(20,28,50,0.7))',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Shield size={16} style={{ color: 'var(--accent)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                color: 'var(--accent)', letterSpacing: '0.06em',
              }}>
                EVIDENCE EXPLORER — SHOW ME WHY
              </span>
            </div>
            {claim && (
              <p style={{
                fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)', lineHeight: 1.4,
                margin: '0 0 12px',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-surface-2)',
                border: '1px solid var(--border)',
                fontStyle: 'italic',
              }}>
                &ldquo;{claim}&rdquo;
              </p>
            )}
            <EvidenceLevelBadge level={evidenceLevel} />
            {def && (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '8px 0 0', lineHeight: 1.5 }}>
                {def.desc}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              backgroundColor: 'var(--bg-surface-2)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0', borderBottom: '1px solid var(--border)',
          padding: '0 24px',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 16px',
                fontSize: '13px', fontWeight: 600,
                color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-muted)',
                background: 'none', border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                transition: 'color 0.2s',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {activeTab === 'sources' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sources.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <AlertCircle size={32} style={{ opacity: 0.4, marginBottom: '10px' }} />
                  <p style={{ margin: 0, fontSize: '13px' }}>
                    No specific sources logged for this claim. This may be AI-synthesized analysis.
                  </p>
                </div>
              ) : (
                sources.map((src, idx) => (
                  <SourceCard key={idx} source={src} idx={idx} />
                ))
              )}
            </div>
          )}

          {activeTab === 'methodology' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                padding: '16px 18px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-surface-2)',
                border: '1px solid var(--border)',
              }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px' }}>
                  How Intelligence Is Collected
                </h4>
                <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, paddingLeft: '18px' }}>
                  <li>Official announcements &amp; press releases from primary entities</li>
                  <li>Credible journalism: Reuters, Bloomberg, TechCrunch, The Verge</li>
                  <li>Academic papers and research publications (arXiv, Nature, IEEE)</li>
                  <li>Regulatory filings and government publications</li>
                  <li>Cross-referencing across 3+ independent sources for VERIFIED claims</li>
                </ul>
              </div>

              {Object.entries(EVIDENCE_LEVELS).map(([key, ldef]) => {
                const Icon = ldef.icon;
                return (
                  <div key={key} style={{
                    padding: '14px 16px', borderRadius: '10px',
                    backgroundColor: ldef.bg, border: `1px solid ${ldef.border}`,
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                  }}>
                    <Icon size={16} style={{ color: ldef.color, flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: ldef.color, marginBottom: '4px' }}>
                        {ldef.label}
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {ldef.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                backgroundColor: 'rgba(251,146,60,0.06)',
                border: '1px solid rgba(251,146,60,0.2)',
              }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Important: </strong>
                  This platform never fabricates news, people, companies, statistics, dates, or citations.
                  Future scenarios are clearly labeled and represent AI analysis based on current evidence patterns — not predictions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'var(--bg-surface-2)',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Topic: {topic || 'Unknown'}
          </span>
          <button onClick={onClose} className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 14px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for easy use
export function useEvidenceExplorer() {
  const [state, setState] = useState({ isOpen: false, claim: '', sources: [], level: 'REPORTED', topic: '' });

  const openEvidence = (claim, sources = [], level = 'REPORTED', topic = '') => {
    setState({ isOpen: true, claim, sources, level, topic });
  };

  const closeEvidence = () => setState(s => ({ ...s, isOpen: false }));

  return { evidenceState: state, openEvidence, closeEvidence };
}
