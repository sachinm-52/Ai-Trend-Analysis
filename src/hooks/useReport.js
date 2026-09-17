// ═══════════════════════════════════════════════════
// AI Trend Analyzer — useReport Hook
// ═══════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import { analyzeTopic } from '../services/aiEngine';

export function useReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');

  const loadReport = useCallback(async (topicToLoad) => {
    if (!topicToLoad || !topicToLoad.trim()) return;
    const term = topicToLoad.trim();
    setCurrentTopic(term);
    setLoading(true);
    setError(null);

    try {
      const data = await analyzeTopic(term);
      setReport(data);
    } catch (err) {
      console.error('Failed to load report:', err);
      setError(err.message || 'Failed to generate trend intelligence. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetReport = useCallback(() => {
    setReport(null);
    setCurrentTopic('');
    setError(null);
  }, []);

  return {
    report,
    loading,
    error,
    currentTopic,
    loadReport,
    resetReport,
  };
}
