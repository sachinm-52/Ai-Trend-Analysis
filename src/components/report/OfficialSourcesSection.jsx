// ═══════════════════════════════════════════════════
// AI Trend Intelligence — OfficialSourcesSection Component
// 🏛️ Official Sources Showcase (Requirement #12)
// Prioritizes primary corporate releases, docs, government notices & GitHub
// ═══════════════════════════════════════════════════

import React from 'react';
import { Landmark, ExternalLink, ShieldCheck, FileCode, BookMarked, Globe } from 'lucide-react';

export function OfficialSourcesSection({ sources = [], topic }) {
  // Filter for Tier 1 sources
  const officialSources = sources.filter(s => s.tier === 1 || s.isPrimary);

  if (officialSources.length === 0) return null;

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 28px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#10b981',
          }}>
            <Landmark size={17} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              🏛️ Official & Primary Sources
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Direct primary documentation, manufacturer announcements, research papers & official repositories
            </span>
          </div>
        </div>

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700,
          color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '4px 10px', borderRadius: '999px',
        }}>
          <ShieldCheck size={12} />
          TIER-1 PRIMARY
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {officialSources.map((src, idx) => {
          const isGithub = (src.url || '').includes('github.com');
          const isArxiv = (src.url || '').includes('arxiv.org');
          const isGov = (src.url || '').includes('.gov');

          return (
            <div
              key={idx}
              style={{
                padding: '16px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  {isGithub ? (
                    <FileCode size={13} style={{ color: '#e2e8f0' }} />
                  ) : isArxiv ? (
                    <BookMarked size={13} style={{ color: '#f59e0b' }} />
                  ) : isGov ? (
                    <Landmark size={13} style={{ color: '#10b981' }} />
                  ) : (
                    <Globe size={13} style={{ color: 'var(--accent)' }} />
                  )}
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: '#10b981',
                    textTransform: 'uppercase',
                  }}>
                    {src.source || 'Official Source'}
                  </span>
                </div>

                <h4 style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 6px 0',
                  lineHeight: 1.45,
                }}>
                  {src.title}
                </h4>

                {src.snippet && (
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    {src.snippet.slice(0, 160)}...
                  </p>
                )}
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: '10px', borderTop: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {src.publishedDate ? new Date(src.publishedDate).toLocaleDateString() : 'Official'}
                </span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '12px', color: '#10b981', fontWeight: 600,
                    textDecoration: 'none', fontFamily: 'var(--font-mono)',
                  }}
                >
                  <span>Open Primary Source</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
