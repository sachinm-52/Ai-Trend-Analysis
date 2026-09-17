// ═══════════════════════════════════════════════════
// AI Trend Analyzer — ReportPage Component
// Full Intelligence Dashboard with 20+ Sections
// ═══════════════════════════════════════════════════

import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { ErrorState } from '../components/common/ErrorState';

import { TopicProfile } from '../components/report/TopicProfile';
import { TenPoints } from '../components/report/TenPoints';
import { BigPicture } from '../components/report/BigPicture';
import { TrendDNA } from '../components/report/TrendDNA';
import { Timeline } from '../components/report/Timeline';
import { PeopleExplorer } from '../components/report/PeopleExplorer';
import { EntitiesGrid } from '../components/report/EntitiesGrid';
import { CurrentEvents } from '../components/report/CurrentEvents';
import { WhoIsDriving } from '../components/report/WhoIsDriving';
import { KnowledgeGraph } from '../components/report/KnowledgeGraph';
import { ProblemDetector } from '../components/report/ProblemDetector';
import { OpportunityRadar } from '../components/report/OpportunityRadar';
import { DeepDiscovery } from '../components/report/DeepDiscovery';
import { FutureScenarios } from '../components/report/FutureScenarios';
import { TrendMomentum } from '../components/report/TrendMomentum';
import { TrendHeatmap } from '../components/report/TrendHeatmap';
import { EntityComparison } from '../components/report/EntityComparison';
import { SummaryModes } from '../components/report/SummaryModes';
import { ProjectIdeas } from '../components/report/ProjectIdeas';
import { AskTheTrend } from '../components/report/AskTheTrend';
import { SourcePanel } from '../components/report/SourcePanel';

export function ReportPage({
  report,
  loading,
  error,
  onRetry,
  onBack,
  onSelectTopic,
}) {
  const [activeSection, setActiveSection] = useState('sec-profile');

  if (loading) {
    return (
      <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
        <SkeletonLoader type="hero" />
        <div style={{ marginTop: '30px' }}>
          <SkeletonLoader type="grid" count={4} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px' }}>
        <ErrorState message={error} onRetry={onRetry} onBack={onBack} />
      </div>
    );
  }

  if (!report) return null;

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 20px 80px',
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
      }}
    >
      {/* Sidebar Navigator */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={(id) => setActiveSection(id)}
      />

      {/* Main Report Content Stream */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* Section 2: Topic Profile */}
        <div id="sec-profile">
          <TopicProfile report={report} onSelectRelated={onSelectTopic} />
        </div>

        {/* Section 35: The Story in 10 Points */}
        <TenPoints points={report.tenPoints} />

        {/* Section 3: The Big Picture */}
        <BigPicture bigPicture={report.bigPicture} />

        {/* Wow Feature: Trend DNA */}
        <TrendDNA trendDNA={report.trendDNA} />

        {/* Section 4 & 23: Historical Timeline & Turning Points */}
        <Timeline timeline={report.timeline} />

        {/* Section 5: People & Entities Explorer */}
        <PeopleExplorer people={report.people} />
        <EntitiesGrid entities={report.entities} />

        {/* Section 6: Current Intelligence & Signals */}
        <CurrentEvents events={report.currentEvents} />

        {/* Section 7: Who & What Is Driving It */}
        <WhoIsDriving drivers={report.drivers} />

        {/* Section 21: Interactive Knowledge Graph */}
        <KnowledgeGraph report={report} />

        {/* Section 8: Problem Detector & Gaps */}
        <ProblemDetector problems={report.problems} />

        {/* Section 9: Opportunity Radar */}
        <OpportunityRadar opportunities={report.opportunities} />

        {/* Section 10: Deep Discovery & Hidden Dynamics */}
        <DeepDiscovery discoveries={report.deepDiscovery} />

        {/* Section 12: Future Scenarios */}
        <FutureScenarios futureScenarios={report.futureScenarios} />

        {/* Section 13: Trend Momentum & Velocity */}
        <TrendMomentum momentum={report.trendMomentum} />

        {/* Section 14: Sub-Domain Heatmap */}
        <TrendHeatmap heatmap={report.heatmap} onSelectArea={onSelectTopic} />

        {/* Section 15: Comparative Analysis Matrix */}
        <EntityComparison comparison={report.comparison} />

        {/* Section 18: Adaptive Persona Summaries */}
        <SummaryModes summaryModes={report.summaryModes} />

        {/* Section 19: If I Want to Build Something */}
        <ProjectIdeas ideas={report.projectIdeas} />

        {/* Section 24: Ask The Trend Contextual Chat */}
        <AskTheTrend report={report} followUpQuestions={report.followUpQuestions} />

        {/* Sections 16-17: Sources, Citations & Confidence Audit */}
        <SourcePanel
          sources={report.sources}
          earlySignals={report.earlySignals}
          confidence={report.confidence}
        />
      </main>
    </div>
  );
}
