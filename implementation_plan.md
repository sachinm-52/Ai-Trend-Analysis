# Rebuild SocialPulse AI into a Production-Ready Web Application

Reconstruct the single-file Claude Artifact (`socialpulse-ai (1).jsx`) into a modular, production-grade React application with clean architecture, robust state management, responsive design, dual-mode AI engine (live API + offline mock intelligence), and export/history features.

## User Review Required

> [!IMPORTANT]
> **API Key & Dual-Mode Execution**:
> The original JSX directly called Anthropic's API endpoint (`https://api.anthropic.com/v1/messages`) from the browser. In browser environments, direct Anthropic calls can trigger CORS blocks or fail if the user does not possess an active Anthropic API key.
> To ensure the application is **immediately functional out-of-the-box** without forcing users to pay for an API key first, the app will feature a **Dual-Mode Engine**:
> 1. **Live Mode**: If `VITE_AI_API_KEY` is provided in `.env` (or entered dynamically via an in-app Settings modal), it invokes the real Claude API.
> 2. **Intelligence Simulation Mode (Fallback)**: When no key is provided, the app uses an offline synthesis engine with realistic latency simulation, rich pre-computed data for example topics, and dynamic heuristic analysis for custom topics and pasted posts.

## Architecture & Project Structure

```
d:/sachin/ai trend/
├── .env.example                # Template for environment variables
├── .env                        # Local development environment config
├── index.html                  # HTML entry point with Fraunces, IBM Plex Mono, Inter fonts & SEO tags
├── package.json                # Modern React 18/19 dependencies & scripts
├── vite.config.js              # Vite bundler configuration
├── README.md                   # Complete documentation, setup, API guide, and limitations
│
├── public/
│   └── favicon.svg             # Custom SocialPulse waveform favicon
│
└── src/
    ├── main.jsx                # Application bootstrap
    ├── App.jsx                 # Main layout, view routing, notifications
    ├── index.css               # Comprehensive design system (colors, typography, animations, responsive layout)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx      # Header bar with live status indicator, navigation tabs, settings button
    │   │   ├── Footer.jsx      # System metadata, disclaimer, version indicator
    │   │   └── MobileNav.jsx   # Responsive drawer / mobile tab navigation
    │   │
    │   ├── hero/
    │   │   ├── HeroSection.jsx # Animated pulse waveform, headline, subheader
    │   │   └── ModeToggle.jsx  # "analyze a topic" vs "analyze real posts" tab switcher
    │   │
    │   ├── analysis/
    │   │   ├── TopicInput.jsx  # CLI prompt '>' input, enter trigger, example chips
    │   │   ├── PostsInput.jsx  # Multi-line textarea, live line counter, "load sample" shortcut, submit button
    │   │   ├── LoadingPulse.jsx # "reading the signal..." radar animation
    │   │   └── ErrorBanner.jsx # Formatted error alert with dismiss & retry
    │   │
    │   ├── report/
    │   │   ├── ReportSection.jsx   # Numbered section container (01-07) with rule line
    │   │   ├── OverviewSection.jsx # Topic/batch title, confidence badge, sample size, SentimentBar
    │   │   ├── AspectBreakdown.jsx # Grid of aspect cards with sentiment indicator dots
    │   │   ├── EmotionSignature.jsx# Joy, Anger, Sadness, Fear, Surprise, Disgust, Neutral bars
    │   │   ├── TopicList.jsx       # Ranked discussion topics with fill percentage bars
    │   │   ├── ForecastList.jsx    # Directional arrows (↑ ↓ →) and color-coded level badges
    │   │   ├── AiBriefing.jsx      # Editorial synthesis paragraph in Fraunces serif font
    │   │   └── AskAiChat.jsx       # Interactive follow-up Q&A chat, suggested prompts, auto-scrolling
    │   │
    │   ├── modals/
    │   │   ├── ApiConfigModal.jsx  # Modal to configure Anthropic API Key & endpoint in localStorage
    │   │   ├── ExportModal.jsx     # Export report as formatted Markdown or JSON
    │   │   └── HistoryModal.jsx    # Review past analyses saved in localStorage
    │   │
    │   └── common/
    │       ├── SentimentBar.jsx    # Stacked positive/neutral/negative progress bar with legend
    │       └── Badge.jsx           # Reusable status and level badges
    │
    ├── pages/
    │   ├── Dashboard.jsx       # Main analysis dashboard (the full core experience)
    │   ├── HistoryView.jsx     # Past saved analyses with quick reload & comparison
    │   └── AboutView.jsx       # Methodology, prompt engineering details, system architecture
    │
    ├── services/
    │   ├── api.js              # Fetch client wrapper with headers, timeouts, and error handling
    │   └── aiService.js        # AI synthesis service with Anthropic API caller + offline simulation
    │
    ├── data/
    │   ├── mockData.js         # Curated realistic datasets for Bengaluru traffic, iPhone 17, EVs, NEP
    │   └── samplePosts.js      # Realistic sample social media batches for instant testing
    │
    ├── hooks/
    │   ├── useAnalysis.js      # State machine hook for topic/posts analysis execution
    │   ├── useChat.js          # Follow-up conversational agent hook
    │   └── useHistory.js       # LocalStorage analysis history manager
    │
    └── utils/
        ├── formatters.js       # Number, date, and text formatting helpers
        └── jsonParser.js       # Safe JSON markdown fence stripper and validator
```

## Proposed Changes

### Setup & Configuration

#### [NEW] `package.json`
- Configure Vite, React, React DOM, Lucide-react (for sleek minimalist icons).
- Define `npm run dev`, `npm run build`, `npm run preview` scripts.

#### [NEW] `vite.config.js`
- Set up `@vitejs/plugin-react` and standard port (e.g. 5173).

#### [NEW] `index.html`
- Include Google Fonts: `Fraunces` (serif), `IBM Plex Mono` (monospace), `Inter` (sans-serif).
- Add meta descriptions, OpenGraph tags, responsive viewport settings.

#### [NEW] `.env.example` and `.env`
- Define `VITE_API_URL`, `VITE_AI_API_KEY`, `VITE_AI_MODEL`.

---

### Styling & Design System

#### [NEW] `src/index.css`
- Exact preservation of color tokens:
  - Background: `#0D1117`
  - Surface: `#151B27`, Surface2: `#1C2433`
  - Border: `#2A3346`
  - Accent: `#2DD4BF` (Teal), AccentWarm: `#F5A623` (Amber)
  - Positive: `#4ADE80`, Negative: `#F87171`, Neutral: `#64748B`
- Keyframe animations: `pulseLine`, `barGrow`, `radarPing`.
- Responsive media queries for mobile (< 640px), tablet (640-1024px), desktop (> 1024px).

---

### Data & Services

#### [NEW] `src/services/api.js`
- Generic fetch wrapper handling HTTP methods, authorization headers, timeout handling, and JSON decoding.

#### [NEW] `src/services/aiService.js`
- Contains `ANALYSIS_SYSTEM` and `POSTS_SYSTEM` prompts.
- Handles dual-mode execution:
  - If API key is present: posts request to Anthropic API.
  - If API key is not present: intelligently selects rich pre-computed mock data for known topics/posts or heuristically generates realistic sentiment/aspects/topics/forecasts for arbitrary topics.
- Provides `askAiQuestion(analysis, question, history)` for Section 07.

#### [NEW] `src/data/mockData.js` & `src/data/samplePosts.js`
- High-quality, authentic analysis payloads for "Bengaluru traffic", "iPhone 17", "Indian electric vehicles", and "New education policy".
- Sample post sets for EV charging complaints, tech product feedback, and public transit issues.

---

### UI Components

#### [NEW] Layout & Navigation
- `Navbar.jsx`: Brand icon, title, mode links, "Save / Export" action, "API Settings" gear button.
- `Footer.jsx`: Attribution, model metadata, latency indicator.

#### [NEW] Input & Hero Sections
- `HeroSection.jsx`: Fraunces title, animated `.sp-pulse-path` SVG, subtitle.
- `ModeToggle.jsx`: Switch between Topic mode and Posts mode.
- `TopicInput.jsx`: Terminal command bar with `>` prompt, Enter key trigger, 4 quick example chips.
- `PostsInput.jsx`: Multi-line text input with live line/post counter, "Load Sample Posts" button, analyze button.

#### [NEW] Report Sections (01 to 07)
- `OverviewSection.jsx`: Section 01 with confidence gauge, mode tag, and interactive stacked `SentimentBar`.
- `AspectBreakdown.jsx`: Section 02 with aspect grid and sentiment indicator dots.
- `EmotionSignature.jsx`: Section 03 with Joy, Anger, Sadness, Fear, Surprise, Disgust, Neutral bars.
- `TopicList.jsx`: Section 04 with ranked discussion topics and percentage fill bars.
- `ForecastList.jsx`: Section 05 with trend indicators (↑, ↓, →) and high/medium/low severity badges.
- `AiBriefing.jsx`: Section 06 with editorial text briefing.
- `AskAiChat.jsx`: Section 07 with follow-up Q&A, auto-scroll, preset quick prompt chips ("Why is negative sentiment high?", "Summarize top recommendations", etc.).

#### [NEW] Modals & Extras
- `ApiConfigModal.jsx`: Lets users enter an Anthropic key directly in the browser (saved to localStorage) or switch to Mock Mode.
- `ExportModal.jsx`: Allows exporting the full intelligence report as Markdown or JSON file.

---

### Documentation

#### [NEW] `README.md`
- Comprehensive overview, tech stack details, installation guide, local dev command, build command, architecture explanation, API setup instructions, and future roadmap.

## Verification Plan

### Automated Build & Lint Verification
1. `npm install` — Ensure all dependencies resolve without conflicts.
2. `npm run build` — Verify production build with Vite bundles cleanly with zero warnings/errors.

### Functional Verification
1. Test "Analyze Topic" with pre-set chips (e.g. "Bengaluru traffic", "iPhone 17").
2. Test "Analyze Topic" with custom user input.
3. Test "Analyze Real Posts" with pasted posts and sample posts button.
4. Test "Ask AI" chat: send question, observe auto-scroll and response generation.
5. Test "Export Report" to ensure file download works.
6. Test API Configuration modal (toggling between Mock Simulation and Live Claude API).
7. Test responsive design across desktop, tablet, and mobile screen widths.
