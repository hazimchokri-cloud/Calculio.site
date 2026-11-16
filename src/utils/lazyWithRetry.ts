import React from 'react';

const RELOAD_COOLDOWN_KEY = 'calculio_chunk_reload_ts';
const RELOAD_COOLDOWN_MS = 15_000;

const failedLazyResetters = new Set<() => void>();

/**
 * Recreates any React.lazy instances whose previous import rejected so subsequent
 * navigations or "Try Again" actions attempt a fresh import instead of hitting
 * React's cached rejected promise.
 */
export function resetFailedLazyModules(): void {
  if (failedLazyResetters.size === 0) return;
  for (const reset of failedLazyResetters) {
    reset();
  }
  failedLazyResetters.clear();
}

/**
 * Detects browser dynamic-import / chunk-loading / Vite preload failures across
 * Chromium, Firefox, Safari, and Rollup/Vite bundles.
 */
export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const name = typeof error === 'object' && 'name' in error ? String((error as { name?: unknown }).name) : '';
  const message =
    typeof error === 'object' && 'message' in error
      ? String((error as { message?: unknown }).message)
      : String(error);

  if (name === 'ChunkLoadError') return true;

  const normalized = message.toLowerCase();
  return (
    normalized.includes('failed to fetch dynamically imported module') ||
    normalized.includes('error loading dynamically imported module') ||
    normalized.includes('importing a module script failed') ||
    normalized.includes('loading chunk') ||
    normalized.includes('loading css chunk') ||
    normalized.includes('unable to preload css') ||
    normalized.includes('failed to load module script') ||
    normalized.includes('outdated optimize dep')
  );
}

/**
 * Attempts a single cooldown-guarded page reload to recover from stale hashed chunks
 * after deployments or outdated Vite pre-bundled dependencies.
 * Returns true if a reload was initiated.
 */
export function attemptChunkReload(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const lastReloadRaw = window.sessionStorage.getItem(RELOAD_COOLDOWN_KEY);
    const lastReload = lastReloadRaw ? Number(lastReloadRaw) : 0;
    const now = Date.now();
    if (!Number.isFinite(lastReload) || now - lastReload > RELOAD_COOLDOWN_MS) {
      window.sessionStorage.setItem(RELOAD_COOLDOWN_KEY, String(now));
      window.location.reload();
      return true;
    }
  } catch {
    // If sessionStorage is blocked (e.g., strict privacy sandbox), avoid blind reload loops
    return false;
  }
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function importWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  retries = 2
): Promise<{ default: T }> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await importer();
    } catch (err) {
      lastError = err;
      if (!isChunkLoadError(err) || attempt === retries) {
        break;
      }
      await delay(200 * (attempt + 1));
    }
  }

  if (isChunkLoadError(lastError) && attemptChunkReload()) {
    // Keep Suspense pending while browser performs the reload
    return new Promise<{ default: T }>(() => {});
  }

  throw lastError;
}

/**
 * Wraps React.lazy with transient retry, cooldown-guarded stale-chunk reload,
 * and deferred reset registration so failed imports never poison subsequent navigations.
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): React.ComponentType<React.ComponentProps<T>> {
  const createLazy = () =>
    React.lazy(() =>
      importWithRetry(importer).catch((error) => {
        failedLazyResetters.add(reset);
        throw error;
      })
    );

  let LazyComponent = createLazy();

  function reset() {
    LazyComponent = createLazy();
  }

  const LazyRetryWrapper: React.FC<React.ComponentProps<T>> = (props) => {
    return React.createElement(LazyComponent, props as any);
  };

  return LazyRetryWrapper;
}
