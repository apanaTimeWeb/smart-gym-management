// DATA FLOW: Component search input → useSuperadminDebouncedValue → query parameters → API/MSW request.
// RESPONSIBILITY: Delays module-owned user-entered query values before they reach API-backed data requests.
import { useEffect, useState } from 'react';

/** Delays a value before API-backed Superadmin query state is recalculated. */
export function useSuperadminDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
}
