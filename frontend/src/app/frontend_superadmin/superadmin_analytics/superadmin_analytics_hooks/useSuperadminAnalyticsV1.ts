'use client';// DATA FLOW: MSW/Backend → fetchAnalyticsRetentionInsights() → TanStack Query → Customer Retention & Growth Insights UI
// RESPONSIBILITY: Owns query orchestration for Customer Retention & Growth Insights. No JSX.
import { useQuery } from '@tanstack/react-query';

import { analyticsApi } from "@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_api/SuperadminAnalyticsApi";
import { SUPERADMIN_ANALYTICS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_constants/SuperadminAnalyticsQueryKeys';



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
/**
 * @description Owns the useSuperadminAnalyticsV1 responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminAnalyticsV1() {
    return useQuery({ queryKey: SUPERADMIN_ANALYTICS_QUERY_KEYS.retentionInsights, queryFn: () => analyticsApi.fetchRevenueMetrics() });
}
