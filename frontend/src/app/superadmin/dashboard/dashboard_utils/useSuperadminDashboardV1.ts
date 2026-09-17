// DATA FLOW: MSW/Backend → fetchDashboardBusinessOverview() → TanStack Query → Business Overview UI
// RESPONSIBILITY: Owns query orchestration for Business Overview. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardBusinessOverview } from '@/app/superadmin/dashboard/dashboard_api/superadmin_dashboard_business_overview_api';
export function useSuperadminDashboardV1() {
    return useQuery({ queryKey: ['superadmin', 'dashboard_business_overview'], queryFn: fetchDashboardBusinessOverview });
}
