// DATA FLOW: MSW/Backend → fetchBranchesComparison() → TanStack Query → Branch Performance Comparison UI
// RESPONSIBILITY: Owns query orchestration for Branch Performance Comparison. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBranchesComparison } from '@/app/superadmin/branches/branches_api/superadmin_branches_comparison_api';
export function useSuperadminBranchesV1() {
    return useQuery({ queryKey: ['superadmin', 'branches_comparison'], queryFn: fetchBranchesComparison });
}
