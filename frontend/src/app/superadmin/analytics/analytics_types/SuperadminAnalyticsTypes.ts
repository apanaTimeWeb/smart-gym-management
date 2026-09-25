import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Analytics module. No business logic — types only.
// Rule 7: All types isolated here; never inline in components or hooks.
export interface RevenueMetrics {
    mrr: number;
    arr: number;
    cancellationRate: number;
    ltv: number;
    cac: number;
    currency?: string;
    activeTenants: number;
    arpu: number;
    mrrDeltaPercent: number;
    arrDeltaPercent: number;
    cancellationDeltaPercent?: number;
}
/** Revenue breakdown by plan tier for donut/pie chart */
export interface PlanRevenueBreakdown {
    plan: string;
    revenue: number;
    tenantCount: number;
}
/** Monthly data point for MRR area chart and tenant growth bar chart */
export interface MonthlyAnalyticsDataPoint {
    month: string;
    mrr: number;
    tenantCount: number;
    cancelledCount: number;
}
/** Shape of full analytics API response data */
export interface AnalyticsApiData {
    metrics: RevenueMetrics;
    monthly: MonthlyAnalyticsDataPoint[];
    planRevenue?: PlanRevenueBreakdown[];
}
/** Canonical async state enum — Rule 42: never use boolean `isPending` flags */
/** Schema for a single revenue history data point (API variant with generic keys). */
const RevenueHistoryPointSchema = z.object({
    month: z.string(),
    amount: z.number(),
}).passthrough();
/** Schema for a single user growth data point. */
const UserGrowthPointSchema = z.object({
    month: z.string(),
    count: z.number(),
}).passthrough();
export const AnalyticsApiDataSchema = z.object({
    metrics: z.object({
        mrr: z.number(),
        arr: z.number(),
        cancellationRate: z.number(),
        ltv: z.number(),
        cac: z.number(),
        currency: z.string().optional(),
        activeTenants: z.number(),
        arpu: z.number(),
        mrrDeltaPercent: z.number(),
        arrDeltaPercent: z.number(),
        cancellationDeltaPercent: z.number().optional(),
    }),
    monthly: z.array(z.object({
        month: z.string(),
        mrr: z.number(),
        tenantCount: z.number(),
        cancelledCount: z.number(),
    })),
    planRevenue: z.array(z.object({
        plan: z.string(),
        revenue: z.number(),
        tenantCount: z.number(),
    })).optional(),
}).passthrough();
export type RevenueHistoryPoint = z.infer<typeof RevenueHistoryPointSchema>;
export type UserGrowthPoint = z.infer<typeof UserGrowthPointSchema>;
export const RevenueChartDataSchema = z.object({ month: z.string(), mrr: z.number() });
export type RevenueChartData = z.infer<typeof RevenueChartDataSchema>;
export const GrowthChartDataSchema = z.object({ month: z.string(), gyms: z.number() });
export type GrowthChartData = z.infer<typeof GrowthChartDataSchema>;
