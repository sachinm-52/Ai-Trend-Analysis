// ═══════════════════════════════════════════════════
// AI Trend Analyzer — usePersistence Hook
// Theme, bookmarks, history, and personalization
// ═══════════════════════════════════════════════════

import { useState, useEffect } from 'react';

const THEME_KEY = 'aitrend_theme';
const BOOKMARKS_KEY = 'aitrend_bookmarks';
const HISTORY_KEY = 'aitrend_history';

export function usePersistence() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBookmark = (topic) => {
    setBookmarks(prev => {
      const exists = prev.includes(topic);
      const next = exists ? prev.filter(t => t !== topic) : [...prev, topic];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isBookmarked = (topic) => bookmarks.includes(topic);

  const addHistory = (topic, category) => {
    setHistory(prev => {
      const next = [
        { topic, category, timestamp: Date.now() },
        ...prev.filter(h => h.topic.toLowerCase() !== topic.toLowerCase()),
      ].slice(0, 20);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const removeHistory = (topic) => {
    setHistory(prev => {
      const next = prev.filter(h => h.topic !== topic);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {}
  };

  return {
    theme,
    toggleTheme,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    history,
    addHistory,
    removeHistory,
    clearHistory,
  };
}
