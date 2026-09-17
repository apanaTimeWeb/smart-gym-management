// DATA FLOW: MSW/Backend → fetchReportsComparison() → TanStack Query → Report Comparison UI
// RESPONSIBILITY: Owns query orchestration for Report Comparison. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchReportsComparison } from '@/app/superadmin/reports/reports_api/superadmin_reports_comparison_api';
export function useSuperadminReportsV1() {
    return useQuery({ queryKey: ['superadmin', 'reports_comparison'], queryFn: fetchReportsComparison });
}
