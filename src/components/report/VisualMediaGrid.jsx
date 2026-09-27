// ═══════════════════════════════════════════════════
// AI Trend Intelligence — VisualMediaGrid Component
// Verified Images & Real Videos with Provenance (Requirements #10 & #11)
// ═══════════════════════════════════════════════════

import React from 'react';
import { Image as ImageIcon, Video, ExternalLink, ShieldCheck, Play } from 'lucide-react';

export function VisualMediaGrid({ media = {} }) {
  const images = media?.images || [];
  const videos = media?.videos || [];

  if (images.length === 0 && videos.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '28px' }}>
      
      {/* ── Verified Images ── */}
      {images.length > 0 && (
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
                backgroundColor: 'rgba(14,165,233,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <ImageIcon size={16} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  🖼️ Legally Verified Topic Media
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Licensed via Wikimedia Commons & Creative Commons repositories with verified attribution
                </span>
              </div>
            </div>
            <span style={{
              fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#10b981',
              backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
              padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <ShieldCheck size={11} /> VERIFIED LICENSE
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {images.map((img, idx) => {
              const linkHref = img.link || img.url;
              return (
                <div
                  key={idx}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-surface-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1,
                    pointerEvents: 'auto',
                  }}
                  aria-label={`Image: ${img.caption || img.title || 'Topic media'}`}
                >
                  <a
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full image: ${img.caption || img.title || 'Topic media'}`}
                    style={{
                      display: 'block',
                      height: '180px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#0b0f19',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.title || img.caption}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                      onError={(e) => {
                        e.target.parentElement.parentElement.style.display = 'none';
                      }}
                    />
                    <div style={{
                      position: 'absolute', bottom: '8px', right: '8px',
                      backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '4px',
                      padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '3px',
                      fontSize: '10px', color: '#ffffff', pointerEvents: 'none',
                    }}>
                      <ExternalLink size={9} /> Open
                    </div>
                  </a>
                  <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <a
                        href={linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read more about: ${img.caption || img.title}`}
                        style={{
                          fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4,
                          textDecoration: 'none', display: 'block',
                        }}
                        onMouseEnter={(e) => { e.target.style.color = 'var(--accent)'; }}
                        onMouseLeave={(e) => { e.target.style.color = 'var(--text-primary)'; }}
                      >
                        {img.caption || img.title}
                      </a>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: '4px' }}>
                        Attribution: {img.attribution || img.source}
                      </span>
                    </div>
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source link for ${img.caption || img.title}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '11px', color: 'var(--accent)', textDecoration: 'none',
                        fontFamily: 'var(--font-mono)', marginTop: '6px',
                        transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.target.style.opacity = '0.8'; }}
                      onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
                    >
                      <span>View Source ↗</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Related Videos ── */}
      {videos.length > 0 && (
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
                backgroundColor: 'rgba(239,68,68,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ef4444',
              }}>
                <Video size={16} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  🎥 Key Technical & Keynote Presentations
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Verified video sources, official keynotes, and technical demonstrations
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {videos.map((vid, idx) => (
              <a
                key={idx}
                href={vid.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-2)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: '96px', height: '64px', borderRadius: '6px',
                  position: 'relative', overflow: 'hidden', flexShrink: 0,
                  backgroundColor: '#0f172a',
                }}>
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      backgroundColor: 'rgba(239,68,68,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff',
                    }}>
                      <Play size={11} fill="#ffffff" />
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)',
                    margin: '0 0 4px 0', lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {vid.title}
                  </h4>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {vid.channel} · {vid.date}
                  </div>
                  <span style={{
                    fontSize: '11px', color: '#ef4444', fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px',
                  }}>
                    Watch on YouTube →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
