// ═══════════════════════════════════════════════════
// AI Trend Analyzer — KnowledgeGraph Component (Section 21)
// Interactive SVG Network Visualization
// ═══════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Network, Info, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { buildGraphData } from '../../utils/graphBuilder';

export function KnowledgeGraph({ report }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [zoom, setZoom] = useState(1);

  const { nodes, edges } = useMemo(() => {
    return buildGraphData(report, 740, 480);
  }, [report]);

  if (!nodes || nodes.length === 0) return null;

  const activeNode = selectedNode || hoveredNode;

  return (
    <SectionWrapper
      id="sec-knowledge-graph"
      sectionNum="09"
      title="Interactive Knowledge Graph"
      subtitle="Visualizing the multidimensional web connecting pioneers, organizations, problems, and breakthroughs"
      icon={Network}
      badgeType="analysis"
      badgeLabel="TOPOLOGICAL MAPPING"
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
            className="btn-ghost"
            style={{ padding: '4px' }}
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
            className="btn-ghost"
            style={{ padding: '4px' }}
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={() => { setZoom(1); setSelectedNode(null); }}
            className="btn-ghost"
            style={{ padding: '4px' }}
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      }
    >
      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px',
          fontSize: '11.5px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38BDF8' }} />
          Primary Topic
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#A78BFA' }} />
          Key People
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34D399' }} />
          Organizations / Tech
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F87171' }} />
          Challenges & Gaps
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FB923C' }} />
          Opportunities
        </span>
      </div>

      {/* SVG Canvas */}
      <div
        className="glass-card"
        style={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-base)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
        }}
      >
        <svg
          viewBox="0 0 740 480"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '520px',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease',
          }}
        >
          {/* Subtle Grid Background */}
          <defs>
            <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.4" />
            </pattern>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect width="740" height="480" fill="url(#graph-grid)" />

          {/* Edges */}
          <g>
            {edges.map((edge, idx) => {
              const src = nodes.find(n => n.id === edge.source);
              const tgt = nodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;

              const isHighlighted = activeNode && (activeNode.id === src.id || activeNode.id === tgt.id);

              return (
                <line
                  key={idx}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={isHighlighted ? 'var(--accent)' : 'var(--border-bright)'}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray={isHighlighted ? 'none' : '4 3'}
                  opacity={isHighlighted ? 1 : 0.6}
                  style={{ transition: 'all 0.2s ease' }}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node) => {
              const isSelected = activeNode?.id === node.id;
              const isCenter = node.id === 'center';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer pulse for center */}
                  {isCenter && (
                    <circle
                      r={node.r + 10}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="1.5"
                      opacity="0.3"
                      className="anim-pulse"
                    />
                  )}

                  {/* Highlight aura */}
                  {isSelected && (
                    <circle
                      r={node.r + 6}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    r={node.r}
                    fill="var(--bg-surface)"
                    stroke={node.color}
                    strokeWidth={isCenter ? 3 : 2}
                    filter={isCenter ? 'url(#glow-filter)' : undefined}
                  />

                  {/* Inner color dot */}
                  <circle
                    r={isCenter ? 8 : 5}
                    fill={node.color}
                  />

                  {/* Label */}
                  <text
                    y={node.r + 14}
                    textAnchor="middle"
                    fill={isSelected ? '#FFF' : 'var(--text-secondary)'}
                    fontSize={isCenter ? '12px' : '10px'}
                    fontWeight={isCenter ? '700' : '500'}
                    fontFamily="var(--font-body)"
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.label.length > 18 ? node.label.slice(0, 16) + '...' : node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Detail Overlay */}
        {activeNode && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(15, 21, 32, 0.95)',
              border: `1px solid ${activeNode.color}66`,
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              animation: 'fadeInFast 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: activeNode.color,
                  flexShrink: 0,
                }}
              />
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {activeNode.label}
                </strong>
                {activeNode.sublabel && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    ({activeNode.sublabel})
                  </span>
                )}
                {activeNode.detail && (
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                    {activeNode.detail.contribution || activeNode.detail.role || activeNode.detail.description || ''}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => { setSelectedNode(null); setHoveredNode(null); }}
              className="btn-ghost"
              style={{ fontSize: '11px', padding: '4px 8px' }}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
