/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlansSchema owned by the superadmin_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';
export const planFormSchema = z.object({
    name: z.string().min(1, 'Plan Name is required'),
    priceMonthly: z.coerce.number().min(0),
    priceAnnual: z.coerce.number().min(0),
    maxMembers: z.coerce.number().min(1),
    maxStaff: z.coerce.number().min(1),
    dbLimitGb: z.coerce.number().min(0),
    binaryLimitGb: z.coerce.number().min(0),
    features: z.array(z.object({ value: z.string().min(1, 'Feature cannot be empty') })).min(1),
});
