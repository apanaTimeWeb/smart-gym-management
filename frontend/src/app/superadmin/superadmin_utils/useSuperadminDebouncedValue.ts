'use client';
// RESPONSIBILITY: Debounces a rapidly changing Superadmin UI value before it participates in server queries.
// DATA FLOW: raw input/URL state → useSuperadminDebouncedValue → query params/query key → API.

import { useEffect, useState } from 'react';

const SUPERADMIN_SEARCH_DEBOUNCE_MS = 300;

/** Delays propagation of a changing value so search-driven server requests are not fired per keystroke. */
export function useSuperadminDebouncedValue<T>(value: T, delayMs = SUPERADMIN_SEARCH_DEBOUNCE_MS): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
