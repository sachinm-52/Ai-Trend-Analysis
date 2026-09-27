// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Sidebar Component
// Navigation with Past / Present / Future structure
// ═══════════════════════════════════════════════════

import React from 'react';
import {
  Clock,
  Radio,
  Telescope,
  GitBranch,
  Users,
  Building2,
  Milestone,
  Calendar,
  Sparkles,
  Newspaper,
  Link2,
  Zap,
  TrendingUp,
  MessageSquare,
  BookOpen,
  BarChart3,
  Network,
  AlertTriangle,
  Lightbulb,
  Code2,
  ShieldCheck,
} from 'lucide-react';

export const SECTIONS_NAV = [
  // 🔎 RESEARCH SUMMARY
  { id: 'sec-summary', label: '🔎 Research Summary', icon: Newspaper, group: false },
  { id: 'sec-official', label: '🏛️ Official Sources', icon: ShieldCheck, group: false },
  { id: 'sec-facts', label: '⚖️ Fact vs Opinion', icon: BarChart3, group: false },
  { id: 'sec-media', label: '🖼️ Media & Videos', icon: Sparkles, group: false },
  { id: 'sec-explore', label: '🧭 Explore Topics', icon: Zap, group: false },

  // ⏳ PAST
  { id: 'sec-past', label: '⏳ PAST', icon: Clock, group: true },
  { id: 'sec-past', label: 'Origin', icon: GitBranch, indent: true },
  { id: 'sec-past', label: 'Important People', icon: Users, indent: true },
  { id: 'sec-past', label: 'Organizations', icon: Building2, indent: true },
  { id: 'sec-past', label: 'Turning Points', icon: Milestone, indent: true },
  { id: 'sec-past', label: 'Timeline', icon: Calendar, indent: true },

  // 🔴 PRESENT
  { id: 'sec-present', label: '🔴 PRESENT', icon: Radio, group: true },
  { id: 'sec-present', label: 'Current Status', icon: Zap, indent: true },
  { id: 'sec-present', label: 'Latest Developments', icon: Newspaper, indent: true },
  { id: 'sec-present', label: 'Sources & Links', icon: Link2, indent: true },

  // 🔮 FUTURE
  { id: 'sec-future', label: '🔮 FUTURE', icon: Telescope, group: true },
  { id: 'sec-future', label: 'Scenarios', icon: TrendingUp, indent: true },
  { id: 'sec-future', label: 'Future Signals', icon: Sparkles, indent: true },

  // Additional Sections
  { id: 'sec-ask-trend', label: 'Ask The Trend', icon: MessageSquare, group: false },
  { id: 'sec-knowledge-graph', label: 'Knowledge Graph', icon: Network, group: false },
  { id: 'sec-summary-modes', label: 'Summaries', icon: BookOpen, group: false },
  { id: 'sec-project-ideas', label: 'Project Ideas', icon: Code2, group: false },
  { id: 'sec-sources', label: 'Full Sources', icon: ShieldCheck, group: false },
];

export function Sidebar({ activeSection, onSelectSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onSelectSection) onSelectSection(id);
  };

  // Group sections
  const grouped = [];
  let currentGroup = null;

  SECTIONS_NAV.forEach((sec) => {
    if (sec.group !== undefined) {
      if (!sec.indent) {
        currentGroup = sec;
        grouped.push({ ...sec, children: [] });
      } else if (grouped.length > 0) {
        grouped[grouped.length - 1].children = grouped[grouped.length - 1].children || [];
        grouped[grouped.length - 1].children.push(sec);
      }
    } else {
      grouped.push(sec);
    }
  });

  return (
    <aside
      style={{
        width: '230px',
        position: 'sticky',
        top: '80px',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        paddingRight: '8px',
      }}
      className="hide-mobile"
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        padding: '8px 12px 6px',
        fontWeight: 600,
      }}>
        NAVIGATE REPORT
      </div>

      {SECTIONS_NAV.map((sec, idx) => {
        const Icon = sec.icon;
        const isActive = activeSection === sec.id;
        const isGroupHeader = sec.group === true;
        const isIndented = sec.indent === true;

        if (isGroupHeader) {
          return (
            <button
              key={`${sec.id}-${idx}`}
              onClick={() => scrollTo(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: isActive ? 'rgba(56,189,248,0.12)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 700,
                textAlign: 'left',
                width: '100%',
                marginTop: idx > 0 ? '8px' : '0',
                fontFamily: 'var(--font-display)',
              }}
            >
              <Icon size={14} style={{ flexShrink: 0 }} />
              <span>{sec.label}</span>
            </button>
          );
        }

        if (isIndented) {
          return (
            <button
              key={`${sec.id}-${sec.label}`}
              onClick={() => scrollTo(sec.id)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              style={{
                padding: '5px 12px 5px 28px',
                fontSize: '11.5px',
                gap: '8px',
                opacity: 0.8,
              }}
            >
              <Icon size={12} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.6 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {sec.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={`${sec.id}-${idx}`}
            onClick={() => scrollTo(sec.id)}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            style={{
              padding: '7px 12px',
              fontSize: '12.5px',
              gap: '10px',
              marginTop: '4px',
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
