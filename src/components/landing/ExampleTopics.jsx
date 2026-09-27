// ═══════════════════════════════════════════════════
// AI Trend Intelligence — ExampleTopics Component
// 12 verified test query chips + featured topic cards
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Zap, Car, Shield, Rocket, Sparkles, Building2, Bot, Globe, Atom, Brain } from 'lucide-react';
import { Badge } from '../common/Badge';

// 12 verified deep intelligence topics
const FEATURED = [
  {
    topic: 'NVIDIA Blackwell',
    category: 'Hardware',
    icon: Cpu,
    status: 'Production Deployed',
    momentum: 'RISING',
    snippet: 'The B200/GB200 GPU architecture that redefined AI compute — from specs to supply chain.',
    stats: '96% Confidence · GB200 NVL72',
    color: '#22c55e',
  },
  {
    topic: 'OpenAI',
    category: 'AI Research',
    icon: Sparkles,
    status: 'Frontier Race',
    momentum: 'RISING',
    snippet: 'From non-profit lab to ChatGPT phenomenon, o3 reasoning breakthroughs, and commercialization.',
    stats: '95% Confidence · 400M+ Users',
    color: '#38bdf8',
  },
  {
    topic: 'Tesla Optimus',
    category: 'Robotics',
    icon: Bot,
    status: 'Commercial Deployment',
    momentum: 'EMERGING',
    snippet: 'Humanoid robot moving from prototype to factory deployment — actuators, sensors, and timeline.',
    stats: '91% Confidence · Humanoid AI',
    color: '#a78bfa',
  },
  {
    topic: 'AI agents in 2026',
    category: 'AI Systems',
    icon: Zap,
    status: 'Protocol Wars',
    momentum: 'RISING',
    snippet: 'MCP, computer use, multi-agent coordination, and autonomous workflow orchestration.',
    stats: '93% Confidence · Agentic AI',
    color: '#fb923c',
  },
  {
    topic: 'Apple Vision Pro',
    category: 'Spatial Computing',
    icon: Rocket,
    status: 'Developer Platform',
    momentum: 'STABLE',
    snippet: 'visionOS, EyeSight, and the spatial computing bet — market reception and developer ecosystem.',
    stats: '89% Confidence · Spatial OS',
    color: '#e879f9',
  },
  {
    topic: 'Indian EV Market',
    category: 'CleanTech',
    icon: Zap,
    status: 'Exponential Growth',
    momentum: 'EMERGING',
    snippet: '2-wheeler electrification, battery localization, Ola/Ather, and PM E-Drive policy.',
    stats: '88% Confidence · Emerging Hub',
    color: '#22c55e',
  },
  {
    topic: 'Bengaluru AI startups',
    category: 'Startup Ecosystem',
    icon: Building2,
    status: 'Deep Tech Hub',
    momentum: 'RISING',
    snippet: "India's Silicon Valley AI surge — Sarvam AI, Krutrim, Ninjacart and the startup wave.",
    stats: '87% Confidence · Deep Tech',
    color: '#eab308',
  },
  {
    topic: 'Quantum computing',
    category: 'Computing',
    icon: Atom,
    status: 'Early Commercial',
    momentum: 'EMERGING',
    snippet: "IBM Condor, Google Willow, post-quantum cryptography — where we are in the 'quantum advantage' race.",
    stats: '85% Confidence · 1000+ Qubits',
    color: '#38bdf8',
  },
  {
    topic: 'Cybersecurity',
    category: 'Security',
    icon: Shield,
    status: 'AI Transformation',
    momentum: 'RISING',
    snippet: 'Autonomous defense systems, zero-trust architectures, and quantum decryption threats.',
    stats: '90% Confidence · Essential Layer',
    color: '#ef4444',
  },
  {
    topic: 'OpenAI Sora',
    category: 'Generative AI',
    icon: Sparkles,
    status: 'Released Dec 2024',
    momentum: 'EMERGING',
    snippet: 'World-simulation video generation model — physics consistency, storyboards, and creator tools.',
    stats: '92% Confidence · Video AI',
    color: '#a78bfa',
  },
  {
    topic: 'Tesla India',
    category: 'EV / Automotive',
    icon: Car,
    status: 'Market Entry 2025',
    momentum: 'EMERGING',
    snippet: 'Import duty cuts, Model Y launch, Showroom Delhi, and EV charging infrastructure plans.',
    stats: '90% Confidence · India EV',
    color: '#fb923c',
  },
  {
    topic: 'Artificial Intelligence',
    category: 'Technology',
    icon: Brain,
    status: 'Rapid Acceleration',
    momentum: 'RISING',
    snippet: 'From transformers to reasoning models and autonomous agents — the complete macro AI shift.',
    stats: '95% Confidence · Macro Trend',
    color: '#22c55e',
  },
];

const QUICK_CHIPS = [
  'NVIDIA Blackwell', 'OpenAI', 'Tesla Optimus', 'AI agents in 2026',
  'Apple Vision Pro', 'Indian EV Market', 'Bengaluru AI startups',
  'Quantum computing', 'Cybersecurity', 'OpenAI Sora', 'Tesla India', 'Artificial Intelligence',
];

export function ExampleTopics({ onSelectTopic }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{
            padding: '4px 12px', borderRadius: '999px',
            backgroundColor: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)',
            fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)',
          }}>
            12 VERIFIED INTELLIGENCE DOSSIERS
          </div>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 3vw, 28px)',
          color: 'var(--text-primary)',
          fontWeight: 700, marginBottom: '8px',
        }}>
          Explore Deep Intelligence Reports
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
          Instant, verified analysis with real historical data, key people, timelines, and future scenarios.
        </p>
      </div>

      {/* Quick search chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '36px' }}>
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => onSelectTopic(chip)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(56,189,248,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Feature cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
      }}>
        {FEATURED.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredCard === idx;
          return (
            <div
              key={item.topic}
              onClick={() => onSelectTopic(item.topic)}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="glass-card"
              style={{
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '180px',
                border: isHovered ? `1px solid ${item.color}60` : '1px solid var(--border)',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 8px 32px ${item.color}25` : 'none',
                transition: 'all 0.22s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent line at top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, ${item.color}, transparent)`,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.22s ease',
              }} />

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.color,
                    transition: 'all 0.2s ease',
                  }}>
                    <Icon size={18} />
                  </div>
                  <Badge type="fact" label={item.momentum} size="xs" />
                </div>

                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {item.category}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px', fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px', lineHeight: 1.3,
                }}>
                  {item.topic}
                </h3>

                <p style={{
                  fontSize: '12.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.55',
                  marginBottom: '14px',
                }}>
                  {item.snippet}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--border)',
                fontSize: '10.5px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}>
                <span>{item.stats}</span>
                <ArrowUpRight size={14} style={{ color: isHovered ? item.color : 'var(--text-muted)', transition: 'color 0.2s' }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
