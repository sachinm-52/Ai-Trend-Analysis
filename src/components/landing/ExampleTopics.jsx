// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ExampleTopics Component
// Rich interactive cards for featured trends
// ═══════════════════════════════════════════════════

import React from 'react';
import { ArrowUpRight, Cpu, Zap, Car, Coins, Shield, Rocket, Sparkles, Building2 } from 'lucide-react';
import { Badge } from '../common/Badge';

const FEATURED = [
  {
    topic: 'Artificial Intelligence',
    category: 'Technology',
    icon: Cpu,
    status: 'Rapid Acceleration',
    momentum: 'RISING',
    snippet: 'From transformers to reasoning models and autonomous agents — the complete macro shift.',
    stats: '95% Confidence · 10 Milestones',
  },
  {
    topic: 'NVIDIA',
    category: 'Technology',
    icon: Zap,
    status: 'Market Dominance',
    momentum: 'RISING',
    snippet: 'How gaming GPUs and CUDA built a $3T computing infrastructure monopoly.',
    stats: '96% Confidence · Hardware Moat',
  },
  {
    topic: 'Tesla',
    category: 'Automotive / AI',
    icon: Car,
    status: 'Strategic Transition',
    momentum: 'STABLE',
    snippet: 'Autonomous driving (FSD), Cybercab, Optimus humanoid robotics, and energy storage scale.',
    stats: '89% Confidence · EV Pioneer',
  },
  {
    topic: 'OpenAI',
    category: 'AI Research',
    icon: Sparkles,
    status: 'Frontier Race',
    momentum: 'RISING',
    snippet: 'From non-profit lab to ChatGPT phenomenon, o3 reasoning breakthroughs, and commercialization.',
    stats: '94% Confidence · 200M+ Users',
  },
  {
    topic: 'Bitcoin',
    category: 'Finance',
    icon: Coins,
    status: 'Institutional Era',
    momentum: 'RISING',
    snippet: 'Spot ETFs, halving dynamics, sovereign reserve adoption, and macro hedge thesis.',
    stats: '91% Confidence · Digital Gold',
  },
  {
    topic: 'Indian EV Market',
    category: 'CleanTech',
    icon: Zap,
    status: 'Exponential Growth',
    momentum: 'EMERGING',
    snippet: '2-wheeler electrification, battery localization, Ola/Ather, and FAME subsidies.',
    stats: '88% Confidence · Emerging Hub',
  },
  {
    topic: 'SpaceX',
    category: 'Aerospace',
    icon: Rocket,
    status: 'Dominant Scale',
    momentum: 'RISING',
    snippet: 'Starship reusability, Starlink orbital internet revenue engine, and Mars architecture.',
    stats: '93% Confidence · 80% Orbit Mass',
  },
  {
    topic: 'Cybersecurity',
    category: 'Security',
    icon: Shield,
    status: 'AI Transformation',
    momentum: 'RISING',
    snippet: 'Autonomous defense systems, zero-trust architectures, and quantum decryption threats.',
    stats: '90% Confidence · Essential Layer',
  },
];

export function ExampleTopics({ onSelectTopic }) {
  return (
    <section style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          Explore Featured Intelligence Reports
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Instant, deep analysis loaded with real historical data, key people, and future outlooks.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '16px',
        }}
      >
        {FEATURED.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.topic}
              onClick={() => onSelectTopic(item.topic)}
              className="glass-card hover-card"
              style={{
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '180px',
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-surface-3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <Badge type="fact" label={item.momentum} size="xs" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  {item.topic}
                </h3>

                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: '14px',
                  }}
                >
                  {item.snippet}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                }}
              >
                <span>{item.stats}</span>
                <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
