// ═══════════════════════════════════════════════════
// AI Trend Intelligence — useReport Hook
// Progressive loading, real-time research stages, search-more, deep dive
// ═══════════════════════════════════════════════════

import { useState, useCallback, useRef } from 'react';
import { analyzeTopic, deepDiveTopic, searchMoreTopic, RESEARCH_STAGES } from '../services/aiEngine';

export function useReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeepDiving, setIsDeepDiving] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const abortRef = useRef(false);

  const handleProgress = useCallback((message, progress) => {
    setLoadingMessage(message);
    setLoadingProgress(progress);
  }, []);

  const loadReport = useCallback(async (topicToLoad, mode = 'quick', forceRefresh = false) => {
    if (!topicToLoad || !topicToLoad.trim()) return;
    const term = topicToLoad.trim();
    setCurrentTopic(term);
    setLoading(true);
    setError(null);
    setLoadingMessage(RESEARCH_STAGES[0]);
    setLoadingProgress(0);
    abortRef.current = false;

    try {
      const data = await analyzeTopic(term, handleProgress, mode, forceRefresh);
      if (!abortRef.current) {
        if (!data.success && data.error) {
          setError(data.error);
        } else {
          setReport(data);
        }
      }
    } catch (err) {
      console.error('Failed to load report:', err);
      setError(err.message || "I couldn't verify current information from the web right now. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMessage('');
      setLoadingProgress(0);
    }
  }, [handleProgress]);

  const refreshReport = useCallback(async (topicToRefresh) => {
    if (!topicToRefresh || !topicToRefresh.trim()) return;
    const term = topicToRefresh.trim();
    setIsRefreshing(true);
    setError(null);

    try {
      const data = await analyzeTopic(term, null, 'quick', true);
      if (!data.success && data.error) {
        setError(data.error);
      } else {
        setReport(data);
      }
    } catch (err) {
      console.error('Failed to refresh report:', err);
      setError(err.message || 'Failed to refresh research.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const deepDiveReport = useCallback(async (topicToDeepDive) => {
    if (!topicToDeepDive || !topicToDeepDive.trim()) return;
    const term = topicToDeepDive.trim();
    setIsDeepDiving(true);
    setError(null);

    try {
      const data = await deepDiveTopic(term, handleProgress);
      if (!data.success && data.error) {
        setError(data.error);
      } else {
        setReport(data);
      }
    } catch (err) {
      console.error('Failed to deep dive:', err);
      setError(err.message || 'Deep Dive research failed. Please try again.');
    } finally {
      setIsDeepDiving(false);
    }
  }, [handleProgress]);

  const handleSearchMore = useCallback(async () => {
    if (!report || !currentTopic) return;
    try {
      const moreData = await searchMoreTopic(currentTopic, report.sources || []);
      if (moreData && moreData.newSources && moreData.newSources.length > 0) {
        setReport(prev => ({
          ...prev,
          sources: [...(prev.sources || []), ...moreData.newSources],
          evidenceAudit: {
            ...prev.evidenceAudit,
            totalSources: (prev.sources?.length || 0) + moreData.newSources.length,
            reasons: [
              ...(prev.evidenceAudit?.reasons || []),
              `Added ${moreData.newSources.length} additional sources via Search More`,
            ],
          },
        }));
      }
    } catch (e) {
      console.warn('Search more failed:', e);
    }
  }, [report, currentTopic]);

  const resetReport = useCallback(() => {
    abortRef.current = true;
    setReport(null);
    setCurrentTopic('');
    setError(null);
    setIsRefreshing(false);
    setIsDeepDiving(false);
    setLoadingMessage('');
    setLoadingProgress(0);
  }, []);

  return {
    report,
    loading,
    error,
    currentTopic,
    loadReport,
    refreshReport,
    deepDiveReport,
    searchMore: handleSearchMore,
    isRefreshing,
    isDeepDiving,
    resetReport,
    loadingMessage,
    loadingProgress,
  };
}
