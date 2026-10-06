// RESPONSIBILITY: Runtime schemas for Manager plan-change request API responses.
import { z } from 'zod';

/**
 * @description Provides the ManagerPlansChangeRequestSchema implementation for the plans module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerPlansChangeRequestResponseSchema = z.object({
  requestId: z.string(),
  status: z.literal('PENDING') });
