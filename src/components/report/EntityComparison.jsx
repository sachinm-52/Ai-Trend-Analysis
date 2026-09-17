// ═══════════════════════════════════════════════════
// AI Trend Analyzer — EntityComparison Component (Section 15)
// Comparative Multi-Entity Matrix
// ═══════════════════════════════════════════════════

import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Table, Check, X, Minus } from 'lucide-react';

export function EntityComparison({ comparison }) {
  if (!comparison || !comparison.headers || !comparison.rows) return null;

  return (
    <SectionWrapper
      id="sec-comparison"
      sectionNum="16"
      title="Comparative Analysis Matrix"
      subtitle="Side-by-side benchmarking of key platforms, models, architectures, or market leaders"
      icon={Table}
      badgeType="analysis"
      badgeLabel="BENCHMARK MATRIX"
    >
      <div
        className="glass-card scroll-x"
        style={{
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          overflowX: 'auto',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface-2)', borderBottom: '1px solid var(--border)' }}>
              {comparison.headers.map((header, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: '14px 18px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: idx === 0 ? 'var(--text-muted)' : 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                style={{
                  borderBottom: rIdx < comparison.rows.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    style={{
                      padding: '14px 18px',
                      color: cIdx === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: cIdx === 0 ? 600 : 400,
                      lineHeight: '1.5',
                      whiteSpace: cIdx === 0 ? 'nowrap' : 'normal',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
