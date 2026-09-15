import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Analytics module. No business logic — types only.
// Rule 7: All types isolated here; never inline in components or hooks.

export interface RevenueMetrics {
  mrr: number;
  arr: number;
  cancellationRate: number;
  ltv: number;
  cac: number;
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

/** Canonical async state enum — Rule 42: never use boolean `isLoading` flags */
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
  activeUsers: z.number(),
  monthlyRecurringRevenue: z.number(),
  cancellationRate: z.number(),
  newSignups: z.number(),
  revenueHistory: z.array(RevenueHistoryPointSchema),
  userGrowth: z.array(UserGrowthPointSchema),
});

export type RevenueHistoryPoint = z.infer<typeof RevenueHistoryPointSchema>;
export type UserGrowthPoint = z.infer<typeof UserGrowthPointSchema>;


export const RevenueChartDataSchema = z.object({ month: z.string(), mrr: z.number() });
export type RevenueChartData = z.infer<typeof RevenueChartDataSchema>;
export const GrowthChartDataSchema = z.object({ month: z.string(), gyms: z.number() });
export type GrowthChartData = z.infer<typeof GrowthChartDataSchema>;
