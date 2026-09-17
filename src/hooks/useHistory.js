import { useState, useEffect, useCallback } from 'react';
import {
  getSavedHistory,
  removeAnalysisFromHistory,
  clearAllHistory,
} from '../utils/storage';

export function useHistory() {
  const [history, setHistory] = useState([]);

  const refreshHistory = useCallback(() => {
    setHistory(getSavedHistory());
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const removeHistoryItem = useCallback((id) => {
    const updated = removeAnalysisFromHistory(id);
    setHistory(updated);
  }, []);

  const clearHistory = useCallback(() => {
    clearAllHistory();
    setHistory([]);
  }, []);

  return {
    history,
    refreshHistory,
    removeHistoryItem,
    clearHistory,
  };
}
