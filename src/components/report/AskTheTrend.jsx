// ═══════════════════════════════════════════════════
// AI Trend Analyzer — AskTheTrend Component (Section 24)
// Context-Aware Conversational Intelligence Agent
// ═══════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { HelpCircle, Send, Sparkles, Trash2, Bot, User } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

export function AskTheTrend({ report, followUpQuestions = [] }) {
  const { messages, sending, sendMessage, clearChat } = useChat(report);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll internally within the chat box when user actively sends a message
    if (messages.length > 1 || sending) {
      scrollToBottom();
    }
  }, [messages, sending]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !sending) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleChipClick = (q) => {
    if (!sending) {
      sendMessage(q);
    }
  };

  return (
    <SectionWrapper
      id="sec-ask-trend"
      sectionNum="19"
      title="Ask The Trend"
      subtitle="Context-grounded conversational analyst: interrogate the data, stress-test claims, or explore edge cases"
      icon={HelpCircle}
      badgeType="analysis"
      badgeLabel="INTERACTIVE ANALYST"
      action={
        <button
          onClick={clearChat}
          className="btn-ghost"
          style={{ fontSize: '11px', padding: '4px 8px', color: 'var(--text-muted)' }}
          title="Clear chat history"
        >
          <Trash2 size={12} style={{ marginRight: '4px' }} />
          Reset Chat
        </button>
      }
    >
      <div
        className="glass-card"
        style={{
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '480px',
        }}
      >
        {/* Messages Stream */}
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Bot size={15} />
                  </div>
                )}

                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    backgroundColor: isUser ? 'var(--accent)' : 'var(--bg-surface-2)',
                    color: isUser ? 'var(--text-on-accent)' : 'var(--text-primary)',
                    fontSize: '13.5px',
                    lineHeight: '1.6',
                    border: isUser ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {m.content}
                </div>

                {isUser && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-surface-3)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <User size={15} />
                  </div>
                )}
              </div>
            );
          })}

          {sending && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-start' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={15} />
              </div>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--bg-surface-2)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={13} className="anim-spin" />
                Synthesizing response from intelligence report...
              </div>
            </div>
          )}
        </div>

        {/* Suggested Follow-up Chips */}
        {followUpQuestions && followUpQuestions.length > 0 && (
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--bg-surface-2)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={11} /> Suggested:
            </span>
            {followUpQuestions.slice(0, 4).map((fq, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(fq.question)}
                className="tag"
                style={{ fontSize: '11.5px', padding: '3px 10px', cursor: 'pointer' }}
                disabled={sending}
              >
                {fq.question}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask anything about ${report?.topic || 'this trend'}...`}
            className="input-base"
            style={{ fontSize: '13.5px' }}
            disabled={sending}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!input.trim() || sending}
            style={{ padding: '0 16px' }}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
}
