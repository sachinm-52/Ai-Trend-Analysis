import React, { useState, useRef, useEffect } from "react";

const EXAMPLES = ["Bengaluru traffic", "iPhone 17", "Indian electric vehicles", "New education policy"];

const EMOTION_META = [
  { key: "joy", label: "Joy" },
  { key: "anger", label: "Anger" },
  { key: "sadness", label: "Sadness" },
  { key: "fear", label: "Fear" },
  { key: "surprise", label: "Surprise" },
  { key: "disgust", label: "Disgust" },
  { key: "neutral", label: "Neutral" },
];

function stripFences(text) {
  return text.replace(/```json/gi, "").replace(/```/g, "").trim();
}

async function callClaude(messages, system) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages,
    }),
  });
  if (!res.ok) throw new Error("Request failed: " + res.status);
  const data = await res.json();
  const text = (data.content || [])
    .map((b) => (b.type === "text" ? b.text : ""))
    .filter(Boolean)
    .join("\n");
  return text;
}

const ANALYSIS_SYSTEM = `You are the reasoning engine behind SocialPulse AI, a social-intelligence dashboard.
Given a topic, reason about what public discussion around it plausibly looks like, based on your general
knowledge. You are NOT connected to live social media data, so never claim specific real-time post counts —
your job is a well-reasoned, plausible synthesis, clearly framed as AI-generated analysis rather than measured fact.

Respond with ONLY a single JSON object, no prose, no markdown fences, matching exactly this shape:
{
  "topic": string,
  "confidence": number (0-100, how confident you are this is a well-grounded synthesis),
  "overall": { "positive": number, "neutral": number, "negative": number },   // sum to 100
  "emotions": { "joy": number, "anger": number, "sadness": number, "fear": number, "surprise": number, "disgust": number, "neutral": number }, // sum to 100
  "aspects": [ { "name": string, "sentiment": "positive"|"negative"|"mixed", "note": string (<=14 words) } ],  // 4-6 items
  "topics": [ { "name": string, "pct": number } ],  // 4-6 items, sum to 100
  "forecast": [ { "name": string, "direction": "up"|"down"|"stable", "level": "high"|"medium"|"low" } ], // 3-5 items
  "insight": string  // 2-3 sentence plain-language briefing paragraph
}
Numbers are integers. Keep "note" and "insight" concise and specific to the topic, not generic filler.`;

const POSTS_SYSTEM = `You are the reasoning engine behind SocialPulse AI, a social-intelligence dashboard.
The user has pasted a batch of REAL social media posts/comments (one per line, blank lines ignored). Analyze
ONLY the text actually given to you — do not invent additional posts, users, or facts not present in the text.
Ground every field in the literal content provided. If posts are sarcastic, mixed, or ambiguous, reflect that
honestly rather than forcing a clean label.

Respond with ONLY a single JSON object, no prose, no markdown fences, matching exactly this shape:
{
  "topic": string,  // a short label you infer for what this batch is about, e.g. "EV pricing complaints"
  "sampleSize": number,  // count of distinct posts you actually analyzed
  "confidence": number (0-100, how confident you are given the sample size and clarity of the text),
  "overall": { "positive": number, "neutral": number, "negative": number },   // sum to 100
  "emotions": { "joy": number, "anger": number, "sadness": number, "fear": number, "surprise": number, "disgust": number, "neutral": number }, // sum to 100
  "aspects": [ { "name": string, "sentiment": "positive"|"negative"|"mixed", "note": string (<=14 words) } ],  // 2-6 items, only what's actually discussed
  "topics": [ { "name": string, "pct": number } ],  // 2-6 items, sum to 100, only what's actually discussed
  "authenticity": { "normal": number, "repetitive": number, "note": string (<=20 words) },  // normal+repetitive sum to 100; flag near-duplicate/templated posts if present, otherwise normal=100 and say so
  "insight": string  // 2-3 sentence plain-language briefing paragraph grounded in this specific batch
}
Numbers are integers. If fewer than 3 posts are given, still analyze them but keep confidence low and say so in "insight".`;

export default function SocialPulseAI() {
  const [mode, setMode] = useState("topic"); // "topic" | "posts"
  const [topic, setTopic] = useState("");
  const [postsText, setPostsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat, chatLoading]);

  const runTopicAnalysis = async (t) => {
    const finalTopic = (t ?? topic).trim();
    if (!finalTopic || loading) return;
    setTopic(finalTopic);
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setChat([]);
    try {
      const raw = await callClaude(
        [{ role: "user", content: `Topic: ${finalTopic}` }],
        ANALYSIS_SYSTEM
      );
      const parsed = JSON.parse(stripFences(raw));
      setAnalysis({ ...parsed, _mode: "topic" });
    } catch (e) {
      setError("Couldn't generate an analysis for that topic. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const runPostsAnalysis = async () => {
    const posts = postsText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (posts.length === 0 || loading) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setChat([]);
    try {
      const numbered = posts.map((p, i) => `${i + 1}. ${p}`).join("\n");
      const raw = await callClaude(
        [{ role: "user", content: `Posts:\n${numbered}` }],
        POSTS_SYSTEM
      );
      const parsed = JSON.parse(stripFences(raw));
      setAnalysis({ ...parsed, _mode: "posts" });
    } catch (e) {
      setError("Couldn't analyze those posts. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = (t) => (mode === "topic" ? runTopicAnalysis(t) : runPostsAnalysis());

  const askAI = async () => {
    const q = chatInput.trim();
    if (!q || chatLoading || !analysis) return;
    setChatInput("");
    const nextChat = [...chat, { role: "user", content: q }];
    setChat(nextChat);
    setChatLoading(true);
    try {
      const sys = `You are the "Ask AI" assistant inside SocialPulse AI. The user is asking questions about
this analysis JSON for the topic "${analysis.topic}":\n${JSON.stringify(analysis)}\n
Answer in 1-3 concise sentences, grounded only in this data. No markdown, no headers.`;
      const history = nextChat.map((m) => ({ role: m.role, content: m.content }));
      const answer = await callClaude(history, sys);
      setChat((c) => [...c, { role: "assistant", content: answer.trim() }]);
    } catch (e) {
      setChat((c) => [...c, { role: "assistant", content: "Something went wrong answering that — try rephrasing." }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .sp-root { font-family: 'Inter', sans-serif; }
        .sp-mono { font-family: 'IBM Plex Mono', monospace; }
        .sp-display { font-family: 'Fraunces', serif; }
        .sp-input:focus, .sp-chat-input:focus { outline: none; border-color: #2DD4BF !important; }
        .sp-analyze:hover { background: #26bfac !important; }
        .sp-chip:hover { border-color: #2DD4BF !important; color: #2DD4BF !important; }
        .sp-send:hover { color: #2DD4BF !important; }
        ::selection { background: #2DD4BF44; }
        @keyframes pulseLine {
          0% { stroke-dashoffset: 800; }
          100% { stroke-dashoffset: 0; }
        }
        .sp-pulse-path { stroke-dasharray: 6 5; animation: pulseLine 3.5s linear infinite; }
        @keyframes barGrow { from { width: 0; } }
        .sp-bar-fill { animation: barGrow 0.9s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .sp-pulse-path { animation: none; }
          .sp-bar-fill { animation: none; }
        }
      `}</style>

      <div className="sp-root" style={styles.container}>
        {/* HERO */}
        <div style={styles.hero}>
          <div style={styles.eyebrow} className="sp-mono">SOCIAL INTELLIGENCE &amp; TREND FORECASTING</div>
          <h1 className="sp-display" style={styles.h1}>SocialPulse AI</h1>
          <svg viewBox="0 0 800 60" style={styles.pulseSvg} preserveAspectRatio="none">
            <path
              className="sp-pulse-path"
              d="M0,30 L120,30 L145,10 L165,50 L185,18 L205,30 L340,30 L365,8 L385,52 L405,30 L560,30 L585,14 L605,46 L625,30 L800,30"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2"
              opacity="0.85"
            />
          </svg>
          <p style={styles.heroSub}>
            Ask about any topic — SocialPulse reasons through sentiment, aspects, emotion, emerging themes
            and where the conversation is likely headed.
          </p>

          <div style={styles.modeToggle}>
            <button
              className="sp-mono"
              style={{ ...styles.modeBtn, ...(mode === "topic" ? styles.modeBtnActive : {}) }}
              onClick={() => { setMode("topic"); setError(null); }}
            >
              analyze a topic
            </button>
            <button
              className="sp-mono"
              style={{ ...styles.modeBtn, ...(mode === "posts" ? styles.modeBtnActive : {}) }}
              onClick={() => { setMode("posts"); setError(null); }}
            >
              analyze real posts
            </button>
          </div>

          {mode === "topic" ? (
            <>
              <div style={styles.commandBar}>
                <span className="sp-mono" style={styles.prompt}>&gt;</span>
                <input
                  className="sp-mono sp-input"
                  style={styles.input}
                  placeholder="analyze a topic…"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runAnalysis()}
                />
                <button className="sp-mono sp-analyze" style={styles.analyzeBtn} onClick={() => runAnalysis()} disabled={loading}>
                  {loading ? "ANALYZING…" : "ANALYZE"}
                </button>
              </div>

              <div style={styles.chips}>
                {EXAMPLES.map((ex) => (
                  <button key={ex} className="sp-mono sp-chip" style={styles.chip} onClick={() => runAnalysis(ex)}>
                    {ex}
                  </button>
                ))}
              </div>

              <div className="sp-mono" style={styles.disclaimer}>
                AI-reasoned synthesis from Claude — not connected to live social data. Paste real posts
                instead, or swap in a real feed (X/Reddit/news APIs), to make this a live pipeline.
              </div>
            </>
          ) : (
            <>
              <div style={styles.postsBox}>
                <textarea
                  className="sp-mono sp-input"
                  style={styles.textarea}
                  placeholder={"paste real posts or comments, one per line…\ne.g.\nBattery life on this thing is unreal, charges in 20 mins\ncharging stations near me are always broken, so annoying\nprice is way too high for what you get honestly"}
                  value={postsText}
                  onChange={(e) => setPostsText(e.target.value)}
                  rows={6}
                />
                <div style={styles.postsFooter}>
                  <span className="sp-mono" style={styles.postsCount}>
                    {postsText.split("\n").map((l) => l.trim()).filter(Boolean).length} post(s)
                  </span>
                  <button className="sp-mono sp-analyze" style={styles.analyzeBtn} onClick={() => runAnalysis()} disabled={loading}>
                    {loading ? "ANALYZING…" : "ANALYZE POSTS"}
                  </button>
                </div>
              </div>

              <div className="sp-mono" style={styles.disclaimer}>
                This mode analyzes only the exact text you paste in — real, verbatim posts, not AI-guessed
                ones. Nothing is fetched automatically; copy posts in from wherever you're reading them.
              </div>
            </>
          )}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {loading && (
          <div style={styles.loadingBox}>
            <span className="sp-mono" style={styles.loadingText}>reading the signal…</span>
          </div>
        )}

        {analysis && !loading && (
          <div style={styles.report}>
            <ReportSection num="01" title="Overview" mono>
              <div style={styles.confRow}>
                <span className="sp-mono" style={styles.confLabel}>{analysis._mode === "posts" ? "BATCH" : "TOPIC"}</span>
                <span className="sp-display" style={styles.confTopic}>{analysis.topic}</span>
                {analysis._mode === "posts" && (
                  <span className="sp-mono" style={styles.sourceBadge}>
                    {analysis.sampleSize ?? "?"} real posts
                  </span>
                )}
                <span className="sp-mono" style={styles.confBadge}>
                  confidence {analysis.confidence}%
                </span>
              </div>
              <SentimentBar overall={analysis.overall} />
            </ReportSection>

            <ReportSection num="02" title="Aspect Breakdown">
              <div style={styles.aspectGrid}>
                {analysis.aspects?.map((a, i) => (
                  <div key={i} style={styles.aspectCard}>
                    <div style={styles.aspectHead}>
                      <span
                        style={{
                          ...styles.dot,
                          background:
                            a.sentiment === "positive" ? COLORS.positive : a.sentiment === "negative" ? COLORS.negative : COLORS.neutral,
                        }}
                      />
                      <span className="sp-display" style={styles.aspectName}>{a.name}</span>
                    </div>
                    <div className="sp-mono" style={styles.aspectNote}>{a.note}</div>
                  </div>
                ))}
              </div>
            </ReportSection>

            <ReportSection num="03" title="Emotion Signature">
              <div style={styles.emotionGrid}>
                {EMOTION_META.map((em) => {
                  const val = analysis.emotions?.[em.key] ?? 0;
                  return (
                    <div key={em.key} style={styles.emotionRow}>
                      <span className="sp-mono" style={styles.emotionLabel}>{em.label}</span>
                      <div style={styles.trackThin}>
                        <div className="sp-bar-fill" style={{ ...styles.fillThin, width: `${val}%`, background: COLORS.accentWarm }} />
                      </div>
                      <span className="sp-mono" style={styles.emotionVal}>{val}%</span>
                    </div>
                  );
                })}
              </div>
            </ReportSection>

            <ReportSection num="04" title="Discussion Topics">
              <div style={styles.topicList}>
                {analysis.topics?.map((t, i) => (
                  <div key={i} style={styles.topicRow}>
                    <span className="sp-mono" style={styles.topicRank}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="sp-display" style={styles.topicName}>{t.name}</span>
                    <div style={styles.trackWide}>
                      <div className="sp-bar-fill" style={{ ...styles.fillWide, width: `${t.pct}%` }} />
                    </div>
                    <span className="sp-mono" style={styles.topicPct}>{t.pct}%</span>
                  </div>
                ))}
              </div>
            </ReportSection>

            <ReportSection num="05" title="Trend Forecast">
              <div style={styles.forecastList}>
                {analysis.forecast?.map((f, i) => (
                  <div key={i} style={styles.forecastRow}>
                    <span className="sp-mono" style={styles.forecastArrow}>
                      {f.direction === "up" ? "↑" : f.direction === "down" ? "↓" : "→"}
                    </span>
                    <span className="sp-display" style={styles.forecastName}>{f.name}</span>
                    <span
                      className="sp-mono"
                      style={{
                        ...styles.levelBadge,
                        color: f.level === "high" ? COLORS.negative : f.level === "medium" ? COLORS.accentWarm : COLORS.neutral,
                        borderColor: f.level === "high" ? COLORS.negative : f.level === "medium" ? COLORS.accentWarm : COLORS.neutral,
                      }}
                    >
                      {f.level}
                    </span>
                  </div>
                ))}
              </div>
            </ReportSection>

            <ReportSection num="06" title="AI Briefing">
              <p className="sp-display" style={styles.insight}>{analysis.insight}</p>
            </ReportSection>

            <ReportSection num="07" title="Ask AI">
              <div style={styles.chatBox}>
                <div style={styles.chatMessages}>
                  {chat.length === 0 && (
                    <div className="sp-mono" style={styles.chatEmpty}>
                      ask a follow-up — e.g. "why is negative sentiment rising?"
                    </div>
                  )}
                  {chat.map((m, i) => (
                    <div key={i} style={m.role === "user" ? styles.chatUser : styles.chatAssistant}>
                      <span className="sp-mono" style={styles.chatRole}>{m.role === "user" ? "you" : "ai"}</span>
                      <span style={styles.chatText}>{m.content}</span>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={styles.chatAssistant}>
                      <span className="sp-mono" style={styles.chatRole}>ai</span>
                      <span className="sp-mono" style={styles.chatText}>thinking…</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div style={styles.chatInputRow}>
                  <input
                    className="sp-chat-input"
                    style={styles.chatInput}
                    placeholder="ask about this analysis…"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askAI()}
                  />
                  <button className="sp-mono sp-send" style={styles.sendBtn} onClick={askAI} disabled={chatLoading}>
                    ask
                  </button>
                </div>
              </div>
            </ReportSection>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportSection({ num, title, children }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHead}>
        <span className="sp-mono" style={styles.sectionNum}>{num}</span>
        <span className="sp-display" style={styles.sectionTitle}>{title}</span>
        <div style={styles.sectionRule} />
      </div>
      <div style={styles.sectionBody}>{children}</div>
    </div>
  );
}

function SentimentBar({ overall }) {
  if (!overall) return null;
  const segs = [
    { key: "positive", val: overall.positive, color: COLORS.positive, label: "Positive" },
    { key: "neutral", val: overall.neutral, color: COLORS.neutral, label: "Neutral" },
    { key: "negative", val: overall.negative, color: COLORS.negative, label: "Negative" },
  ];
  return (
    <div>
      <div style={styles.stackBar}>
        {segs.map((s) => (
          <div key={s.key} className="sp-bar-fill" style={{ width: `${s.val}%`, background: s.color, height: "100%" }} title={`${s.label} ${s.val}%`} />
        ))}
      </div>
      <div style={styles.stackLegend}>
        {segs.map((s) => (
          <span key={s.key} className="sp-mono" style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: s.color }} /> {s.label} {s.val}%
          </span>
        ))}
      </div>
    </div>
  );
}

const COLORS = {
  bg: "#0D1117",
  surface: "#151B27",
  surface2: "#1C2433",
  border: "#2A3346",
  text: "#E7EAF2",
  muted: "#8B93A8",
  accent: "#2DD4BF",
  accentWarm: "#F5A623",
  positive: "#4ADE80",
  negative: "#F87171",
  neutral: "#64748B",
};

const styles = {
  page: { background: COLORS.bg, minHeight: "100%", padding: "0", color: COLORS.text },
  container: { maxWidth: 880, margin: "0 auto", padding: "48px 24px 80px" },
  hero: { textAlign: "center", marginBottom: 40 },
  eyebrow: { fontSize: 11, letterSpacing: "0.18em", color: COLORS.accent, marginBottom: 14 },
  h1: { fontSize: 52, fontWeight: 600, margin: "0 0 18px", letterSpacing: "-0.01em" },
  pulseSvg: { width: "100%", maxWidth: 500, height: 40, margin: "0 auto 18px", display: "block" },
  heroSub: { color: COLORS.muted, fontSize: 15, maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.55 },
  commandBar: {
    display: "flex", alignItems: "center", gap: 10, maxWidth: 560, margin: "0 auto",
    background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px",
  },
  prompt: { color: COLORS.accent, fontSize: 15 },
  input: {
    flex: 1, background: "transparent", border: "none", color: COLORS.text, fontSize: 15,
    padding: "6px 0", borderBottom: "1px solid transparent",
  },
  analyzeBtn: {
    background: COLORS.accent, color: "#08120F", border: "none", borderRadius: 6, padding: "9px 16px",
    fontSize: 12, letterSpacing: "0.06em", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
  },
  chips: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 16 },
  chip: {
    background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 20,
    padding: "6px 13px", fontSize: 11.5, cursor: "pointer",
  },
  disclaimer: { marginTop: 22, fontSize: 10.5, color: "#5A6377", maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 },
  error: { textAlign: "center", color: COLORS.negative, fontSize: 13, marginBottom: 24 },
  loadingBox: { textAlign: "center", padding: "40px 0" },
  loadingText: { color: COLORS.muted, fontSize: 13 },
  report: { display: "flex", flexDirection: "column", gap: 8 },
  section: { borderTop: `1px solid ${COLORS.border}`, padding: "26px 0" },
  sectionHead: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 },
  sectionNum: { color: COLORS.accent, fontSize: 12 },
  sectionTitle: { fontSize: 20, fontWeight: 600 },
  sectionRule: { flex: 1, height: 1, background: COLORS.border },
  sectionBody: {},
  confRow: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16, flexWrap: "wrap" },
  confLabel: { fontSize: 10.5, color: COLORS.muted, letterSpacing: "0.1em" },
  confTopic: { fontSize: 18, flex: 1 },
  confBadge: { fontSize: 11, color: COLORS.accent, border: `1px solid ${COLORS.accent}55`, borderRadius: 20, padding: "3px 10px" },
  stackBar: { display: "flex", height: 14, borderRadius: 4, overflow: "hidden", background: COLORS.surface2 },
  stackLegend: { display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" },
  legendItem: { fontSize: 12, color: COLORS.muted, display: "inline-flex", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
  aspectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 },
  aspectCard: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "14px 16px" },
  aspectHead: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  dot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0 },
  aspectName: { fontSize: 15 },
  aspectNote: { fontSize: 11.5, color: COLORS.muted, lineHeight: 1.5 },
  emotionGrid: { display: "flex", flexDirection: "column", gap: 10 },
  emotionRow: { display: "flex", alignItems: "center", gap: 12 },
  emotionLabel: { fontSize: 11.5, color: COLORS.muted, width: 72, flexShrink: 0 },
  trackThin: { flex: 1, height: 6, background: COLORS.surface2, borderRadius: 3, overflow: "hidden" },
  fillThin: { height: "100%", borderRadius: 3 },
  emotionVal: { fontSize: 11, color: COLORS.muted, width: 34, textAlign: "right", flexShrink: 0 },
  topicList: { display: "flex", flexDirection: "column", gap: 12 },
  topicRow: { display: "flex", alignItems: "center", gap: 12 },
  topicRank: { fontSize: 11, color: COLORS.accent, width: 18, flexShrink: 0 },
  topicName: { fontSize: 14.5, width: 140, flexShrink: 0 },
  trackWide: { flex: 1, height: 8, background: COLORS.surface2, borderRadius: 4, overflow: "hidden" },
  fillWide: { height: "100%", borderRadius: 4, background: COLORS.accent },
  topicPct: { fontSize: 11.5, color: COLORS.muted, width: 36, textAlign: "right", flexShrink: 0 },
  forecastList: { display: "flex", flexDirection: "column", gap: 10 },
  forecastRow: {
    display: "flex", alignItems: "center", gap: 12, background: COLORS.surface, border: `1px solid ${COLORS.border}`,
    borderRadius: 8, padding: "10px 16px",
  },
  forecastArrow: { fontSize: 15, color: COLORS.accentWarm, width: 16 },
  forecastName: { fontSize: 14.5, flex: 1 },
  levelBadge: { fontSize: 10, border: "1px solid", borderRadius: 20, padding: "2px 10px", textTransform: "uppercase", letterSpacing: "0.05em" },
  insight: { fontSize: 17, lineHeight: 1.65, color: "#D9DEEA", maxWidth: 640 },
  chatBox: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" },
  chatMessages: { maxHeight: 260, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 },
  chatEmpty: { color: "#5A6377", fontSize: 12 },
  chatUser: { alignSelf: "flex-end", maxWidth: "80%", textAlign: "right" },
  chatAssistant: { alignSelf: "flex-start", maxWidth: "85%" },
  chatRole: { fontSize: 9.5, color: COLORS.accent, display: "block", marginBottom: 2, letterSpacing: "0.08em" },
  chatText: { fontSize: 13.5, lineHeight: 1.5, color: COLORS.text },
  chatInputRow: { display: "flex", borderTop: `1px solid ${COLORS.border}`, padding: "10px 12px", gap: 10 },
  chatInput: { flex: 1, background: "transparent", border: "none", color: COLORS.text, fontSize: 13.5, padding: "6px 4px" },
  sendBtn: { background: "transparent", border: "none", color: COLORS.muted, fontSize: 12, cursor: "pointer", letterSpacing: "0.06em" },
};
