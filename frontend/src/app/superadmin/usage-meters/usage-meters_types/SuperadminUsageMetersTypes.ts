// RESPONSIBILITY: Encapsulates functionality for superadmin_usage-meters_types.ts
import { z } from 'zod';
export interface UsageMeter {
    id: string;
    tenantId: string;
    tenantName: string;
    smsSent: number;
    smsLimit: number;
    whatsappMessagesSent: number;
    whatsappLimit: number;
    emailsSent: number;
    emailLimit: number;
    apiCallsCount: number;
    apiCallsLimit?: number;
    databaseGb: number;
    mediaGb: number;
    storageLimitGb: number;
    activeMembers: number;
    totalMembers: number;
    memberLimit: number;
    staffCount: number;
    staffLimit: number;
    billingCycleEnd: string;
}
export const UsageMeterSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
    tenantName: z.string(),
    smsSent: z.number(),
    smsLimit: z.number(),
    whatsappMessagesSent: z.number(),
    whatsappLimit: z.number(),
    emailsSent: z.number(),
    emailLimit: z.number(),
    apiCallsCount: z.number(),
    apiCallsLimit: z.number().optional(),
    databaseGb: z.number(),
    mediaGb: z.number(),
    storageLimitGb: z.number(),
    activeMembers: z.number(),
    totalMembers: z.number(),
    memberLimit: z.number(),
    staffCount: z.number(),
    staffLimit: z.number(),
    billingCycleEnd: z.string(),
}).passthrough();
