// ═══════════════════════════════════════════════════
// AI Trend Analyzer — HeroSearch Component
// Central search box with animated placeholder cycling
// ═══════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { EXAMPLE_TOPICS } from '../../data/mockDatabase';

const PLACEHOLDERS = [
  'Artificial Intelligence',
  'NVIDIA and the GPU Moat',
  'Indian EV Market Adoption',
  'Tesla Robotaxi Strategy',
  'OpenAI o3 & Reasoning Models',
  'SpaceX Starship Commercialization',
  'Cybersecurity in the AI Era',
  'Bengaluru Startup Ecosystem',
  'Global Semiconductor Race',
  'Quantum Computing Breakthroughs',
];

export function HeroSearch({ onSearch, recentSearches = [], onSelectRecent }) {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Cycle animated placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = query.trim();
    if (clean) {
      onSearch(clean);
    } else {
      // If empty, search the current placeholder
      onSearch(PLACEHOLDERS[placeholderIndex]);
    }
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
      {/* Eyebrow Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          color: 'var(--accent)',
          fontSize: '12.5px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)',
        }}
      >
        <Sparkles size={14} />
        <span>NEXT-GENERATION TREND INTELLIGENCE</span>
      </div>

      {/* Hero Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          marginBottom: '16px',
        }}
      >
        Understand{' '}
        <span className="text-gradient">What's Happening</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0 auto 36px',
          lineHeight: 1.6,
        }}
      >
        Turn any topic, technology, company, person, or social movement into a structured, living intelligence report — from historical roots to future scenarios.
      </p>

      {/* Large Search Box */}
      <form onSubmit={handleSubmit} style={{ position: 'relative', marginBottom: '20px' }}>
        <div
          className="glass-card"
          style={{
            padding: '8px 10px 8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-bright)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4), 0 0 24px rgba(56, 189, 248, 0.1)',
            transition: 'all 0.2s ease',
          }}
        >
          <Search size={22} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Try: "${PLACEHOLDERS[placeholderIndex]}"`}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '17px',
              fontFamily: 'var(--font-body)',
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-lg)',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            <span>Analyze</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </form>

      {/* Quick Topic Chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '12px',
        }}
      >
        <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={12} /> Popular:
        </span>
        {EXAMPLE_TOPICS.slice(0, 6).map((topic) => (
          <button
            key={topic}
            onClick={() => onSearch(topic)}
            className="tag"
            style={{
              cursor: 'pointer',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface-2)',
            }}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
