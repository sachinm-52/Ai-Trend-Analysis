import React from 'react';
import { EXAMPLES } from '../../data/mockData';
import { COLORS } from '../../utils/formatters';

export function TopicInput({ topic, setTopic, onAnalyze, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAnalyze();
    }
  };

  return (
    <>
      <div className="sp-command-bar" style={styles.commandBar}>
        <span className="sp-mono" style={styles.prompt}>
          &gt;
        </span>
        <input
          className="sp-mono sp-input"
          style={styles.input}
          placeholder="analyze a topic…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          autoFocus
        />
        <button
          className="sp-mono sp-analyze"
          style={{
            ...styles.analyzeBtn,
            opacity: loading || !topic.trim() ? 0.7 : 1,
          }}
          onClick={() => onAnalyze()}
          disabled={loading || !topic.trim()}
        >
          {loading ? 'ANALYZING…' : 'ANALYZE'}
        </button>
      </div>

      <div style={styles.chips}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="sp-mono sp-chip"
            style={styles.chip}
            onClick={() => onAnalyze(ex)}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="sp-mono" style={styles.disclaimer}>
        AI-reasoned synthesis from Claude — not connected to live social data. Paste real posts
        instead, or swap in a real feed (X/Reddit/news APIs), to make this a live pipeline.
      </div>
    </>
  );
}

const styles = {
  commandBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    maxWidth: 560,
    margin: '0 auto',
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '10px 14px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
  },
  prompt: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: 600,
    userSelect: 'none',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: COLORS.text,
    fontSize: 15,
    padding: '6px 0',
    borderBottom: '1px solid transparent',
  },
  analyzeBtn: {
    background: COLORS.accent,
    color: '#08120F',
    border: 'none',
    borderRadius: 6,
    padding: '9px 16px',
    fontSize: 12,
    letterSpacing: '0.06em',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 18,
  },
  chip: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 20,
    padding: '6px 13px',
    fontSize: 11.5,
    cursor: 'pointer',
  },
  disclaimer: {
    marginTop: 22,
    fontSize: 11,
    color: '#5A6377',
    maxWidth: 480,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
};
