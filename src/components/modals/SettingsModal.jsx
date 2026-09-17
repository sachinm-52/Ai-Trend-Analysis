// ═══════════════════════════════════════════════════
// AI Trend Analyzer — SettingsModal Component
// AI Provider Configuration & Preferences
// ═══════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Settings, Key, Cpu, Sparkles, Check, AlertCircle } from 'lucide-react';
import { getSettings, saveSettings } from '../../services/aiEngine';

export function SettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getSettings());
      setSaved(false);
    }
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(config);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Intelligence Engine Settings" maxWidth={560}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Provider Radio Tabs */}
        <div>
          <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            PRIMARY AI PROVIDER
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[
              { key: 'anthropic', label: 'Anthropic Claude' },
              { key: 'openai', label: 'OpenAI GPT-4o' },
              { key: 'demo', label: 'Demo / Model Only' },
            ].map((p) => {
              const isSelected = config.provider === p.key;
              return (
                <button
                  type="button"
                  key={p.key}
                  onClick={() => setConfig(prev => ({ ...prev, provider: p.key }))}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '12px', padding: '8px 10px', justifyContent: 'center' }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Anthropic Key Input */}
        {config.provider === 'anthropic' && (
          <div>
            <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              ANTHROPIC API KEY
            </label>
            <div style={{ position: 'relative' }}>
              <Key size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="sk-ant-api03-..."
                value={config.anthropicKey || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, anthropicKey: e.target.value }))}
                className="input-base"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Stored locally in browser localStorage. Never sent to any external server.
            </span>
          </div>
        )}

        {/* OpenAI Key Input */}
        {config.provider === 'openai' && (
          <div>
            <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              OPENAI API KEY
            </label>
            <div style={{ position: 'relative' }}>
              <Key size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="sk-proj-..."
                value={config.openaiKey || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, openaiKey: e.target.value }))}
                className="input-base"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Stored locally in browser localStorage.
            </span>
          </div>
        )}

        {/* Demo Mode Notice */}
        {config.provider === 'demo' && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}
          >
            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>
              Zero-Configuration Mode
            </strong>
            The platform will generate comprehensive, high-fidelity trend reports for any topic using intelligent local models and pre-compiled datasets. No API keys required.
          </div>
        )}

        {/* Fallback Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <input
            type="checkbox"
            checked={config.useMockFallback}
            onChange={(e) => setConfig(prev => ({ ...prev, useMockFallback: e.target.checked }))}
            style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }}
          />
          <span>Automatically fall back to local trend intelligence model if live API call fails</span>
        </label>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {saved ? (
              <>
                <Check size={14} />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Settings</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
