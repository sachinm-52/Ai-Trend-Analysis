// ═══════════════════════════════════════════════════
// AI Trend Intelligence — ExploreFollowUps Component
// "Explore This Topic" System (Requirement #8)
// Automatically generated follow-up questions that trigger NEW live web searches
// ═══════════════════════════════════════════════════

import React from 'react';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export function ExploreFollowUps({ followUpQuestions = [], topic, onSelectTopic }) {
  if (!followUpQuestions || followUpQuestions.length === 0) return null;

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 28px',
        border: '1px solid var(--border-bright)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        marginBottom: '32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)',
        }}>
          <Compass size={16} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            🧭 Explore This Topic (Follow-Up Research)
          </h3>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Click any question below to launch a <strong>new live web search</strong> and research deeper into specific dimensions of {topic}:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
        {followUpQuestions.map((q, idx) => {
          const text = typeof q === 'string' ? q : q.question;
          const searchQuery = q.searchQuery || text;

          return (
            <button
              key={idx}
              onClick={() => onSelectTopic(searchQuery)}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                textAlign: 'left',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface-2)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.18s ease',
                gap: '12px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>{text}</span>
              </div>
              <ArrowRight size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
