// INFRASTRUCTURE BOUNDARY: Zero-business debounce primitive used by Superadmin feature queries; it owns no domain data or rules.
// DATA FLOW: Component search input → useDebouncedValue → query parameters → API/MSW request.
// RESPONSIBILITY: Delays module-owned user-entered query values before they reach API-backed data requests.
import { useEffect, useState } from 'react';

/** Delays a value before API-backed Superadmin query state is recalculated. */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

// EFFECT INTENT: schedules a deferred client-side side effect and cleans it up when dependencies change.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
}
