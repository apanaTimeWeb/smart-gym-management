import { z } from 'zod';
import { TenantSchema } from '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types';
export const SaaSDashboardMetricsSchema = z.object({
  totalGyms: z.number(),
  activeGyms: z.number(),
  suspendedGyms: z.number(),
  trialGyms: z.number(),
  totalEndUsers: z.number(),
  monthlyRecurringRevenue: z.number(),
  mrrDeltaPercent: z.number().optional(),
  arrDeltaPercent: z.number().optional(),
  arpu: z.number().optional(),
  revenueByTier: z.array(z.object({ plan: z.string(), amount: z.number() })).optional(),
  revenueByGeography: z.array(z.object({ region: z.string(), revenue: z.number() })).optional(),
  overdueInvoicesCount: z.number(),
  pendingRevenue: z.number(),
  recentOnboards: z.array(TenantSchema),
  platformHealthScore: z.number().optional(),
  trialsExpiringIn7Days: z.number().optional(),
});
export type SaaSDashboardMetrics = z.infer<typeof SaaSDashboardMetricsSchema>;
