// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Gyms module.
import { z } from 'zod';
export const TenantStatusSchema = z.enum(['ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELLED']);
export type TenantStatus = z.infer<typeof TenantStatusSchema>;
export const SubscriptionHistoryItemSchema = z.object({
    id: z.string(),
    planName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(['ACTIVE', 'EXPIRED', 'CANCELLED']),
    amount: z.number()
});
export type SubscriptionHistoryItem = z.infer<typeof SubscriptionHistoryItemSchema>;
export const UsageStatsSchema = z.object({
    storageUsedMb: z.number(),
    apiCallsMonthly: z.number(),
    activeMembers: z.number()
});
export type UsageStats = z.infer<typeof UsageStatsSchema>;
export const TenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    ownerName: z.string(),
    adminEmail: z.string().email(),
    phone: z.string(),
    status: TenantStatusSchema,
    plan: z.string(),
    createdAt: z.string(),
    memberCount: z.number(),
    monthlyRevenue: z.number(),
    databaseVersion: z.string(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    gstin: z.string().optional(),
    trialEndsAt: z.string().optional(),
    lastLoginAt: z.string().optional(),
    lastActiveAt: z.string().nullable().optional(),
    staffCount: z.number().optional(),
    subscriptionHistory: z.array(SubscriptionHistoryItemSchema).optional(),
    usageStats: UsageStatsSchema.optional(),
});
export type Tenant = z.infer<typeof TenantSchema>;
export const GymStatsSchema = z.object({
    totalActive: z.number(),
    totalSuspended: z.number(),
    mrrContribution: z.number().optional(),
}).passthrough();
export type GymStats = z.infer<typeof GymStatsSchema>;
