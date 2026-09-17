// DATA FLOW: MSW/Backend → fetchPlansBusinessControls() → TanStack Query → Plan Comparison & Pricing Control UI
// RESPONSIBILITY: Owns query orchestration for Plan Comparison & Pricing Control. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchPlansBusinessControls } from '@/app/superadmin/plans/plans_api/superadmin_plans_business_controls_api';
export function useSuperadminPlansV1() {
    return useQuery({ queryKey: ['superadmin', 'plans_business_controls'], queryFn: fetchPlansBusinessControls });
}
