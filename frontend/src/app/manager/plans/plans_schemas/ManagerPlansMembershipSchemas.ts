// RESPONSIBILITY: Defines Zod validation for membership lifecycle form variants.
import { z } from 'zod';

export const managerPlansActivateSchema = z.object({ memberId: z.string().min(1, 'Member is required'), planId: z.string().min(1, 'Plan is required'), startDate: z.string().min(1, 'Start date is required') });
export const managerPlansRenewSchema = z.object({ memberId: z.string().min(1, 'Member is required'), planId: z.string().min(1, 'Plan is required'), newExpiryDate: z.string().min(1, 'New expiry date is required') });
export const managerPlansFreezeSchema = z.object({ memberId: z.string().min(1, 'Member is required'), freezeFrom: z.string().min(1, 'Freeze start is required'), freezeUntil: z.string().min(1, 'Freeze end is required') });
