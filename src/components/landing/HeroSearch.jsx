// ═══════════════════════════════════════════════════
// AI Trend Analyzer — HeroSearch Component
// Central search box with Quick Search vs Deep Research mode (Requirement #25)
// ═══════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Zap, BrainCircuit, ShieldCheck } from 'lucide-react';
import { EXAMPLE_TOPICS } from '../../data/mockDatabase';

const PLACEHOLDERS = [
  'Why is NVIDIA trending?',
  'What is trending in AI today?',
  'India AI regulation 2026',
  'Latest OpenAI news',
  'Latest developments in quantum computing',
  'What happened in Bengaluru today?',
  'Latest Tesla news',
  'What is happening with Bitcoin?',
  'Latest Android update',
  'Best AI tools for students',
];

export function HeroSearch({ onSearch, recentSearches = [], onSelectRecent }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('quick'); // 'quick' | 'deep'
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
      onSearch(clean, mode);
    } else {
      onSearch(PLACEHOLDERS[placeholderIndex], mode);
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
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
        <ShieldCheck size={14} style={{ color: '#10b981' }} />
        <span>REAL-TIME VERIFIED RESEARCH ENGINE</span>
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
        Research Anything on the{' '}
        <span className="text-gradient">Live Verified Web</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          margin: '0 auto 28px',
          lineHeight: 1.6,
        }}
      >
        Search first, cross-check multi-source evidence, verify facts & citations, and synthesize structured intelligence without hallucinations.
      </p>

      {/* Research Mode Selector (Requirement #25) */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px',
          borderRadius: '999px',
          backgroundColor: 'var(--bg-surface-2)',
          border: '1px solid var(--border)',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => setMode('quick')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: mode === 'quick' ? 'var(--accent)' : 'transparent',
            color: mode === 'quick' ? '#0f172a' : 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Zap size={14} />
          <span>⚡ Quick Search</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('deep')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: mode === 'deep' ? 'var(--accent)' : 'transparent',
            color: mode === 'deep' ? '#0f172a' : 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <BrainCircuit size={14} />
          <span>🧠 Deep Research</span>
        </button>
      </div>

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
            <span>{mode === 'deep' ? 'Deep Research' : 'Research'}</span>
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
          <Zap size={12} /> Test Queries:
        </span>
        {[
          'Why is NVIDIA trending?',
          'India AI regulation 2026',
          'Latest OpenAI news',
          'What happened in Bengaluru today?',
          'What is happening with Bitcoin?',
        ].map((topic) => (
          <button
            key={topic}
            onClick={() => onSearch(topic, mode)}
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
