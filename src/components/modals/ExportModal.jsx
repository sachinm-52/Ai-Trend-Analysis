// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ExportModal Component
// ═══════════════════════════════════════════════════

import React from 'react';
import { Modal } from '../common/Modal';
import { FileDown, FileText, Printer, Check } from 'lucide-react';
import { exportToJson, exportToMarkdown, triggerPrint } from '../../utils/exporters';

export function ExportModal({ isOpen, onClose, report }) {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Intelligence Report" maxWidth={540}>
      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
        Export the complete synthesized intelligence dossier for <strong>{report.topic}</strong> in your preferred format.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Markdown Export */}
        <div
          onClick={() => {
            exportToMarkdown(report);
            onClose();
          }}
          className="glass-card hover-card"
          style={{
            padding: '16px 20px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>
                Markdown Dossier (.md)
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Clean, readable markdown formatted for Obsidian, Notion, or GitHub
              </span>
            </div>
          </div>
          <FileDown size={18} style={{ color: 'var(--accent)' }} />
        </div>

        {/* JSON Export */}
        <div
          onClick={() => {
            exportToJson(report);
            onClose();
          }}
          className="glass-card hover-card"
          style={{
            padding: '16px 20px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                color: 'var(--accent-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileDown size={20} />
            </div>
            <div>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>
                Structured JSON (.json)
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Machine-readable schema with all 28 sections, nodes, and timelines
              </span>
            </div>
          </div>
          <FileDown size={18} style={{ color: 'var(--accent-2)' }} />
        </div>

        {/* Print / PDF Export */}
        <div
          onClick={() => {
            onClose();
            setTimeout(() => triggerPrint(), 300);
          }}
          className="glass-card hover-card"
          style={{
            padding: '16px 20px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                color: 'var(--positive)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Printer size={20} />
            </div>
            <div>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>
                Print / Save as PDF
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Formatted report view optimized for print and PDF generation
              </span>
            </div>
          </div>
          <Printer size={18} style={{ color: 'var(--positive)' }} />
        </div>
      </div>
    </Modal>
  );
}
