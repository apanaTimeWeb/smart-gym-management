// RESPONSIBILITY: Defines Zod validation for membership lifecycle form variants.
import { z } from 'zod';

/**
 * @description Provides the ManagerPlansMembershipSchemas implementation for the plans module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerPlansActivateSchema = z.object({ memberId: z.string().min(1, 'Member is required'), planId: z.string().min(1, 'Plan is required'), startDate: z.string().min(1, 'Start date is required') });
export const managerPlansRenewSchema = z.object({ memberId: z.string().min(1, 'Member is required'), planId: z.string().min(1, 'Plan is required'), newExpiryDate: z.string().min(1, 'New expiry date is required') });
export const managerPlansFreezeSchema = z.object({ memberId: z.string().min(1, 'Member is required'), freezeFrom: z.string().min(1, 'Freeze start is required'), freezeUntil: z.string().min(1, 'Freeze end is required') });
