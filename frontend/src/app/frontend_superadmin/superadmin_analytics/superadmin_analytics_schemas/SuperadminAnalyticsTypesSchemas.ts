import { z } from 'zod';

const RevenueHistoryPointSchema = z.object({
    month: z.string(),
    amount: z.number(),
}).passthrough();

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

export const RevenueChartDataSchema = z.object({ month: z.string(), mrr: z.number() });

export const GrowthChartDataSchema = z.object({ month: z.string(), gyms: z.number() });
