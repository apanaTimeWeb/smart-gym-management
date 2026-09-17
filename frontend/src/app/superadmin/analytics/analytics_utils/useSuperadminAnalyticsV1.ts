// DATA FLOW: MSW/Backend → fetchAnalyticsRetentionInsights() → TanStack Query → Customer Retention & Growth Insights UI
// RESPONSIBILITY: Owns query orchestration for Customer Retention & Growth Insights. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsRetentionInsights } from '@/app/superadmin/analytics/analytics_api/superadmin_analytics_retention_insights_api';
export function useSuperadminAnalyticsV1() {
    return useQuery({ queryKey: ['superadmin', 'analytics_retention_insights'], queryFn: fetchAnalyticsRetentionInsights });
}
