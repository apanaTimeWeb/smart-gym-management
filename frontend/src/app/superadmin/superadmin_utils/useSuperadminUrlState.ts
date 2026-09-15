// RESPONSIBILITY: Provides a reusable hook for managing URL search parameters (query-driven server state).
// DATA FLOW: Component -> useSuperadminUrlState -> URL Search Params -> TanStack Query
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useSuperadminUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback((key: string, defaultValue: string = '') => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  const setParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Always reset to page 1 when filtering, sorting, or searching changes
    if (key !== 'page' && params.has('page')) {
       params.set('page', '1');
    }

    if (params.toString() !== searchParams.toString()) {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  const setParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanges = false;
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'All') {
        if (params.get(key) !== value) {
          params.set(key, value);
          hasChanges = true;
        }
      } else {
        if (params.has(key)) {
          params.delete(key);
          hasChanges = true;
        }
      }
    });

    // Reset to page 1 if any filter changed (except page itself)
    if (hasChanges && !Object.keys(updates).includes('page') && params.has('page')) {
      params.set('page', '1');
    }

    if (hasChanges) {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return { searchParams, getParam, setParam, setParams };
}
