// ═══════════════════════════════════════════════════
// AI Trend Analyzer — useSearch Hook
// ═══════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { EXAMPLE_TOPICS } from '../data/mockDatabase';

const RECENT_KEY = 'aitrend_recent_searches_v2';

export function useSearch(onSearch) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveRecent = (term) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches(prev => {
      const updated = [clean, ...prev.filter(t => t.toLowerCase() !== clean.toLowerCase())].slice(0, 10);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeRecent = (term) => {
    setRecentSearches(prev => {
      const updated = prev.filter(t => t !== term);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch (e) {}
  };

  const handleSearch = (term) => {
    const finalTerm = (term || query).trim();
    if (!finalTerm) return;
    saveRecent(finalTerm);
    if (onSearch) onSearch(finalTerm);
  };

  const handleInputChange = (val) => {
    setQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    const q = val.toLowerCase();
    const matched = EXAMPLE_TOPICS.filter(t => t.toLowerCase().includes(q));
    setSuggestions(matched.slice(0, 5));
  };

  return {
    query,
    setQuery,
    recentSearches,
    suggestions,
    handleInputChange,
    handleSearch,
    removeRecent,
    clearRecent,
  };
}
