// RESPONSIBILITY: Defines the runtime-validated data contract for the Superadmin Gym 360 workspace.
import { z } from 'zod';
export const SuperadminGymDetailV1TabSchema = z.enum(['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support']);
export const SuperadminGymDetailV1UsageItemSchema = z.object({
    label: z.string(),
    used: z.number(),
    limit: z.number(),
    percent: z.number(),
});
export const SuperadminGymDetailV1DataSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    tabs: z.array(SuperadminGymDetailV1TabSchema),
    health: z.object({
        score: z.number(),
        loginTrend: z.number(),
        memberTrend: z.number(),
        paymentFailures: z.number(),
        openTickets: z.number(),
    }),
    usage: z.array(SuperadminGymDetailV1UsageItemSchema),
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
export const SuperadminGymDetailV1ResponseSchema = z.object({
    data: SuperadminGymDetailV1DataSchema,
    message: z.string(),
    success: z.boolean(),
});
export type SuperadminGymDetailV1Tab = z.infer<typeof SuperadminGymDetailV1TabSchema>;
export type SuperadminGymDetailV1UsageItem = z.infer<typeof SuperadminGymDetailV1UsageItemSchema>;
export type SuperadminGymDetailV1Data = z.infer<typeof SuperadminGymDetailV1DataSchema>;
export type SuperadminGymDetailV1Response = z.infer<typeof SuperadminGymDetailV1ResponseSchema>;
export interface SuperadminGymDetailV1ClientProps {
    gymId: string;
}
