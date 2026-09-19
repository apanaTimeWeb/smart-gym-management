// DATA FLOW: MSW/Backend → fetchAnalyticsRetentionInsights() → TanStack Query → Customer Retention & Growth Insights UI
// RESPONSIBILITY: Owns query orchestration for Customer Retention & Growth Insights. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsRetentionInsights } from '@/app/superadmin/analytics/analytics_api/SuperadminAnalyticsRetentionInsightsApi';
/**
 * Purpose: Owns query orchestration for Customer Retention & Growth Insights. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminAnalyticsV1() {
    return useQuery({ queryKey: ['superadmin', 'analytics_retention_insights'], queryFn: fetchAnalyticsRetentionInsights });
}
