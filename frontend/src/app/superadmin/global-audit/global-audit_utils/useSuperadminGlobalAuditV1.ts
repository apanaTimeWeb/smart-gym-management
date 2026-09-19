// DATA FLOW: MSW/Backend → fetchGlobalAuditInvestigation() → TanStack Query → Audit Investigation UI
// RESPONSIBILITY: Owns query orchestration for Audit Investigation. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchGlobalAuditInvestigation } from '@/app/superadmin/global-audit/global-audit_api/SuperadminGlobalAuditInvestigationApi';
/**
 * Purpose: Owns query orchestration for Audit Investigation. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminGlobalAuditV1() {
    return useQuery({ queryKey: ['superadmin', 'global_audit_investigation'], queryFn: fetchGlobalAuditInvestigation });
}
