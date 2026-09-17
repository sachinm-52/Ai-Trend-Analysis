// ═══════════════════════════════════════════════════
// AI Trend Analyzer — LandingPage Component
// ═══════════════════════════════════════════════════

import React from 'react';
import { HeroSearch } from '../components/landing/HeroSearch';
import { RecentSearches } from '../components/landing/RecentSearches';
import { ExampleTopics } from '../components/landing/ExampleTopics';
import { FeatureShowcase } from '../components/landing/FeatureShowcase';

export function LandingPage({
  onSearch,
  recentSearches = [],
  onSelectRecent,
  onRemoveRecent,
  onClearRecent,
}) {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '60px 20px 80px' }} className="hero-gradient">
      {/* Central Hero Search */}
      <HeroSearch
        onSearch={onSearch}
        recentSearches={recentSearches}
        onSelectRecent={onSelectRecent}
      />

      {/* Recent Searches */}
      <RecentSearches
        searches={recentSearches}
        onSelect={onSelectRecent}
        onRemove={onRemoveRecent}
        onClear={onClearRecent}
      />

      {/* Featured Trend Topics */}
      <ExampleTopics onSelectTopic={onSearch} />

      {/* 6 Wow Features */}
      <FeatureShowcase />

      {/* Simple Clean Footer */}
      <footer
        style={{
          marginTop: '100px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '12.5px',
        }}
      >
        <p style={{ margin: 0 }}>
          AI Trend Analyzer · Grounded Trend Intelligence Engine · Distinguishes verified facts from AI scenarios
        </p>
      </footer>
    </div>
  );
}
