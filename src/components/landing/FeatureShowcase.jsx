// ═══════════════════════════════════════════════════
// AI Trend Analyzer — FeatureShowcase Component
// Highlighting core analytical superpowers
// ═══════════════════════════════════════════════════

import React from 'react';
import { Dna, Calendar, Network, AlertTriangle, Lightbulb, MessageSquareCode } from 'lucide-react';

const FEATURES = [
  {
    icon: Dna,
    color: '#38BDF8',
    title: 'Trend DNA',
    description: 'Deconstructs any phenomenon into its biological phases: Origin → Trigger → Growth → Acceleration → Current State → Future Trajectory.',
  },
  {
    icon: Calendar,
    color: '#A78BFA',
    title: 'Interactive Timeline',
    description: 'Pinpoints pivotal turning points with verified dates, key actors, catalysts, and magnitude ratings across decades.',
  },
  {
    icon: Network,
    color: '#34D399',
    title: 'Knowledge Graph',
    description: 'Visualizes the web of relationships connecting people, organizations, enabling technologies, and regulatory bodies in SVG.',
  },
  {
    icon: AlertTriangle,
    color: '#F87171',
    title: 'Problem Detector',
    description: 'Surfaces technical bottlenecks, social risks, environmental costs, and structural gaps with evidence strength ratings.',
  },
  {
    icon: Lightbulb,
    color: '#FB923C',
    title: 'Opportunity Radar',
    description: 'Translates identified problems into concrete, buildable project ideas complete with difficulty ratings and MVP blueprints.',
  },
  {
    icon: MessageSquareCode,
    color: '#FBBF24',
    title: 'Ask The Trend AI',
    description: 'Contextually interrogates the full intelligence report with a dedicated AI analyst assistant grounded strictly in verified findings.',
  },
];

export function FeatureShowcase() {
  return (
    <section style={{ maxWidth: '1200px', margin: '80px auto 0', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          Not a News Feed. A Structural Intelligence Engine.
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Standard tools summarize what happened today. AI Trend Analyzer explains the mechanics, the incentives, and the future.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="glass-card hover-card"
              style={{
                padding: '24px',
                border: '1px solid var(--border)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: `${feat.color}15`,
                  border: `1px solid ${feat.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feat.color,
                  flexShrink: 0,
                }}
              >
                <Icon size={22} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
