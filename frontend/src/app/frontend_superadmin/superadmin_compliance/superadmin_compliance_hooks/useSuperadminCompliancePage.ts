'use client';// DATA FLOW: API → useSuperadminCompliancePage.ts → SuperadminComplianceMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { fetchComplianceOverview } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_api/SuperadminComplianceApi';
import { SUPERADMIN_COMPLIANCE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_constants/SuperadminComplianceQueryKeys';


/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages compliance state, queries, and UI interactions for useSuperadminCompliancePage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCompliancePage → consuming feature component.
export function useSuperadminCompliancePage() { const query = useQuery({ queryKey: SUPERADMIN_COMPLIANCE_QUERY_KEYS.overview, queryFn: fetchComplianceOverview }); return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch }; }
