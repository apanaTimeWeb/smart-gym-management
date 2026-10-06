"use client";

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MANAGER_GRIEVANCE_SEARCH_QUERY_PARAM } from '@/app/frontend_manager/manager_grievance/manager_grievance_constants/ManagerGrievanceConstants';

/**
 * @description Owns the shareable grievance search state in the URL so refresh, deep links, and browser navigation preserve the active query.
 * @dependencies Uses Next.js router/search-param infrastructure and the module-owned search query parameter constant.
 * @edge-case Preserves unrelated query parameters and replaces only the grievance search parameter; empty search removes the parameter.
 */
// DATA FLOW: URL query parameter → useManagerGrievanceUrlState → ManagerGrievanceMain → grievance list request/rendering
/**
 * @description useManagerGrievanceUrlState owns the feature-level orchestration for the module and keeps server data, client UI state, and side effects at their documented boundaries.
 * @dependencies Uses only feature-owned APIs, schemas, types, constants, stores, and approved global infrastructure.
 * @edge-case Preserves documented loading, empty, error, retry, cancellation, permission, and direct-URL behavior for this flow.
 */
export function useManagerGrievanceUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get(MANAGER_GRIEVANCE_SEARCH_QUERY_PARAM) ?? '';

  const setSearch = useCallback((value: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const normalizedValue = value.trim();
    if (normalizedValue) {
      nextParams.set(MANAGER_GRIEVANCE_SEARCH_QUERY_PARAM, normalizedValue);
    } else {
      nextParams.delete(MANAGER_GRIEVANCE_SEARCH_QUERY_PARAM);
    }
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return { search, setSearch };
}
