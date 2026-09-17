// DATA FLOW: MSW/Backend → fetchGlobalAuditInvestigation() → TanStack Query → Audit Investigation UI
// RESPONSIBILITY: Owns query orchestration for Audit Investigation. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchGlobalAuditInvestigation } from '@/app/superadmin/global-audit/global-audit_api/superadmin_global_audit_investigation_api';
export function useSuperadminGlobalAuditV1() {
    return useQuery({ queryKey: ['superadmin', 'global_audit_investigation'], queryFn: fetchGlobalAuditInvestigation });
}
