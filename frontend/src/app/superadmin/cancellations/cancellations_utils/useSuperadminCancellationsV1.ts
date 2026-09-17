// DATA FLOW: MSW/Backend → fetchCancellationReasonInsights() → TanStack Query → Why Gyms Leave UI
// RESPONSIBILITY: Owns query orchestration for Why Gyms Leave. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchCancellationReasonInsights } from '@/app/superadmin/cancellations/cancellations_api/superadmin_cancellations_reason_insights_api';
export function useSuperadminCancellationsV1() {
    return useQuery({ queryKey: ['superadmin', 'cancellations_reason_insights'], queryFn: fetchCancellationReasonInsights });
}
