import React from 'react';
import { COLORS } from '../../utils/formatters';

export function HeroSection() {
  return (
    <div style={styles.hero}>
      <div style={styles.eyebrow} className="sp-mono">
        SOCIAL INTELLIGENCE &amp; TREND FORECASTING
      </div>
      <h1 className="sp-display sp-h1" style={styles.h1}>
        SocialPulse AI
      </h1>
      <svg viewBox="0 0 800 60" style={styles.pulseSvg} preserveAspectRatio="none">
        <path
          className="sp-pulse-path"
          d="M0,30 L120,30 L145,10 L165,50 L185,18 L205,30 L340,30 L365,8 L385,52 L405,30 L560,30 L585,14 L605,46 L625,30 L800,30"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="2"
          opacity="0.85"
        />
      </svg>
      <p style={styles.heroSub}>
        Ask about any topic — SocialPulse reasons through sentiment, aspects, emotion, emerging
        themes and where the conversation is likely headed.
      </p>
    </div>
  );
}

const styles = {
  hero: {
    textAlign: 'center',
    marginBottom: 36,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: '0.18em',
    color: COLORS.accent,
    marginBottom: 14,
  },
  h1: {
    fontSize: 52,
    fontWeight: 600,
    margin: '0 0 18px',
    letterSpacing: '-0.01em',
    color: COLORS.text,
  },
  pulseSvg: {
    width: '100%',
    maxWidth: 500,
    height: 40,
    margin: '0 auto 18px',
    display: 'block',
  },
  heroSub: {
    color: COLORS.muted,
    fontSize: 15,
    maxWidth: 520,
    margin: '0 auto 28px',
    lineHeight: 1.55,
  },
};
