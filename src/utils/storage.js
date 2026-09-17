const STORAGE_KEYS = {
  HISTORY: 'socialpulse_history_v1',
  SETTINGS: 'socialpulse_settings_v1',
};

export function getSavedHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
    return [];
  }
}

export function saveAnalysisToHistory(analysis) {
  try {
    const existing = getSavedHistory();
    const item = {
      ...analysis,
      id: `sp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };
    const updated = [item, ...existing.filter((h) => h.topic !== analysis.topic)].slice(0, 25);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return item;
  } catch (e) {
    console.error('Failed to save analysis to localStorage', e);
    return null;
  }
}

export function removeAnalysisFromHistory(id) {
  try {
    const existing = getSavedHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove analysis from localStorage', e);
    return [];
  }
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read settings', e);
  }
  return {
    apiKey: import.meta.env.VITE_AI_API_KEY || '',
    model: import.meta.env.VITE_AI_MODEL || 'claude-sonnet-4-6',
    apiUrl: import.meta.env.VITE_API_URL || 'https://api.anthropic.com/v1/messages',
    useMockFallback: true,
  };
}

export function saveStoredSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function exportAnalysisAsJson(analysis) {
  const jsonStr = JSON.stringify(analysis, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `socialpulse-${analysis.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAnalysisAsMarkdown(analysis) {
  let md = `# SocialPulse Intelligence Report: ${analysis.topic}\n\n`;
  md += `**Mode:** ${analysis._mode === 'posts' ? 'Batch Post Analysis' : 'Topic Synthesis'}\n`;
  if (analysis.sampleSize) md += `**Sample Size:** ${analysis.sampleSize} posts\n`;
  md += `**Confidence:** ${analysis.confidence}%\n`;
  md += `**Date:** ${new Date().toLocaleString()}\n\n`;

  md += `## 1. Overall Sentiment\n`;
  md += `- Positive: ${analysis.overall?.positive}%\n`;
  md += `- Neutral: ${analysis.overall?.neutral}%\n`;
  md += `- Negative: ${analysis.overall?.negative}%\n\n`;

  md += `## 2. Aspect Breakdown\n`;
  analysis.aspects?.forEach((a) => {
    md += `- **${a.name}** (${a.sentiment}): ${a.note}\n`;
  });
  md += `\n`;

  md += `## 3. Emotion Signature\n`;
  if (analysis.emotions) {
    Object.entries(analysis.emotions).forEach(([k, v]) => {
      md += `- ${k.toUpperCase()}: ${v}%\n`;
    });
  }
  md += `\n`;

  md += `## 4. Discussion Topics\n`;
  analysis.topics?.forEach((t, i) => {
    md += `${i + 1}. **${t.name}** (${t.pct}%)\n`;
  });
  md += `\n`;

  if (analysis.forecast?.length) {
    md += `## 5. Trend Forecast\n`;
    analysis.forecast.forEach((f) => {
      md += `- [${f.direction.toUpperCase()}] **${f.name}** (Severity: ${f.level})\n`;
    });
    md += `\n`;
  }

  md += `## 6. AI Briefing\n`;
  md += `> ${analysis.insight}\n\n`;

  md += `---\n*Generated with SocialPulse AI*`;

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `socialpulse-${analysis.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
