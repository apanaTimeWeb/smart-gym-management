import { z } from 'zod';
export const RevenueChartDataSchema = z.object({ month: z.string(), mrr: z.number() });
export type RevenueChartData = z.infer<typeof RevenueChartDataSchema>;
export const GrowthChartDataSchema = z.object({ month: z.string(), gyms: z.number() });
export type GrowthChartData = z.infer<typeof GrowthChartDataSchema>;
