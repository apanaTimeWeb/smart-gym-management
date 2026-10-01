import { z } from 'zod';

export const DashboardTenantSchema = z.object({
    id: z.string(), name: z.string(), ownerName: z.string(), adminEmail: z.string().email(), phone: z.string(),
    status: z.enum(['ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELLED']), plan: z.string(), createdAt: z.string(),
    memberCount: z.number(), monthlyRevenue: z.number(), currency: z.string(), databaseVersion: z.string(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), gstin: z.string().optional(), trialEndsAt: z.string().optional(), lastLoginAt: z.string().optional(), lastActiveAt: z.string().nullable().optional(), staffCount: z.number().optional(),
});

export const SaaSDashboardMetricsSchema = z.object({
    currency: z.string(),
    totalGyms: z.number(),
    activeGyms: z.number(),
    suspendedGyms: z.number(),
    trialGyms: z.number(),
    totalEndUsers: z.number(),
    monthlyRecurringRevenue: z.number(),
    mrrDeltaPercent: z.number().optional(),
    arrDeltaPercent: z.number().optional(),
    arpu: z.number().optional(),
    revenueByTier: z.array(z.object({ plan: z.string(), amount: z.number(), currency: z.string() })).optional(),
    revenueByGeography: z.array(z.object({ region: z.string(), revenue: z.number(), currency: z.string() })).optional(),
    overdueInvoicesCount: z.number(),
    pendingRevenue: z.number(),
    recentOnboards: z.array(DashboardTenantSchema),
    platformHealthScore: z.number().optional(),
    trialsExpiringIn7Days: z.number().optional(),
});

export const SuperadminDashboardApiDataSchema = z.object({
    metrics: SaaSDashboardMetricsSchema,
    revenue: z.array(z.object({ month: z.string(), mrr: z.number(), currency: z.string() })),
    growth: z.array(z.object({ month: z.string(), gyms: z.number() }))
});
