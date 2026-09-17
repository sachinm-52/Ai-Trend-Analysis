import React from 'react';
import { Activity, Settings, Bookmark, Download, Sparkles } from 'lucide-react';
import { COLORS } from '../../utils/formatters';

export function Navbar({
  activeTab,
  setActiveTab,
  hasAnalysis,
  onOpenExport,
  onOpenSettings,
  savedCount = 0,
}) {
  return (
    <header style={styles.header}>
      <div style={styles.navContainer}>
        {/* Brand */}
        <div style={styles.brand} onClick={() => setActiveTab('dashboard')}>
          <div style={styles.logoIcon}>
            <Activity size={18} color={COLORS.accent} />
          </div>
          <div style={styles.brandText}>
            <span className="sp-display" style={styles.brandTitle}>
              SocialPulse
            </span>
            <span className="sp-mono" style={styles.engineBadge}>
              <span style={styles.pulseDot} />
              AI ENGINE
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={styles.navLinks}>
          <button
            className="sp-mono"
            style={{
              ...styles.navBtn,
              ...(activeTab === 'dashboard' ? styles.navBtnActive : {}),
            }}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className="sp-mono"
            style={{
              ...styles.navBtn,
              ...(activeTab === 'history' ? styles.navBtnActive : {}),
            }}
            onClick={() => setActiveTab('history')}
          >
            History {savedCount > 0 && <span style={styles.countBadge}>{savedCount}</span>}
          </button>
          <button
            className="sp-mono"
            style={{
              ...styles.navBtn,
              ...(activeTab === 'about' ? styles.navBtnActive : {}),
            }}
            onClick={() => setActiveTab('about')}
          >
            Methodology
          </button>
        </nav>

        {/* Right Actions */}
        <div style={styles.actions}>
          {hasAnalysis && (
            <button
              className="sp-mono sp-analyze"
              style={styles.actionBtn}
              onClick={onOpenExport}
              title="Export Report as JSON or Markdown"
            >
              <Download size={14} />
              <span className="sp-desktop-only">Export</span>
            </button>
          )}

          <button
            className="sp-mono"
            style={styles.iconBtn}
            onClick={onOpenSettings}
            title="Configure API Key & Engine"
          >
            <Settings size={17} color={COLORS.muted} />
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    borderBottom: `1px solid ${COLORS.border}`,
    background: 'rgba(13, 17, 23, 0.85)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContainer: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    userSelect: 'none',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.02em',
  },
  engineBadge: {
    fontSize: 9.5,
    color: COLORS.accent,
    letterSpacing: '0.12em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '2px 6px',
    borderRadius: 12,
    background: 'rgba(45, 212, 191, 0.08)',
    border: '1px solid rgba(45, 212, 191, 0.25)',
  },
  pulseDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: COLORS.positive,
    boxShadow: `0 0 6px ${COLORS.positive}`,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  navBtn: {
    background: 'transparent',
    border: 'none',
    color: COLORS.muted,
    fontSize: 12.5,
    padding: '6px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  navBtnActive: {
    color: COLORS.accent,
    background: 'rgba(45, 212, 191, 0.08)',
  },
  countBadge: {
    fontSize: 10,
    background: COLORS.surface2,
    color: COLORS.accentWarm,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: '1px 6px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border}`,
    color: COLORS.text,
    borderRadius: 6,
    padding: '7px 12px',
    fontSize: 12,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: '7px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.2s ease',
  },
};
