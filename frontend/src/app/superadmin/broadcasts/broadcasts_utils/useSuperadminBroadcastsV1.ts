// DATA FLOW: MSW/Backend → fetchBroadcastAudienceInsights() → TanStack Query → Audience Segmentation UI
// RESPONSIBILITY: Owns query orchestration for Audience Segmentation. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBroadcastAudienceInsights } from '@/app/superadmin/broadcasts/broadcasts_api/superadmin_broadcasts_audience_insights_api';
export function useSuperadminBroadcastsV1() {
    return useQuery({ queryKey: ['superadmin', 'broadcasts_audience_insights'], queryFn: fetchBroadcastAudienceInsights });
}
