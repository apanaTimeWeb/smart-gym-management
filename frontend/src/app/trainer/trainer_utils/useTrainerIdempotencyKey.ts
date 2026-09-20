'use client';
// RESPONSIBILITY: Owns stable per-action idempotency keys so Trainer mutation retries reuse the original key.

import { useCallback, useRef } from 'react';

/**
 * Returns one UUID per logical user action. Calling `begin` again with the same action id reuses its key.
 * @returns Key lifecycle helpers for confirmation-time generation and retry reuse.
 */
export function useTrainerIdempotencyKey() {
  const keyMapRef = useRef<Record<string, string>>({});

  const begin = useCallback((actionId: string): string => {
    const existing = keyMapRef.current[actionId];
    if (existing) return existing;
    const next = crypto.randomUUID();
    keyMapRef.current[actionId] = next;
    return next;
  }, []);

  const current = useCallback((actionId: string): string | null => keyMapRef.current[actionId] ?? null, []);
  const clear = useCallback((actionId: string) => {
    const next = { ...keyMapRef.current };
    delete next[actionId];
    keyMapRef.current = next;
  }, []);

  return { begin, current, clear };
}
