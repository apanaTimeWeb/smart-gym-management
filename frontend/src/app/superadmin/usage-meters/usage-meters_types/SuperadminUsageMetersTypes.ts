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
    metricName: z.string(),
    currentValue: z.number(),
    limitValue: z.number(),
    resetDate: z.string()
});
