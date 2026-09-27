// ═══════════════════════════════════════════════════
// AI Trend Analyzer — App Root Component
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Topbar } from './components/layout/Topbar';
import { LandingPage } from './pages/LandingPage';
import { ReportPage } from './pages/ReportPage';
import { ExportModal } from './components/modals/ExportModal';
import { SettingsModal } from './components/modals/SettingsModal';

import { useReport } from './hooks/useReport';
import { useSearch } from './hooks/useSearch';
import { usePersistence } from './hooks/usePersistence';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'report'
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    report,
    loading,
    error,
    currentTopic,
    loadReport,
    refreshReport,
    deepDiveReport,
    searchMore,
    isRefreshing,
    isDeepDiving,
    resetReport,
    loadingMessage,
    loadingProgress,
  } = useReport();

  const { theme, toggleTheme, isBookmarked, toggleBookmark, history, addHistory } = usePersistence();

  const handleSearch = async (term, mode = 'quick') => {
    if (!term || !term.trim()) return;
    setView('report');
    await loadReport(term, mode);
    addHistory(term);
  };

  const handleGoHome = () => {
    setView('landing');
    resetReport();
  };

  const handleRefresh = async () => {
    if (!currentTopic) return;
    await refreshReport(currentTopic);
  };

  const handleDeepDive = async () => {
    if (!currentTopic) return;
    await deepDiveReport(currentTopic);
  };

  const {
    recentSearches,
    removeRecent,
    clearRecent,
  } = useSearch(handleSearch);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Topbar */}
      <Topbar
        onGoHome={handleGoHome}
        showSearch={view === 'report'}
        onSearch={handleSearch}
        topic={currentTopic}
        report={report}
        isBookmarked={isBookmarked(currentTopic)}
        onToggleBookmark={() => toggleBookmark(currentTopic)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* View Router */}
      <div style={{ flex: 1 }}>
        {view === 'landing' ? (
          <LandingPage
            onSearch={handleSearch}
            recentSearches={recentSearches}
            onSelectRecent={handleSearch}
            onRemoveRecent={removeRecent}
            onClearRecent={clearRecent}
          />
        ) : (
          <ReportPage
            report={report}
            loading={loading}
            error={error}
            onRetry={() => loadReport(currentTopic)}
            onBack={handleGoHome}
            onSelectTopic={handleSearch}
            onRefresh={handleRefresh}
            onDeepDive={handleDeepDive}
            onSearchMore={searchMore}
            isRefreshing={isRefreshing}
            isDeepDiving={isDeepDiving}
            currentTopic={currentTopic}
            loadingMessage={loadingMessage}
            loadingProgress={loadingProgress}
          />
        )}
      </div>

      {/* Global Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        report={report}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
