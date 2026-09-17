import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SAMPLE_POST_SETS } from '../../data/samplePosts';
import { COLORS } from '../../utils/formatters';

export function PostsInput({ postsText, setPostsText, onAnalyze, loading }) {
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);

  const postCount = postsText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean).length;

  const handleLoadSample = (index) => {
    setSelectedSetIndex(index);
    const chosen = SAMPLE_POST_SETS[index];
    if (chosen) {
      setPostsText(chosen.posts.join('\n'));
    }
  };

  return (
    <>
      <div style={styles.postsBox}>
        {/* Sample post set quick loaders */}
        <div style={styles.sampleBar}>
          <span className="sp-mono" style={styles.sampleLabel}>
            <Sparkles size={12} color={COLORS.accent} /> Quick load:
          </span>
          <div style={styles.sampleButtons}>
            {SAMPLE_POST_SETS.map((set, idx) => (
              <button
                key={set.title}
                type="button"
                className="sp-mono"
                style={{
                  ...styles.sampleBtn,
                  ...(selectedSetIndex === idx && postsText.includes(set.posts[0])
                    ? styles.sampleBtnActive
                    : {}),
                }}
                onClick={() => handleLoadSample(idx)}
                title={set.description}
              >
                {set.title}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="sp-mono sp-input sp-textarea"
          style={styles.textarea}
          placeholder={
            'paste real posts or comments, one per line…\ne.g.\nBattery life on this thing is unreal, charges in 20 mins\ncharging stations near me are always broken, so annoying\nprice is way too high for what you get honestly'
          }
          value={postsText}
          onChange={(e) => setPostsText(e.target.value)}
          rows={7}
          disabled={loading}
        />

        <div style={styles.postsFooter}>
          <span className="sp-mono" style={styles.postsCount}>
            {postCount} post{postCount === 1 ? '' : 's'}
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            {postsText && (
              <button
                className="sp-mono"
                style={styles.clearBtn}
                onClick={() => setPostsText('')}
                disabled={loading}
              >
                clear
              </button>
            )}
            <button
              className="sp-mono sp-analyze"
              style={{
                ...styles.analyzeBtn,
                opacity: loading || postCount === 0 ? 0.7 : 1,
              }}
              onClick={() => onAnalyze()}
              disabled={loading || postCount === 0}
            >
              {loading ? 'ANALYZING…' : 'ANALYZE POSTS'}
            </button>
          </div>
        </div>
      </div>

      <div className="sp-mono" style={styles.disclaimer}>
        This mode analyzes only the exact text you paste in — real, verbatim posts, not AI-guessed
        ones. Nothing is fetched automatically; copy posts in from wherever you're reading them.
      </div>
    </>
  );
}

const styles = {
  postsBox: {
    maxWidth: 680,
    margin: '0 auto',
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  sampleBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    borderBottom: `1px solid ${COLORS.border}`,
    background: 'rgba(28, 36, 51, 0.4)',
    flexWrap: 'wrap',
  },
  sampleLabel: {
    fontSize: 11,
    color: COLORS.muted,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  sampleButtons: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  sampleBtn: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 12,
    padding: '3px 9px',
    fontSize: 11,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  sampleBtnActive: {
    borderColor: COLORS.accent,
    color: COLORS.accent,
    background: 'rgba(45, 212, 191, 0.08)',
  },
  textarea: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: COLORS.text,
    fontSize: 13.5,
    padding: '16px',
    resize: 'vertical',
    minHeight: 140,
    lineHeight: 1.6,
  },
  postsFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: `1px solid ${COLORS.border}`,
    background: 'rgba(21, 27, 39, 0.7)',
  },
  postsCount: {
    fontSize: 11.5,
    color: COLORS.muted,
  },
  clearBtn: {
    background: 'transparent',
    border: 'none',
    color: COLORS.muted,
    fontSize: 12,
    cursor: 'pointer',
    padding: '6px 10px',
  },
  analyzeBtn: {
    background: COLORS.accent,
    color: '#08120F',
    border: 'none',
    borderRadius: 6,
    padding: '9px 18px',
    fontSize: 12,
    letterSpacing: '0.06em',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 11,
    color: '#5A6377',
    maxWidth: 520,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
    textAlign: 'center',
  },
};
