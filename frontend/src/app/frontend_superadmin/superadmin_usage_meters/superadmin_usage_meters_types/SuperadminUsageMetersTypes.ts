/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_usage-meters_types.ts
import { z } from 'zod';

import { UsageMeterSchema } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_schemas/SuperadminUsageMetersContractSchemas';


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
