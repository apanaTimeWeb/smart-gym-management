// INFRASTRUCTURE BOUNDARY: Zero-business URL-state primitive; feature-specific parameter names remain owned by the consuming feature.
// DATA FLOW: Superadmin UI → useSuperadminUrlState → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Provides a reusable hook for managing URL search parameters (query-driven server state).
// DATA FLOW: Component -> useSuperadminUrlState -> URL Search Params -> TanStack Query
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
/**
 * Purpose: Provides a reusable hook for managing URL search parameters (query-driven server state).
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminUrlState() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const getParam = useCallback((key: string, defaultValue: string = '') => {
        return searchParams.get(key) || defaultValue;
    }, [searchParams]);
    const setParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        let hasChanges = false;
        Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== 'All') {
                if (params.get(key) !== value) {
                    params.set(key, value);
                    hasChanges = true;
                }
            }
            else {
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
    const setParam = useCallback((key: string, value: string | null) => {
        setParams({ [key]: value });
    }, [setParams]);
    return { searchParams, getParam, setParam, setParams };
}
