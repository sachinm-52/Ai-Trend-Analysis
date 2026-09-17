// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ErrorState Component
// ═══════════════════════════════════════════════════

import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export function ErrorState({ message, onRetry, onBack }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '48px 32px',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '60px auto',
        border: '1px solid rgba(248, 113, 113, 0.3)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(248, 113, 113, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'var(--negative)',
        }}
      >
        <AlertCircle size={28} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          marginBottom: '10px',
          color: 'var(--text-primary)',
        }}
      >
        Unable to Generate Intelligence Report
      </h3>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          marginBottom: '28px',
          lineHeight: '1.6',
        }}
      >
        {message || 'An unexpected error occurred while analyzing the trend data. Please verify your connection or settings.'}
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {onBack && (
          <button onClick={onBack} className="btn btn-secondary">
            <ArrowLeft size={16} />
            Back to Search
          </button>
        )}
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary">
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
