"use client";
import { useEffect, useState } from 'react';

/**
 * @description Owns the Plans toolbar local search buffer and 300ms server-search debounce.
 * @dependencies React state/effect primitives and the module-owned search setter.
 * @edge-case Cancels pending searches and mirrors external search changes without stale local values.
 */
export function useAdminPlansToolbarSearch(search: string, setSearch: (value: string) => void) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    if (localSearch === search) return undefined;
    const timer = window.setTimeout(() => setSearch(localSearch), 300);
    return () => window.clearTimeout(timer);
  }, [localSearch, search, setSearch]);

  return { localSearch, setLocalSearch };
}
