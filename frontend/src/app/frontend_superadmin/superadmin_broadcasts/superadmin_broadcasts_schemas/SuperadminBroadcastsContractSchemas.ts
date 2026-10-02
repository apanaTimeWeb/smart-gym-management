/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';

import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';


export const BroadcastStatusSchema = z.enum(['SENT', 'SCHEDULED', 'DRAFT']);
export const BroadcastAudienceSchema = z.enum(['ALL_TENANTS', 'PRO_ONLY', 'SUSPENDED_ONLY']);
export const BroadcastResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    status: BroadcastStatusSchema,
    targetGymIds: z.array(z.string()),
    scheduledDate: z.string().nullable().optional(),
    sentDate: z.string().nullable().optional(),
    totalRecipients: z.number().optional(),
    deliveredCount: z.number().optional(),
    failedCount: z.number().optional(),
    audience: BroadcastAudienceSchema.optional(),
});
export const BroadcastSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(5, 'Content must be at least 5 characters'),
    targetGymIds: z.array(z.string()).min(1, 'Select at least one gym'),
    status: z.enum(['DRAFT', 'SCHEDULED', 'SENT']),
    scheduledDate: z.string().optional().nullable(),
}).refine((data) => {
    if (data.status === SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED && !data.scheduledDate)
        return false;
    return true;
}, { message: 'Scheduled date is required when status is SCHEDULED', path: ['scheduledDate'] });
export const SuperadminBroadcastsTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
    ownerName: z.string().optional(),
    phone: z.string().optional(),
});
