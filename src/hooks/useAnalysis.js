import { useState, useCallback } from 'react';
import { analyzeTopicService, analyzePostsService } from '../services/aiService';
import { saveAnalysisToHistory } from '../utils/storage';

export function useAnalysis() {
  const [mode, setMode] = useState('topic'); // 'topic' | 'posts'
  const [topic, setTopic] = useState('');
  const [postsText, setPostsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const runTopicAnalysis = useCallback(
    async (overrideTopic) => {
      const target = (overrideTopic ?? topic).trim();
      if (!target || loading) return;

      setTopic(target);
      setLoading(true);
      setError(null);
      setAnalysis(null);

      try {
        const result = await analyzeTopicService(target);
        setAnalysis(result);
        saveAnalysisToHistory(result);
      } catch (err) {
        console.error('Topic analysis error:', err);
        setError("Couldn't generate an analysis for that topic. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [topic, loading]
  );

  const runPostsAnalysis = useCallback(async () => {
    const lines = postsText.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0 || loading) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzePostsService(lines);
      setAnalysis(result);
      saveAnalysisToHistory(result);
    } catch (err) {
      console.error('Posts analysis error:', err);
      setError("Couldn't analyze those posts. Try again.");
    } finally {
      setLoading(false);
    }
  }, [postsText, loading]);

  const runAnalysis = useCallback(
    (target) => {
      if (mode === 'topic') {
        runTopicAnalysis(target);
      } else {
        runPostsAnalysis();
      }
    },
    [mode, runTopicAnalysis, runPostsAnalysis]
  );

  const loadSavedAnalysis = useCallback((savedItem) => {
    setAnalysis(savedItem);
    if (savedItem._mode === 'posts') {
      setMode('posts');
    } else {
      setMode('topic');
      setTopic(savedItem.topic || '');
    }
    setError(null);
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return {
    mode,
    setMode,
    topic,
    setTopic,
    postsText,
    setPostsText,
    loading,
    error,
    setError,
    analysis,
    setAnalysis,
    runAnalysis,
    runTopicAnalysis,
    runPostsAnalysis,
    loadSavedAnalysis,
    resetAnalysis,
  };
}
