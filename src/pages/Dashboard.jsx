import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { ModeToggle } from '../components/hero/ModeToggle';
import { TopicInput } from '../components/analysis/TopicInput';
import { PostsInput } from '../components/analysis/PostsInput';
import { LoadingPulse } from '../components/analysis/LoadingPulse';
import { ErrorBanner } from '../components/analysis/ErrorBanner';

import { OverviewSection } from '../components/report/OverviewSection';
import { AspectBreakdown } from '../components/report/AspectBreakdown';
import { EmotionSignature } from '../components/report/EmotionSignature';
import { TopicList } from '../components/report/TopicList';
import { ForecastList } from '../components/report/ForecastList';
import { AiBriefing } from '../components/report/AiBriefing';
import { AskAiChat } from '../components/report/AskAiChat';
import { useChat } from '../hooks/useChat';

export function Dashboard({
  mode,
  setMode,
  topic,
  setTopic,
  postsText,
  setPostsText,
  loading,
  error,
  setError,
  analysis,
  runAnalysis,
}) {
  const {
    chat,
    chatInput,
    setChatInput,
    chatLoading,
    chatEndRef,
    sendQuestion,
  } = useChat(analysis);

  return (
    <div style={styles.container} className="sp-container">
      {/* HERO & TITLE */}
      <HeroSection />

      {/* MODE TOGGLE */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ModeToggle
          mode={mode}
          onModeChange={(newMode) => {
            setMode(newMode);
            setError(null);
          }}
        />
      </div>

      {/* INPUT BAR ACCORDING TO MODE */}
      {mode === 'topic' ? (
        <TopicInput
          topic={topic}
          setTopic={setTopic}
          onAnalyze={runAnalysis}
          loading={loading}
        />
      ) : (
        <PostsInput
          postsText={postsText}
          setPostsText={setPostsText}
          onAnalyze={runAnalysis}
          loading={loading}
        />
      )}

      {/* ERROR BANNER */}
      {error && (
        <div style={{ marginTop: 24 }}>
          <ErrorBanner error={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {/* LOADING PULSE */}
      {loading && <LoadingPulse />}

      {/* INTELLIGENCE REPORT SECTIONS 01-07 */}
      {analysis && !loading && (
        <div style={styles.report}>
          <OverviewSection analysis={analysis} />
          <AspectBreakdown aspects={analysis.aspects} />
          <EmotionSignature emotions={analysis.emotions} />
          <TopicList topics={analysis.topics} />
          <ForecastList forecast={analysis.forecast} />
          <AiBriefing
            insight={analysis.insight}
            authenticity={analysis.authenticity}
          />
          <AskAiChat
            chat={chat}
            chatInput={chatInput}
            setChatInput={setChatInput}
            chatLoading={chatLoading}
            chatEndRef={chatEndRef}
            onSendQuestion={sendQuestion}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 880,
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  report: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 36,
  },
};
