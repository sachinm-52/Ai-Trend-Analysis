// ═══════════════════════════════════════════════════
// AI Trend Analyzer — useChat Hook
// Context-aware Q&A with the current intelligence report
// ═══════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import { askTrend } from '../services/aiEngine';

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

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || sending || !report) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: userText.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setSending(true);

    try {
      const reply = await askTrend(userText, report, messages);
      const botMsg = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: 'I had trouble processing that query. Please try rephrasing your question.',
        isError: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
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
