// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Skeleton Loader
// Elegant shimmering skeleton states
// ═══════════════════════════════════════════════════

import React from 'react';

export function SkeletonLoader({ type = 'card', count = 1 }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'hero') {
    return (
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="skeleton" style={{ height: '32px', width: '220px' }} />
        <div className="skeleton" style={{ height: '56px', width: '70%' }} />
        <div className="skeleton" style={{ height: '24px', width: '90%' }} />
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '999px' }} />
          <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '999px' }} />
          <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '999px' }} />
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {items.map(i => (
          <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="skeleton" style={{ height: '20px', width: '60%' }} />
              <div className="skeleton" style={{ height: '20px', width: '20%' }} />
            </div>
            <div className="skeleton" style={{ height: '14px', width: '100%' }} />
            <div className="skeleton" style={{ height: '14px', width: '80%' }} />
            <div className="skeleton" style={{ height: '30px', width: '40%', marginTop: '8px' }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'timeline') {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {items.map(i => (
          <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div className="skeleton" style={{ width: '60px', height: '24px', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="skeleton" style={{ height: '20px', width: '40%' }} />
              <div className="skeleton" style={{ height: '14px', width: '90%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map(i => (
        <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="skeleton" style={{ height: '24px', width: '45%' }} />
          <div className="skeleton" style={{ height: '16px', width: '100%' }} />
          <div className="skeleton" style={{ height: '16px', width: '85%' }} />
          <div className="skeleton" style={{ height: '16px', width: '60%' }} />
        </div>
      ))}
    </div>
  );
}
