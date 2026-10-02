'use client';// DATA FLOW: MSW/Backend → fetchGlobalAuditInvestigation() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchGlobalAuditInvestigation } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi';
import { SUPERADMIN_GLOBAL_AUDIT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditQueryKeys';



/**
 * @description Provides the Global Audit list query with URL-derived filters and feature-owned cache identity.
 * @dependencies TanStack Query, Global Audit API, query-key registry, and filter constants.
 * @edge-case Unsupported filter values are normalized to safe defaults before they reach the API boundary.
 */
export function useSuperadminGlobalAuditV1() {
  return useQuery({
    queryKey: SUPERADMIN_GLOBAL_AUDIT_QUERY_KEYS.investigation,
    queryFn: () => fetchGlobalAuditInvestigation(),
  });
}
