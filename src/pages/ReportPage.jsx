// ═══════════════════════════════════════════════════
// AI Trend Intelligence Platform — ReportPage
// Real-Time Verified Research Engine Layout
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { ErrorState } from '../components/common/ErrorState';

// Verified Research Engine Modules
import { SearchHeader } from '../components/report/SearchHeader';
import { ResearchSummarySection } from '../components/report/ResearchSummarySection';
import { OfficialSourcesSection } from '../components/report/OfficialSourcesSection';
import { FactOpinionMatrix } from '../components/report/FactOpinionMatrix';
import { VisualMediaGrid } from '../components/report/VisualMediaGrid';
import { ExploreFollowUps } from '../components/report/ExploreFollowUps';

// Deep Intelligence Sections
import { TopicProfile } from '../components/report/TopicProfile';
import { PPFConnector } from '../components/report/PastPresentFutureConnector';
import { PastSection } from '../components/report/PastSection';
import { PresentSection } from '../components/report/PresentSection';
import { FutureSection } from '../components/report/FutureSection';
import { TrendDNA } from '../components/report/TrendDNA';
import { TimeMachine } from '../components/report/TimeMachine';
import { KnowledgeGraph } from '../components/report/KnowledgeGraph';
import { RiskAndOpportunityRadar } from '../components/report/RiskAndOpportunityRadar';
import { BuildSomethingFromThis } from '../components/report/BuildSomethingFromThis';
import { ResourceHub } from '../components/report/ResourceHub';
import { SummaryModes } from '../components/report/SummaryModes';
import { AskTheTrend } from '../components/report/AskTheTrend';
import { SourcePanel } from '../components/report/SourcePanel';

// Evidence Explorer Modal
import { EvidenceExplorerModal, useEvidenceExplorer } from '../components/report/EvidenceExplorerModal';

// Progressive Loader Component (Requirement #25)
function ProgressiveLoader({ topic, loadingMessage }) {
  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{
        padding: '28px 32px',
        marginBottom: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-bright)',
        background: 'linear-gradient(135deg, rgba(15,21,32,0.95), rgba(20,28,50,0.9))',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 10px var(--accent)',
            animation: 'pulse 1.2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.08em',
          }}>
            REAL-TIME WEB RESEARCH & VERIFICATION
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 3.5vw, 32px)',
          fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 12px',
        }}>
          {topic || 'Investigating...'}
        </h2>

        {loadingMessage && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(56,189,248,0.06)',
            border: '1px solid rgba(56,189,248,0.2)',
            fontSize: '13.5px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'var(--accent)' }}>⚡</span>
            <span>{loadingMessage}</span>
          </div>
        )}

        <SkeletonLoader type="hero" />
      </div>

      <div style={{ marginTop: '24px' }}>
        <SkeletonLoader type="grid" count={4} />
      </div>
    </div>
  );
}

export function ReportPage({
  report,
  loading,
  error,
  onRetry,
  onBack,
  onSelectTopic,
  onRefresh,
  onDeepDive,
  onSearchMore,
  isRefreshing,
  isDeepDiving,
  currentTopic,
  loadingMessage,
}) {
  const [activeSection, setActiveSection] = useState('sec-summary');
  const { evidenceState, openEvidence, closeEvidence } = useEvidenceExplorer();

  if (loading) {
    return <ProgressiveLoader topic={currentTopic} loadingMessage={loadingMessage} />;
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px' }}>
        <ErrorState message={error} onRetry={onRetry} onBack={onBack} />
      </div>
    );
  }

  if (!report) return null;

  const hasTrendDNA = !!report.trendDNA && Object.keys(report.trendDNA).length > 0;
  const hasTimeline = (report.timeline || []).length > 0;
  const hasRiskOrOpp = (report.riskRadar || report.problems || []).length > 0 || (report.opportunityRadar || report.opportunities || []).length > 0;
  const hasResources = (report.resourceHub || report.sources || []).length > 0;
  const hasBuildSomething = !!report.buildSomething || (report.projectIdeas || []).length > 0;
  const hasKnowledgeGraph = (report.entities || []).length > 0 || (report.people || []).length > 0;
  const hasOfficialSources = (report.officialSources || []).length > 0 || (report.sources || []).some(s => s.tier === 1);
  const hasMedia = (report.media?.images || []).length > 0 || (report.media?.videos || []).length > 0;

  return (
    <>
      {/* Global Evidence Explorer Modal */}
      <EvidenceExplorerModal
        isOpen={evidenceState.isOpen}
        onClose={closeEvidence}
        claim={evidenceState.claim}
        sources={evidenceState.sources}
        evidenceLevel={evidenceState.level}
        topic={evidenceState.topic}
      />

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 20px 80px',
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
      }}>
        {/* Sidebar Navigator */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(id) => setActiveSection(id)}
        />

        {/* Main Report Content */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* ── Search Header ── */}
          <SearchHeader
            report={report}
            topic={currentTopic}
            onRefresh={onRefresh}
            onDeepDive={onDeepDive}
            onSearchMore={onSearchMore}
            onShowEvidence={(claim, sources, level) => openEvidence(claim, sources, level, report.topic)}
            isRefreshing={isRefreshing}
            isDeepDiving={isDeepDiving}
          />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 10-PART VERIFIED RESEARCH SUMMARY (Req #9)    */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div id="sec-summary">
            <ResearchSummarySection
              report={report}
              onShowEvidence={(claim, sources, level) => openEvidence(claim, sources, level, report.topic)}
              onSelectTopic={onSelectTopic}
            />
          </div>

          {/* 🏛️ Official Sources Section (Requirement #12) */}
          {hasOfficialSources && (
            <div id="sec-official">
              <OfficialSourcesSection
                sources={report.officialSources || report.sources}
                topic={report.topic}
              />
            </div>
          )}

          {/* ⚖️ Fact vs Opinion & Analysis Matrix (Req #13) */}
          {report.factVsOpinion && (
            <div id="sec-facts">
              <FactOpinionMatrix factVsOpinion={report.factVsOpinion} />
            </div>
          )}

          {/* 🖼️ Verified Images & Videos (Req #10 & #11) */}
          {hasMedia && (
            <div id="sec-media">
              <VisualMediaGrid media={report.media} />
            </div>
          )}

          {/* 🧭 Explore This Topic (Follow-up Search) (Req #8) */}
          <div id="sec-explore">
            <ExploreFollowUps
              followUpQuestions={report.followUpQuestions}
              topic={report.topic}
              onSelectTopic={onSelectTopic}
            />
          </div>

          {/* ── Topic Profile ── */}
          <div id="sec-profile" style={{ marginBottom: '8px' }}>
            <TopicProfile report={report} onSelectRelated={onSelectTopic} />
          </div>

          {/* ── PPF Navigation Bar ── */}
          <PPFConnector />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* ⏳ PAST SECTION                               */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <PastSection report={report} />

          {/* ── Trend DNA ── */}
          {hasTrendDNA && (
            <TrendDNA trendDNA={report.trendDNA} />
          )}

          {/* ── Time Machine ── */}
          {hasTimeline && (
            <TimeMachine report={report} />
          )}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 🔴 PRESENT SECTION                            */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <PresentSection report={report} />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 🔮 FUTURE SECTION                             */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <FutureSection report={report} />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* DEEP INTELLIGENCE SECTIONS                    */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* Risk & Opportunity Radar */}
          {hasRiskOrOpp && (
            <RiskAndOpportunityRadar report={report} />
          )}

          {/* Knowledge Graph */}
          {hasKnowledgeGraph && (
            <div style={{ marginTop: '4px' }}>
              <KnowledgeGraph report={report} />
            </div>
          )}

          {/* Build Something From This */}
          {hasBuildSomething && (
            <BuildSomethingFromThis report={report} />
          )}

          {/* Adaptive Summaries */}
          {report.summaryModes && (
            <SummaryModes summaryModes={report.summaryModes} />
          )}

          {/* Resource Hub */}
          {hasResources && (
            <ResourceHub report={report} />
          )}

          {/* Ask The Trend Chat */}
          <div id="sec-ask-trend">
            <AskTheTrend report={report} followUpQuestions={report.followUpQuestions} />
          </div>

          {/* Full Sources & Confidence Audit */}
          <SourcePanel
            sources={report.sources}
            earlySignals={report.earlySignals}
            confidence={report.evidenceAudit?.score || report.confidence || 88}
            onShowEvidence={(claim, sources, level) => openEvidence(claim, sources, level, report.topic)}
          />
        </main>
      </div>
    </>
  );
}
