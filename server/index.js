// ═══════════════════════════════════════════════════
// Real-Time Verified Research Engine — Server API Router
// Connect / Express compatible request handler for Vite dev server & production
// ═══════════════════════════════════════════════════

import { understandQuery } from './queryUnderstanding.js';
import { orchestrateSearch } from './searchOrchestrator.js';
import { validateAndRankSources } from './sourceValidator.js';
import { deduplicateStories, detectConflicts, classifyFactsAndOpinions, computeEvidenceAudit } from './verificationEngine.js';
import { retrieveVerifiedMedia } from './mediaFinder.js';
import { callLlmSynthesis } from './synthesisEngine.js';

// In-memory cache with TTL (Requirement #20)
const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getCached(key) {
  const item = cache.get(key.toLowerCase().trim());
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    cache.delete(key.toLowerCase().trim());
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key.toLowerCase().trim(), {
    timestamp: Date.now(),
    data,
  });
}

/**
 * Main research handler
 */
export async function handleResearch(query, mode = 'quick', forceRefresh = false) {
  if (!query || !query.trim()) {
    throw new Error('Please enter a search query.');
  }

  const cleanQuery = query.trim();
  const cacheKey = `${cleanQuery}_${mode}`;

  // Check cache unless forceRefresh
  if (!forceRefresh) {
    const cached = getCached(cacheKey);
    if (cached) {
      return { ...cached, _cached: true };
    }
  }

  // Step 1: Understand query
  const queryContext = understandQuery(cleanQuery);

  // Step 2: Search the web across multiple providers
  const rawResults = await orchestrateSearch(queryContext);

  // Step 3: Source validation, ranking, and topic relevance filtering
  const verifiedSources = validateAndRankSources(rawResults, queryContext);

  // Strict check (Requirement #18): Never fabricate if zero verified sources found
  if (verifiedSources.length === 0) {
    return {
      success: false,
      error: "I couldn't verify current information from the web right now. Please try again.",
      query: cleanQuery,
      timestamp: new Date().toISOString(),
    };
  }

  // Step 4: Multi-source deduplication
  const { groupedEvents, standaloneSources } = deduplicateStories(verifiedSources);

  // Step 5: Conflict detection
  const conflicts = detectConflicts(verifiedSources);

  // Step 6: Fact vs Analysis vs Opinion vs Unconfirmed classification
  const segregatedContent = classifyFactsAndOpinions(verifiedSources, queryContext);

  // Step 7: Evidence trust score audit
  const evidenceAudit = computeEvidenceAudit(verifiedSources, conflicts);

  // Step 8: Verified media retrieval (Wikimedia, YouTube)
  const media = await retrieveVerifiedMedia(queryContext.cleanTopic, verifiedSources);

  // Step 9: Grounded AI synthesis / deterministic extraction
  const report = await callLlmSynthesis(
    queryContext,
    verifiedSources,
    evidenceAudit,
    conflicts,
    segregatedContent,
    media
  );

  // Attach query metadata
  const finalDossier = {
    ...report,
    queryContext,
    groupedCoverage: groupedEvents,
    mode,
    success: true,
  };

  // Cache result
  setCache(cacheKey, finalDossier);

  return finalDossier;
}

/**
 * Handle "Search More" (Requirement #24)
 */
export async function handleSearchMore(topic, currentSources = []) {
  const queryContext = understandQuery(`${topic} deep research analysis`);
  const rawResults = await orchestrateSearch(queryContext);
  const existingUrls = new Set(currentSources.map(s => s.url));

  const newSources = validateAndRankSources(
    rawResults.filter(r => !existingUrls.has(r.url)),
    queryContext
  );

  return {
    newSources,
    count: newSources.length,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Connect/Express middleware router
 */
export function createResearchApiMiddleware() {
  return async (req, res, next) => {
    const url = req.url || '';

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    if (url.startsWith('/api/research') && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const result = await handleResearch(parsed.query, parsed.mode, parsed.forceRefresh);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (err) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: err.message || 'Research failed.' }));
        }
      });
      return;
    }

    if (url.startsWith('/api/search-more') && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const result = await handleSearchMore(parsed.topic, parsed.currentSources);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (err) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    if (url.startsWith('/api/health')) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({
        status: 'online',
        engine: 'Real-Time Verified Research Engine v2.5',
        timestamp: new Date().toISOString(),
      }));
      return;
    }

    next();
  };
}
