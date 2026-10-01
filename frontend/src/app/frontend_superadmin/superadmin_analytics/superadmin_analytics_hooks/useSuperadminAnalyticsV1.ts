// DATA FLOW: MSW/Backend → fetchAnalyticsRetentionInsights() → TanStack Query → Customer Retention & Growth Insights UI
// RESPONSIBILITY: Owns query orchestration for Customer Retention & Growth Insights. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_ANALYTICS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_query_keys/SuperadminAnalyticsQueryKeys';
import { fetchAnalyticsRetentionInsights } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_api/SuperadminAnalyticsApi';

/**
 * Purpose: Owns query orchestration for Customer Retention & Growth Insights. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Customer Retention & Growth Insights. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminAnalyticsV1() {
    return useQuery({ queryKey: SUPERADMIN_ANALYTICS_QUERY_KEYS.retentionInsights, queryFn: fetchAnalyticsRetentionInsights });
}
