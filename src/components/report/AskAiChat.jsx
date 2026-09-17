import React from 'react';
import { Send, HelpCircle } from 'lucide-react';
import { ReportSection } from './ReportSection';
import { COLORS } from '../../utils/formatters';

const SUGGESTED_QUESTIONS = [
  'Why is negative sentiment rising?',
  'What is the primary driver of positive perception?',
  'Which trend poses the highest strategic risk?',
  'Summarize the emotional signature in one sentence.',
];

export function AskAiChat({
  chat,
  chatInput,
  setChatInput,
  chatLoading,
  chatEndRef,
  onSendQuestion,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSendQuestion();
    }
  };

  return (
    <ReportSection num="07" title="Ask AI">
      <div style={styles.chatBox}>
        <div style={styles.chatMessages}>
          {chat.length === 0 && (
            <div style={styles.emptyContainer}>
              <div className="sp-mono" style={styles.chatEmpty}>
                ask a follow-up — e.g. "why is negative sentiment rising?"
              </div>
              <div style={styles.suggestions}>
                <span className="sp-mono" style={styles.suggLabel}>
                  <HelpCircle size={11} /> Suggested questions:
                </span>
                <div style={styles.chipGroup}>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      className="sp-mono"
                      style={styles.suggChip}
                      onClick={() => onSendQuestion(q)}
                      disabled={chatLoading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {chat.map((m, i) => (
            <div
              key={i}
              style={m.role === 'user' ? styles.chatUser : styles.chatAssistant}
            >
              <span className="sp-mono" style={styles.chatRole}>
                {m.role === 'user' ? 'you' : 'ai'}
              </span>
              <div style={styles.chatBubble}>
                <span style={styles.chatText}>{m.content}</span>
              </div>
            </div>
          ))}

          {chatLoading && (
            <div style={styles.chatAssistant}>
              <span className="sp-mono" style={styles.chatRole}>
                ai
              </span>
              <div style={styles.chatBubble}>
                <span className="sp-mono" style={styles.chatThinking}>
                  evaluating signal…
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div style={styles.chatInputRow}>
          <input
            className="sp-chat-input"
            style={styles.chatInput}
            placeholder="ask about this analysis…"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={chatLoading}
          />
          <button
            className="sp-mono sp-send"
            style={{
              ...styles.sendBtn,
              opacity: chatLoading || !chatInput.trim() ? 0.5 : 1,
            }}
            onClick={() => onSendQuestion()}
            disabled={chatLoading || !chatInput.trim()}
          >
            <Send size={13} style={{ marginRight: 4 }} />
            ask
          </button>
        </div>
      </div>
    </ReportSection>
  );
}

const styles = {
  chatBox: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    overflow: 'hidden',
  },
  chatMessages: {
    maxHeight: 320,
    overflowY: 'auto',
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '8px 0',
  },
  chatEmpty: {
    color: '#5A6377',
    fontSize: 12.5,
  },
  suggestions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  suggLabel: {
    fontSize: 11,
    color: COLORS.muted,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
  },
  chipGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  suggChip: {
    background: 'rgba(28, 36, 51, 0.6)',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 14,
    padding: '4px 10px',
    fontSize: 11,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  chatUser: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  chatAssistant: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  chatRole: {
    fontSize: 9.5,
    color: COLORS.accent,
    marginBottom: 3,
    letterSpacing: '0.08em',
  },
  chatBubble: {
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '10px 14px',
  },
  chatText: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: COLORS.text,
  },
  chatThinking: {
    fontSize: 12,
    color: COLORS.accent,
    animation: 'signalBlink 1.5s infinite',
  },
  chatInputRow: {
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${COLORS.border}`,
    padding: '10px 14px',
    gap: 10,
    background: 'rgba(21, 27, 39, 0.95)',
  },
  chatInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: COLORS.text,
    fontSize: 13.5,
    padding: '6px 4px',
  },
  sendBtn: {
    background: 'transparent',
    border: 'none',
    color: COLORS.muted,
    fontSize: 12,
    cursor: 'pointer',
    letterSpacing: '0.06em',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 10px',
  },
};
