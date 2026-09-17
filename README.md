# SocialPulse AI — Social Intelligence & Trend Forecasting

> A high-performance, modular React web application for synthesizing public sentiment, emotional signatures, aspect breakdowns, discussion topics, and emerging trend forecasts.

Originally built as a single-file Claude Artifact, this repository reconstructs the complete application into a production-ready, modular architecture with dual-mode AI reasoning (live Claude API + offline mock intelligence), persistence, and export workflows.

---

## Features & Preserved Architecture

- **Animated Intelligence Hero**: High-frequency animated SVG pulse wave, terminal command prompt (`>`), and live status indicator.
- **Dual Analysis Modes**:
  - **Topic Synthesis Mode**: AI reasons through general knowledge to synthesize plausible public sentiment, aspects, and forecasts for any subject.
  - **Batch Real Posts Mode**: Analyzes verbatim social media comments line-by-line, calculating sample size, sentiment, and authenticity/coordination scores without hallucinating extra content.
- **7-Point Synchronized Intelligence Report**:
  1. **Overview & Sentiment Bar**: Confidence score, source attribution, and stacked animated positive/neutral/negative distribution.
  2. **Aspect Breakdown**: Grid cards identifying key controversy and praise vectors with color-coded status dots.
  3. **Emotion Signature**: Quantified emotional intensity bars (Joy, Anger, Sadness, Fear, Surprise, Disgust, Neutral).
  4. **Discussion Topics**: Ranked and weighted conversational themes.
  5. **Trend Forecast**: Directional trajectory vectors (`↑`, `↓`, `→`) and risk/interest severity badges (`high`, `medium`, `low`).
  6. **AI Briefing**: Concise executive editorial synthesis with one-click clipboard copying.
  7. **Ask AI (Interactive Follow-up)**: Contextually grounded conversational chat console with suggested quick prompts and auto-scrolling history.
- **Dual-Engine Operation**:
  - **Live Mode**: Calls Anthropic Claude API (`claude-sonnet-4-6` or `claude-3-7-sonnet-20250219`) directly with client-side safe headers.
  - **Offline Simulation Mode**: Zero-config instant fallback featuring rich datasets for default examples ("Bengaluru traffic", "iPhone 17", "Indian electric vehicles", "New education policy") and dynamic heuristic generation for arbitrary inputs.
- **Intelligence Archives**: Automatically stores previous runs in browser `localStorage` for offline comparison and instant reload.
- **Multi-Format Export**: One-click download of reports in formatted Markdown (`.md`) or raw JSON (`.json`).
- **Responsive Layout**: Fluid layout optimized across mobile screens, tablets, laptops, and ultra-wide displays.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Tooling**: [Vite 6](https://vite.dev/)
- **Styling**: Vanilla CSS Design Tokens (Dark Cybernetic Theme `#0D1117`) with Google Fonts (`Fraunces`, `IBM Plex Mono`, `Inter`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Custom React Hooks (`useAnalysis`, `useChat`, `useHistory`)
- **Storage**: Browser LocalStorage with automatic JSON validation

---

## Folder Structure

```
ai trend/
├── .env.example                # Environment variable documentation
├── .env                        # Local development variables
├── index.html                  # HTML entry point with fonts and SEO tags
├── package.json                # Dependencies and build scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Documentation and API guide
│
├── public/
│   └── favicon.svg             # SocialPulse waveform SVG icon
│
└── src/
    ├── main.jsx                # React DOM root render
    ├── App.jsx                 # Application layout, router tabs, and modal controller
    ├── index.css               # Design system tokens, keyframe animations, responsive rules
    │
    ├── components/
    │   ├── common/
    │   │   ├── Badge.jsx       # Status and level tags
    │   │   ├── Modal.jsx       # Accessible backdrop modal
    │   │   └── SentimentBar.jsx# Stacked animated sentiment progress bar
    │   ├── layout/
    │   │   ├── Navbar.jsx      # Navigation header with status badge and actions
    │   │   └── Footer.jsx      # System metadata and disclaimer
    │   ├── hero/
    │   │   ├── HeroSection.jsx # Animated pulse waveform and headline
    │   │   └── ModeToggle.jsx  # Topic vs Posts mode switcher
    │   ├── analysis/
    │   │   ├── TopicInput.jsx  # CLI prompt bar with example chips
    │   │   ├── PostsInput.jsx  # Multi-line batch input with sample post loaders
    │   │   ├── LoadingPulse.jsx# High-tech radar loading animation
    │   │   └── ErrorBanner.jsx # Error alerts with retry controls
    │   ├── report/
    │   │   ├── ReportSection.jsx    # Standard numbered section layout (01–07)
    │   │   ├── OverviewSection.jsx  # Confidence, topic title, and sentiment bar
    │   │   ├── AspectBreakdown.jsx  # Grid of aspect cards with status dots
    │   │   ├── EmotionSignature.jsx # 7 emotion percentage tracks
    │   │   ├── TopicList.jsx        # Ranked discussion themes
    │   │   ├── ForecastList.jsx     # Direction arrows and severity indicators
    │   │   ├── AiBriefing.jsx       # Editorial synthesis paragraph
    │   │   └── AskAiChat.jsx        # Contextual follow-up Q&A console
    │   └── modals/
    │       ├── ApiConfigModal.jsx   # In-app API credentials and model selector
    │       └── ExportModal.jsx      # Markdown and JSON export manager
    │
    ├── pages/
    │   ├── Dashboard.jsx       # Core interactive analysis dashboard
    │   ├── HistoryView.jsx     # Intelligence archives and past run comparisons
    │   └── AboutView.jsx       # System prompts and architecture documentation
    │
    ├── services/
    │   ├── api.js              # Fetch client wrapper with timeouts and error handling
    │   └── aiService.js        # Anthropic Claude client and fallback simulation engine
    │
    ├── data/
    │   ├── mockData.js         # Curated realistic datasets and dynamic generator
    │   └── samplePosts.js      # Quick-load sample post batches
    │
    ├── hooks/
    │   ├── useAnalysis.js      # State machine for analysis execution
    │   ├── useChat.js          # Follow-up conversational chat hook
    │   └── useHistory.js       # LocalStorage archive management hook
    │
    └── utils/
        ├── formatters.js       # Formatting, color maps, and date helpers
        ├── jsonParser.js       # Safe JSON markdown fence stripper and validator
        └── storage.js          # LocalStorage persistence and file export helpers
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or newer recommended, tested on Node v25.8.1)
- npm (v9 or newer)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your Anthropic API Key if you want live LLM calls:
```env
VITE_AI_API_KEY=sk-ant-api03-...
VITE_AI_MODEL=claude-sonnet-4-6
VITE_API_URL=https://api.anthropic.com/v1/messages
```
> **Note**: If `VITE_AI_API_KEY` is not provided, the application automatically runs in intelligent mock simulation mode without failing or throwing errors. You can also configure the key at any time inside the app via the **Settings** gear icon in the navigation bar.

---

## Running Locally

To start the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## Production Build

To compile a production bundle:
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## Connecting Real Social Data & Enterprise APIs

SocialPulse AI is built with clear architectural boundaries:
```
UI View Layer ──> Services (aiService.js / api.js) ──> Backend API / Proxy ──> LLM Reasoning
```

To connect live social media pipelines:
1. **Twitter/X Firehose or Reddit API**: Route social media posts into a backend endpoint (e.g. `POST /api/stream-posts`).
2. **Backend Proxy**: Pass the ingested post batch directly into `POSTS_SYSTEM` via `aiService.js`.
3. **Enterprise Ingestion**: Set `VITE_API_URL` to your enterprise gateway endpoint in `.env` or in the in-app Settings modal.

---

## Important Limitations

1. **Client-Side API Calls**: When entering an Anthropic API Key directly into a browser app without a backend proxy, requests use `anthropic-dangerous-direct-browser-access: true`. For production multi-user deployments, route calls through a trusted backend server to safeguard secret credentials.
2. **Topic Mode is Synthetic**: The "Topic Synthesis" mode reasons about general public discussion plausibility based on Claude's training data. It is not connected directly to live firehoses unless real posts are pasted into "Posts Mode" or fed via a live stream API.
