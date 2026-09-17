import React, { useState, useEffect } from 'react';
import { Key, Server, Cpu, ShieldCheck, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { getStoredSettings, saveStoredSettings } from '../../utils/storage';
import { COLORS } from '../../utils/formatters';

export function ApiConfigModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('claude-sonnet-4-6');
  const [apiUrl, setApiUrl] = useState('https://api.anthropic.com/v1/messages');
  const [useMockFallback, setUseMockFallback] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getStoredSettings();
      setApiKey(current.apiKey || '');
      setModel(current.model || 'claude-sonnet-4-6');
      setApiUrl(current.apiUrl || 'https://api.anthropic.com/v1/messages');
      setUseMockFallback(current.useMockFallback ?? true);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    saveStoredSettings({
      apiKey: apiKey.trim(),
      model: model.trim(),
      apiUrl: apiUrl.trim(),
      useMockFallback,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKey('');
    saveStoredSettings({
      apiKey: '',
      model: 'claude-sonnet-4-6',
      apiUrl: 'https://api.anthropic.com/v1/messages',
      useMockFallback: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Engine Configuration" maxWidth={560}>
      <div style={styles.container}>
        <p style={styles.desc}>
          Configure your Anthropic Claude credentials or use the built-in offline simulation engine.
          Keys are stored locally in your browser's private local storage.
        </p>

        <div style={styles.formGroup}>
          <label className="sp-mono" style={styles.label}>
            <Key size={13} color={COLORS.accent} /> ANTHROPIC API KEY
          </label>
          <input
            type="password"
            className="sp-mono sp-input"
            style={styles.input}
            placeholder="sk-ant-api03-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <span style={styles.hint}>
            Leave blank to use the built-in intelligent mock simulation.
          </span>
        </div>

        <div style={styles.formGroup}>
          <label className="sp-mono" style={styles.label}>
            <Cpu size={13} color={COLORS.accent} /> MODEL
          </label>
          <select
            className="sp-mono sp-input"
            style={styles.select}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="claude-sonnet-4-6">claude-sonnet-4-6 (Recommended)</option>
            <option value="claude-3-7-sonnet-20250219">claude-3-7-sonnet-20250219</option>
            <option value="claude-3-5-haiku-20241022">claude-3-5-haiku-20241022</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label className="sp-mono" style={styles.label}>
            <Server size={13} color={COLORS.accent} /> API ENDPOINT (OR PROXY)
          </label>
          <input
            type="text"
            className="sp-mono sp-input"
            style={styles.input}
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>

        <div style={styles.checkboxRow}>
          <input
            type="checkbox"
            id="fallbackCheck"
            checked={useMockFallback}
            onChange={(e) => setUseMockFallback(e.target.checked)}
            style={{ accentColor: COLORS.accent }}
          />
          <label htmlFor="fallbackCheck" className="sp-mono" style={styles.checkLabel}>
            Fallback to offline mock engine if API rate limits or network issues occur
          </label>
        </div>

        <div style={styles.buttonRow}>
          {apiKey && (
            <button
              type="button"
              className="sp-mono"
              style={styles.clearBtn}
              onClick={handleClear}
            >
              Clear Key
            </button>
          )}
          <div style={{ flex: 1 }} />
          <button type="button" className="sp-mono" style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="sp-mono sp-analyze"
            style={styles.saveBtn}
            onClick={handleSave}
          >
            {savedSuccess ? (
              <>
                <Check size={14} /> Saved!
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  desc: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 1.55,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 11,
    color: COLORS.text,
    letterSpacing: '0.06em',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  input: {
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: '9px 12px',
    color: COLORS.text,
    fontSize: 13,
  },
  select: {
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: '9px 12px',
    color: COLORS.text,
    fontSize: 13,
  },
  hint: {
    fontSize: 11,
    color: '#5A6377',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  checkLabel: {
    fontSize: 11.5,
    color: COLORS.muted,
    cursor: 'pointer',
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingTop: 14,
    borderTop: `1px solid ${COLORS.border}`,
  },
  cancelBtn: {
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 12,
    cursor: 'pointer',
  },
  clearBtn: {
    background: 'transparent',
    border: 'none',
    color: COLORS.negative,
    fontSize: 12,
    cursor: 'pointer',
    padding: '6px 8px',
  },
  saveBtn: {
    background: COLORS.accent,
    color: '#08120F',
    border: 'none',
    borderRadius: 6,
    padding: '8px 18px',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
};
