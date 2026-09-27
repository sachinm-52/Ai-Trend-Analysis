// ═══════════════════════════════════════════════════
// AI Trend Analyzer — useChat Hook
// Context-aware Q&A with the current intelligence report
// Includes input sanitization, error fallbacks, and retry
// ═══════════════════════════════════════════════════

import { useState, useCallback, useRef } from 'react';
import { askTrend } from '../services/aiEngine';

// ── Input Sanitization ─────────────────────────────
const MAX_INPUT_LENGTH = 500;

function sanitizeInput(raw) {
  if (typeof raw !== 'string') return '';
  // Strip HTML tags to prevent XSS
  let clean = raw.replace(/<[^>]*>/g, '');
  // Strip control characters (keep printable + newlines)
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  // Collapse excessive whitespace
  clean = clean.replace(/\s{3,}/g, '  ');
  // Trim and enforce max length
  clean = clean.trim().slice(0, MAX_INPUT_LENGTH);
  return clean;
}

// ── Contextual Error Messages ──────────────────────
function getErrorMessage(err, question, report) {
  const topic = report?.topic || 'this topic';
  if (err?.message?.includes('rate') || err?.message?.includes('429')) {
    return `I'm receiving too many requests right now. Please wait a moment and try again. In the meantime, you can browse the verified report sections above for information about "${topic}".`;
  }
  if (err?.message?.includes('network') || err?.message?.includes('fetch') || err?.message?.includes('Failed')) {
    return `I couldn't connect to the AI service. This might be a network issue. Your question about "${question.slice(0, 60)}..." has been noted — please check your connection and try again.`;
  }
  if (err?.message?.includes('401') || err?.message?.includes('403') || err?.message?.includes('key')) {
    return `There's an authentication issue with the AI provider. You can configure your API key in Settings (⚙️) in the top-right corner. Meanwhile, all verified research data about "${topic}" is still available in the sections above.`;
  }
  return `I had trouble processing your question "${question.slice(0, 50)}...". This might be a temporary issue. Please try:\n• Rephrasing your question\n• Making it more specific\n• Checking the report sections above for related information`;
}

export function useChat(report) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your Trend Intelligence assistant for "${report?.topic || 'this topic'}". Ask me anything about its origin, key players, current problems, or future outlook.`,
      timestamp: Date.now(),
    },
  ]);
  const [sending, setSending] = useState(false);
  const lastSendRef = useRef(0);

  const sendMessage = useCallback(async (rawInput) => {
    const userText = sanitizeInput(rawInput);
    if (!userText || sending || !report) return;

    // Prevent rapid double-sends (< 500ms apart)
    const now = Date.now();
    if (now - lastSendRef.current < 500) return;
    lastSendRef.current = now;

    if (userText.length < 2) {
      setMessages(prev => [...prev, {
        id: `hint_${Date.now()}`,
        role: 'assistant',
        content: `Your message is too short. Try asking a full question like "What are the key challenges facing ${report?.topic}?"`,
        timestamp: Date.now(),
      }]);
      return;
    }

    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setSending(true);

    // Attempt with 1 retry
    let lastError = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const reply = await askTrend(userText, report, messages);
        const botMsg = {
          id: `a_${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, botMsg]);
        setSending(false);
        return; // success
      } catch (err) {
        lastError = err;
        console.warn(`Ask Trend attempt ${attempt + 1} failed:`, err.message);
        if (attempt === 0) {
          // Wait briefly before retry
          await new Promise(r => setTimeout(r, 800));
        }
      }
    }

    // Both attempts failed — show contextual error
    const errorMsg = {
      id: `err_${Date.now()}`,
      role: 'assistant',
      content: getErrorMessage(lastError, userText, report),
      isError: true,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, errorMsg]);
    setSending(false);
  }, [report, sending, messages]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: `Chat cleared. Ask me anything about "${report?.topic || 'this topic'}".`,
        timestamp: Date.now(),
      },
    ]);
  }, [report?.topic]);

  return {
    messages,
    sending,
    sendMessage,
    clearChat,
  };
}
