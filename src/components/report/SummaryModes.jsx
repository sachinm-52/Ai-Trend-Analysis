// ═══════════════════════════════════════════════════
// AI Trend Analyzer — SummaryModes Component (Section 18)
// 6 Persona-Adaptive Summary Perspectives
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { BookOpen, Zap, Compass, GraduationCap, Briefcase, Code, Microscope, Copy, Check } from 'lucide-react';

const MODES = [
  { key: 'quick', label: '30s Quick Brief', icon: Zap, color: '#38BDF8', desc: 'Core takeaway in three sentences' },
  { key: 'deep', label: 'Deep Breakdown', icon: Compass, color: '#A78BFA', desc: 'Comprehensive analytical synthesis' },
  { key: 'student', label: 'For Students', icon: GraduationCap, color: '#34D399', desc: 'Intuitive analogies & zero jargon' },
  { key: 'business', label: 'For Business', icon: Briefcase, color: '#FB923C', desc: 'Market size, ROI & competitive moats' },
  { key: 'builder', label: 'For Builders', icon: Code, color: '#FBBF24', desc: 'Stacks, architectural choices & APIs' },
  { key: 'research', label: 'For Researchers', icon: Microscope, color: '#F472B6', desc: 'Open problems & empirical citations' },
];

export function SummaryModes({ summaryModes }) {
  const [activeKey, setActiveKey] = useState('quick');
  const [copied, setCopied] = useState(false);

  if (!summaryModes) return null;

  const currentMode = MODES.find(m => m.key === activeKey) || MODES[0];
  const content = summaryModes[activeKey] || summaryModes.quick || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionWrapper
      id="sec-summary-modes"
      sectionNum="17"
      title="Adaptive Persona Summaries"
      subtitle="Dynamic re-framing: tailored angles for executives, engineers, students, and researchers"
      icon={BookOpen}
      badgeType="analysis"
      badgeLabel="ADAPTIVE LENS"
      action={
        <button
          onClick={handleCopy}
          className="btn btn-secondary"
          style={{ padding: '5px 10px', fontSize: '11.5px' }}
        >
          {copied ? <Check size={12} style={{ color: 'var(--positive)' }} /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy Lens'}</span>
        </button>
      }
    >
      {/* Mode Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeKey === mode.key;

          return (
            <button
              key={mode.key}
              onClick={() => setActiveKey(mode.key)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                fontSize: '12px',
                padding: '7px 14px',
                gap: '8px',
              }}
            >
              <Icon size={14} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Mode Card */}
      <div
        className="glass-card"
        style={{
          padding: '24px 28px',
          backgroundColor: 'var(--bg-surface-2)',
          border: '1px solid var(--border-bright)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: `${currentMode.color}15`,
              color: currentMode.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <currentMode.icon size={17} />
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {currentMode.label}
            </h4>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {currentMode.desc}
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--text-primary)',
            lineHeight: '1.75',
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {content}
        </p>
      </div>
    </SectionWrapper>
  );
}
