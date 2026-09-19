// RESPONSIBILITY: Defines the runtime-validated data contract for the Superadmin Gym 360 workspace.
import { z } from 'zod';
export const SuperadminGymDetailTabSchema = z.enum(['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support']);
export const SuperadminGymDetailUsageItemSchema = z.object({
    label: z.string(),
    used: z.number(),
    limit: z.number(),
    percent: z.number(),
});
export const SuperadminGymDetailDataSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    name: z.string().optional(),
    status: z.string().optional(),
    memberCount: z.number().optional(),
    monthlyRevenue: z.number().optional(),
    plan: z.string().optional(),
    databaseVersion: z.string().optional(),
    ownerName: z.string().optional(),
    adminEmail: z.string().email().optional(),
    phone: z.string().optional(),
    createdAt: z.string().optional(),
    lastLoginAt: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    gstin: z.string().optional(),
    trialEndsAt: z.string().optional(),
    tabs: z.array(SuperadminGymDetailTabSchema),
    health: z.object({
        score: z.number(),
        loginTrend: z.number(),
        memberTrend: z.number(),
        paymentFailures: z.number(),
        openTickets: z.number(),
    }),
    usage: z.array(SuperadminGymDetailUsageItemSchema),
    billing: z.object({
        monthlyIncome: z.number(),
        nextPayment: z.string(),
        failedPayments: z.number(),
        discount: z.string(),
    }),
    support: z.object({
        openTickets: z.number(),
        averageResponseHours: z.number(),
        satisfaction: z.number(),
    }),
    activity: z.array(z.object({
        date: z.string(),
        event: z.string(),
    })),
    subscription: z.object({
        plan: z.string(),
        started: z.string(),
        renewal: z.string(),
        monthlyIncome: z.number(),
    }),
});
export const SuperadminGymDetailResponseSchema = z.object({
    data: SuperadminGymDetailDataSchema,
    message: z.string(),
    success: z.boolean(),
});
export type SuperadminGymDetailTab = z.infer<typeof SuperadminGymDetailTabSchema>;
export type SuperadminGymDetailUsageItem = z.infer<typeof SuperadminGymDetailUsageItemSchema>;
export type SuperadminGymDetailData = z.infer<typeof SuperadminGymDetailDataSchema>;
export type SuperadminGymDetailResponse = z.infer<typeof SuperadminGymDetailResponseSchema>;
export interface SuperadminGymDetailClientProps {
    gymId: string;
}
