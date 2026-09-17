// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
import { z } from 'zod';

export const SuperadminOffboardingResponseSchema = z.object({
    queue: z.array(
        z.object({
            id: z.string(),
            tenant: z.string(),
            status: z.string(),
            cancelledAt: z.string(),
            graceEndsAt: z.string(),
            exportSize: z.string().nullable(),
            owner: z.string().nullable(),
        }),
    ),
    policy: z.object({
        exportWindowDays: z.number(),
        gracePeriodDays: z.number(),
        purgeAfterGraceDays: z.number(),
        approvalRequired: z.boolean(),
        backupBeforePurge: z.boolean(),
    }),
    requests: z.array(
        z.object({
            tenant: z.string(),
            requestedBy: z.string(),
            requestType: z.string(),
            status: z.string(),
            requestedAt: z.string(),
        }),
    ),
});

export type SuperadminOffboardingResponse = z.infer<typeof SuperadminOffboardingResponseSchema>;

export interface SuperadminOffboardingSectionProps {
    data: SuperadminOffboardingResponse;
}
