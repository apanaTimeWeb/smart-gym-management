// DATA FLOW: MSW/Backend → fetchFranchise360() → TanStack Query → Franchise 360 & Branch Comparison UI
// RESPONSIBILITY: Owns query orchestration for Franchise 360 & Branch Comparison. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchFranchise360 } from '@/app/superadmin/franchises/franchises_api/superadmin_franchises_360_api';
export function useSuperadminFranchisesV1() {
    return useQuery({ queryKey: ['superadmin', 'franchises_360'], queryFn: fetchFranchise360 });
}
