import React from 'react';
import { COLORS } from '../../utils/formatters';

export function ModeToggle({ mode, onModeChange }) {
  return (
    <div style={styles.modeToggle}>
      <button
        className="sp-mono"
        style={{
          ...styles.modeBtn,
          ...(mode === 'topic' ? styles.modeBtnActive : {}),
        }}
        onClick={() => onModeChange('topic')}
      >
        analyze a topic
      </button>
      <button
        className="sp-mono"
        style={{
          ...styles.modeBtn,
          ...(mode === 'posts' ? styles.modeBtnActive : {}),
        }}
        onClick={() => onModeChange('posts')}
      >
        analyze real posts
      </button>
    </div>
  );
}

const styles = {
  modeToggle: {
    display: 'inline-flex',
    gap: 8,
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  modeBtn: {
    background: 'transparent',
    border: 'none',
    color: COLORS.muted,
    fontSize: 12,
    padding: '7px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  modeBtnActive: {
    background: COLORS.surface2,
    color: COLORS.accent,
    fontWeight: 500,
  },
};
