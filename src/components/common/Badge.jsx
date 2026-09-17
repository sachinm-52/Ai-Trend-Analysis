// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Badge Component
// Distinct labels for facts, AI analysis, scenarios, etc.
// ═══════════════════════════════════════════════════

import React from 'react';
import { CheckCircle2, Cpu, Compass, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';

export function Badge({ type = 'analysis', label, size = 'sm' }) {
  const configs = {
    fact: {
      className: 'badge-fact',
      icon: CheckCircle2,
      defaultLabel: 'VERIFIED FACT',
    },
    analysis: {
      className: 'badge-analysis',
      icon: Cpu,
      defaultLabel: 'AI ANALYSIS',
    },
    scenario: {
      className: 'badge-scenario',
      icon: Compass,
      defaultLabel: 'POSSIBLE SCENARIO',
    },
    idea: {
      className: 'badge-idea',
      icon: Lightbulb,
      defaultLabel: 'PROJECT IDEA',
    },
    signal: {
      className: 'badge-scenario',
      icon: Sparkles,
      defaultLabel: 'EARLY SIGNAL',
    },
    demo: {
      className: 'badge-demo',
      icon: AlertTriangle,
      defaultLabel: 'DEMO / MODEL DATA',
    },
  };

  const config = configs[type] || configs.analysis;
  const Icon = config.icon;
  const text = label || config.defaultLabel;

  const sizeStyle = size === 'xs'
    ? { fontSize: '10px', padding: '2px 6px', gap: '4px' }
    : { fontSize: '11px', padding: '3px 8px', gap: '5px' };

  return (
    <span
      className={`tag ${config.className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 600,
        letterSpacing: '0.04em',
        borderRadius: '9999px',
        ...sizeStyle,
      }}
    >
      <Icon size={size === 'xs' ? 10 : 12} />
      <span>{text}</span>
    </span>
  );
}
