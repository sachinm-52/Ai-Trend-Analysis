// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Sidebar Component
// Quick navigation across all intelligence sections
// ═══════════════════════════════════════════════════

import React from 'react';
import {
  FileText,
  Compass,
  Dna,
  Calendar,
  Users,
  Building2,
  Newspaper,
  Flame,
  Network,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  TrendingUp,
  BarChart3,
  Layers,
  HelpCircle,
  Code2,
  BookOpen,
  History,
} from 'lucide-react';

export const SECTIONS_NAV = [
  { id: 'sec-profile', label: 'Topic Profile', icon: Compass },
  { id: 'sec-ten-points', label: '10 Key Points', icon: FileText },
  { id: 'sec-big-picture', label: 'The Big Picture', icon: Compass },
  { id: 'sec-trend-dna', label: 'Trend DNA', icon: Dna },
  { id: 'sec-timeline', label: 'Historical Timeline', icon: Calendar },
  { id: 'sec-people', label: 'Key People', icon: Users },
  { id: 'sec-entities', label: 'Organizations & Tech', icon: Building2 },
  { id: 'sec-current-events', label: 'Current Intelligence', icon: Newspaper },
  { id: 'sec-drivers', label: 'Who Is Driving It', icon: Flame },
  { id: 'sec-knowledge-graph', label: 'Knowledge Graph', icon: Network },
  { id: 'sec-problems', label: 'Problem Detector', icon: AlertTriangle },
  { id: 'sec-opportunities', label: 'Opportunity Radar', icon: Lightbulb },
  { id: 'sec-deep-discovery', label: 'Deep Discovery', icon: Sparkles },
  { id: 'sec-future', label: 'Future Scenarios', icon: TrendingUp },
  { id: 'sec-momentum', label: 'Trend Momentum', icon: BarChart3 },
  { id: 'sec-heatmap', label: 'Ecosystem Heatmap', icon: Layers },
  { id: 'sec-comparison', label: 'Comparison Matrix', icon: Layers },
  { id: 'sec-summary-modes', label: 'Adaptive Summaries', icon: BookOpen },
  { id: 'sec-project-ideas', label: 'Project Ideas', icon: Code2 },
  { id: 'sec-ask-trend', label: 'Ask The Trend', icon: HelpCircle },
  { id: 'sec-sources', label: 'Sources & Confidence', icon: History },
];

export function Sidebar({ activeSection, onSelectSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onSelectSection) onSelectSection(id);
  };

  return (
    <aside
      style={{
        width: '240px',
        position: 'sticky',
        top: '80px',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        paddingRight: '8px',
      }}
      className="hide-mobile"
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          padding: '8px 12px',
          fontWeight: 600,
        }}
      >
        INTELLIGENCE SECTIONS
      </div>

      {SECTIONS_NAV.map((sec) => {
        const Icon = sec.icon;
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            style={{
              padding: '7px 12px',
              fontSize: '12.5px',
              gap: '10px',
            }}
          >
            <Icon size={14} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {sec.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
