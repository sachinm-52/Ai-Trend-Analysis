import React from 'react';
import { Terminal, Shield, Cpu, Layers } from 'lucide-react';
import { ANALYSIS_SYSTEM, POSTS_SYSTEM } from '../services/aiService';
import { COLORS } from '../utils/formatters';

export function AboutView() {
  return (
    <div style={styles.container} className="sp-container">
      <div style={styles.hero}>
        <span className="sp-mono" style={styles.eyebrow}>
          METHODOLOGY &amp; ARCHITECTURE
        </span>
        <h2 className="sp-display" style={styles.title}>
          How SocialPulse Works
        </h2>
        <p style={styles.sub}>
          SocialPulse AI operates as an analytical reasoning layer over social data, synthesizing
          multidimensional sentiment, emotional signatures, aspect tensions, and forward-looking
          trajectories.
        </p>
      </div>

      <div style={styles.featureGrid}>
        <div style={styles.featureCard}>
          <Cpu size={20} color={COLORS.accent} />
          <h4 className="sp-display" style={styles.featureTitle}>
            Dual-Mode Intelligence Engine
          </h4>
          <p style={styles.featureDesc}>
            Connects natively to Anthropic Claude 3.7 / 4.6 when an API key is supplied, and
            gracefully shifts into high-fidelity heuristic simulation mode offline, guaranteeing
            uninterrupted uptime.
          </p>
        </div>

        <div style={styles.featureCard}>
          <Layers size={20} color={COLORS.accentWarm} />
          <h4 className="sp-display" style={styles.featureTitle}>
            7-Point Structured Synthesis
          </h4>
          <p style={styles.featureDesc}>
            Every input is mapped strictly to 7 synchronized dimensions: Overview confidence, Aspect
            tensions, Emotion distributions, Top themes, Trend forecasts, Editorial briefing, and
            Interactive Ask AI follow-ups.
          </p>
        </div>

        <div style={styles.featureCard}>
          <Shield size={20} color={COLORS.positive} />
          <h4 className="sp-display" style={styles.featureTitle}>
            Grounding &amp; Authenticity
          </h4>
          <p style={styles.featureDesc}>
            When analyzing real post batches, the system isolates organic phrases, flags potential
            coordinated spam/templates, and restricts observations strictly to the verbatim input.
          </p>
        </div>
      </div>

      {/* SYSTEM PROMPTS SECTION */}
      <div style={styles.promptSection}>
        <h3 className="sp-display" style={styles.sectionHeader}>
          System Reasoning Instructions
        </h3>

        <div style={styles.codeBlock}>
          <div style={styles.codeHeader}>
            <span className="sp-mono" style={styles.codeTitle}>
              <Terminal size={13} color={COLORS.accent} /> ANALYSIS_SYSTEM (Topic Synthesis)
            </span>
          </div>
          <pre className="sp-mono" style={styles.pre}>
            {ANALYSIS_SYSTEM}
          </pre>
        </div>

        <div style={styles.codeBlock}>
          <div style={styles.codeHeader}>
            <span className="sp-mono" style={styles.codeTitle}>
              <Terminal size={13} color={COLORS.accentWarm} /> POSTS_SYSTEM (Batch Real Posts)
            </span>
          </div>
          <pre className="sp-mono" style={styles.pre}>
            {POSTS_SYSTEM}
          </pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 880,
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: 42,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: '0.14em',
    color: COLORS.accent,
    display: 'block',
    marginBottom: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: 14,
  },
  sub: {
    fontSize: 15,
    color: COLORS.muted,
    maxWidth: 620,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 16,
    marginBottom: 48,
  },
  featureCard: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: '22px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  featureTitle: {
    fontSize: 18,
    color: COLORS.text,
  },
  featureDesc: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 1.6,
  },
  promptSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  sectionHeader: {
    fontSize: 22,
    color: COLORS.text,
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: 12,
  },
  codeBlock: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    overflow: 'hidden',
  },
  codeHeader: {
    padding: '10px 16px',
    background: COLORS.surface2,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  codeTitle: {
    fontSize: 11,
    color: COLORS.text,
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  },
  pre: {
    padding: '16px',
    fontSize: 11.5,
    color: COLORS.muted,
    lineHeight: 1.65,
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
  },
};
