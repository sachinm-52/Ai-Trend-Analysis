// ═══════════════════════════════════════════════════
// AI Trend Analyzer — Formatters
// ═══════════════════════════════════════════════════

export function formatPct(val) {
  return `${Math.round(val ?? 0)}%`;
}

export function formatRank(index) {
  return String(index + 1).padStart(2, '0');
}

export function truncateText(text = '', maxLength = 120) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function formatDate(timestamp) {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return String(timestamp);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(timestamp) {
  if (!timestamp) return '';
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * Robust HTML entity decoder and tag stripper for safe readable rendering.
 */
export function stripHtml(input) {
  if (!input || typeof input !== 'string') return '';
  let text = input;

  const entityMap = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&#39;': "'",
    '&#x27;': "'",
    '&#47;': '/',
    '&#x2F;': '/',
    '&lt;': '<',
    '&gt;': '>',
    '&ndash;': '–',
    '&mdash;': '—',
    '&hellip;': '…',
  };

  // Decode numeric & hex entities
  text = text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
  text = text.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  // Decode common named entities
  for (const [entity, char] of Object.entries(entityMap)) {
    text = text.replaceAll(entity, char);
  }

  // Remove CDATA
  text = text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1');

  // Strip all HTML tags
  text = text.replace(/<[^>]*>/g, ' ');

  // Second pass in case tags were unescaped
  text = text.replace(/<[^>]*>/g, ' ');

  // Second pass entity decode
  for (const [entity, char] of Object.entries(entityMap)) {
    text = text.replaceAll(entity, char);
  }

  return text.replace(/\s+/g, ' ').trim();
}

