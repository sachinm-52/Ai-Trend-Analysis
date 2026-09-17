// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Color Tokens & Theme Helpers
// ═══════════════════════════════════════════════════

export const THEME_COLORS = {
  accent: '#38BDF8',
  accentPurple: '#A78BFA',
  accentGreen: '#34D399',
  accentOrange: '#FB923C',
  accentRed: '#F87171',
  accentYellow: '#FBBF24',
};

export const CATEGORY_COLORS = {
  Technology: { bg: 'rgba(56, 189, 248, 0.12)', text: '#38BDF8', border: 'rgba(56, 189, 248, 0.3)' },
  Business: { bg: 'rgba(52, 211, 153, 0.12)', text: '#34D399', border: 'rgba(52, 211, 153, 0.3)' },
  Science: { bg: 'rgba(251, 146, 60, 0.12)', text: '#FB923C', border: 'rgba(251, 146, 60, 0.3)' },
  Social: { bg: 'rgba(167, 139, 250, 0.12)', text: '#A78BFA', border: 'rgba(167, 139, 250, 0.3)' },
  Finance: { bg: 'rgba(248, 113, 113, 0.12)', text: '#F87171', border: 'rgba(248, 113, 113, 0.3)' },
  Policy: { bg: 'rgba(251, 191, 36, 0.12)', text: '#FBBF24', border: 'rgba(251, 191, 36, 0.3)' },
  Culture: { bg: 'rgba(236, 72, 153, 0.12)', text: '#F472B6', border: 'rgba(236, 72, 153, 0.3)' },
  Default: { bg: 'rgba(100, 116, 139, 0.12)', text: '#94A3B8', border: 'rgba(100, 116, 139, 0.3)' },
};

export function getCategoryStyle(cat = '') {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS.Default;
}

export const MOMENTUM_CONFIG = {
  rising: {
    label: 'RISING',
    color: '#34D399',
    bg: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.3)',
    icon: 'TrendingUp',
    description: 'Accelerating interest, investment, and adoption.',
  },
  emerging: {
    label: 'EMERGING',
    color: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.12)',
    border: 'rgba(167, 139, 250, 0.3)',
    icon: 'Sparkles',
    description: 'Early signals detected; high growth potential.',
  },
  stable: {
    label: 'STABLE / MATURE',
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.3)',
    icon: 'Activity',
    description: 'Established presence with steady activity.',
  },
  declining: {
    label: 'DECLINING',
    color: '#F87171',
    bg: 'rgba(248, 113, 113, 0.12)',
    border: 'rgba(248, 113, 113, 0.3)',
    icon: 'TrendingDown',
    description: 'Cooling momentum or consolidation phase.',
  },
};

export const EVIDENCE_LEVELS = {
  high: { label: 'STRONG EVIDENCE', color: '#34D399', bg: 'rgba(52,211,153,0.1)' },
  medium: { label: 'MODERATE EVIDENCE', color: '#FBBF24', bg: 'rgba(251,191,36,0.1)' },
  low: { label: 'EMERGING / LOW EVIDENCE', color: '#94A3B8', bg: 'rgba(148,163,184,0.1)' },
};
