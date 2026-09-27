// ═══════════════════════════════════════════════════
// AI Trend Intelligence — Resource Hub
// Official links, news, papers, GitHub, regulatory
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Globe, Newspaper, BookOpen, GitBranch, Shield, BarChart3, ExternalLink, Link2 } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

const CATEGORY_CONFIG = {
  official: { label: 'Official', icon: Globe, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
  news: { label: 'News', icon: Newspaper, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
  research: { label: 'Research', icon: BookOpen, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  github: { label: 'GitHub', icon: GitBranch, color: '#e2e8f0', bg: 'rgba(226,232,240,0.06)', border: 'rgba(226,232,240,0.15)' },
  regulatory: { label: 'Regulatory', icon: Shield, color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
  reports: { label: 'Reports', icon: BarChart3, color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' },
};

function ResourceCard({ resource }) {
  const catKey = (resource.category || 'official').toLowerCase();
  const config = CATEGORY_CONFIG[catKey] || {
    label: resource.category || 'Resource',
    icon: Link2,
    color: 'var(--accent)',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
  };
  const Icon = config.icon;

  return (
    <a
      href={resource.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '10px',
        border: `1px solid ${config.border}`,
        backgroundColor: config.bg,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = `0 4px 16px ${config.color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
        backgroundColor: `${config.color}20`, border: `1px solid ${config.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={14} style={{ color: config.color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span style={{
            fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {resource.title}
          </span>
          <ExternalLink size={11} style={{ color: 'var(--text-muted)', flexShrink: 0, opacity: 0.6 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
            color: config.color, textTransform: 'uppercase',
          }}>
            {config.label}
          </span>
          {resource.publisher && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              · {resource.publisher}
            </span>
          )}
          {resource.url && (
            <span style={{
              fontSize: '10px', color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              maxWidth: '200px',
            }}>
              {resource.url.replace(/^https?:\/\//, '').split('/')[0]}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

export function ResourceHub({ report }) {
  const resources = report?.resourceHub || report?.sources?.map(s => ({
    category: s.type || 'news',
    title: s.title || s.name,
    url: s.url,
    publisher: s.name,
  })) || [];

  const [activeFilter, setActiveFilter] = useState('all');

  if (!resources.length) return null;

  // Group by category
  const categories = ['all', ...new Set(resources.map(r => (r.category || 'official').toLowerCase()))];
  const filtered = activeFilter === 'all' ? resources : resources.filter(r => (r.category || 'official').toLowerCase() === activeFilter);

  return (
    <SectionWrapper
      id="sec-resource-hub"
      sectionNum="10"
      title="Resource Hub"
      subtitle="Curated official sources, news, research papers, GitHub repos, and regulatory links"
      icon={Link2}
      badgeType="verified"
      badgeLabel="VERIFIED SOURCES"
    >
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat] || { label: cat === 'all' ? 'All' : cat, color: 'var(--accent)' };
          const isActive = activeFilter === cat;
          const count = cat === 'all' ? resources.length : resources.filter(r => (r.category || 'official').toLowerCase() === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: isActive ? config.color : 'var(--text-muted)',
                backgroundColor: isActive ? `${config.color || 'var(--accent)'}18` : 'var(--bg-surface-2)',
                border: isActive ? `1px solid ${config.color || 'var(--accent)'}50` : '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >
              {config.label || cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Resources grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
        {filtered.map((resource, idx) => (
          <ResourceCard key={idx} resource={resource} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          No resources in this category.
        </div>
      )}
    </SectionWrapper>
  );
}
