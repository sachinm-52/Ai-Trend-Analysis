// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Topbar Component
// Sticky top header with navigation, actions, and search
// ═══════════════════════════════════════════════════

import React from 'react';
import {
  Compass,
  ArrowLeft,
  Search,
  Bookmark,
  BookmarkCheck,
  Download,
  Settings,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function Topbar({
  onGoHome,
  showSearch = false,
  onSearch,
  topic = '',
  report = null,
  isBookmarked = false,
  onToggleBookmark,
  onOpenExport,
  onOpenSettings,
  theme = 'dark',
  onToggleTheme,
}) {
  const [searchInput, setSearchInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() && onSearch) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Left: Brand or Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {showSearch ? (
            <button
              onClick={onGoHome}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12.5px' }}
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </button>
          ) : null}

          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onGoHome(); }}
            aria-label="Go to Trend Intelligence home page"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#020B0E',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)',
              }}
            >
              <Compass size={20} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                Trend Intelligence
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  marginLeft: '6px',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                PLATFORM
              </span>
            </div>
          </a>
        </div>

        {/* Center: Search (if in report mode) */}
        {showSearch && (
          <form
            onSubmit={handleSubmit}
            style={{
              flex: '1',
              maxWidth: '480px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
            className="hide-mobile"
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              className="input-base"
              placeholder={`Search another trend... (e.g. NVIDIA, Quantum Computing)`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                paddingLeft: '36px',
                paddingTop: '7px',
                paddingBottom: '7px',
                fontSize: '13px',
              }}
            />
          </form>
        )}

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {report && (
            <>
              {report._source === 'demo' && (
                <Badge type="demo" label="DEMO MODE" size="xs" />
              )}
              {report.confidence && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                  className="hide-mobile"
                >
                  {report.confidence}% CONFIDENCE
                </span>
              )}
              <button
                onClick={onToggleBookmark}
                className="btn-ghost"
                style={{
                  padding: '7px',
                  borderRadius: 'var(--radius-md)',
                  color: isBookmarked ? 'var(--accent)' : 'var(--text-secondary)',
                }}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Topic'}
              >
                {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>

              <button
                onClick={onOpenExport}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
                title="Export Intelligence Report"
              >
                <Download size={14} />
                <span className="hide-mobile">Export</span>
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="btn-ghost"
            style={{
              padding: '7px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="btn-ghost"
            style={{
              padding: '7px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
            }}
            title="Settings & API Key"
            aria-label="Settings"
          >
            <Settings size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
