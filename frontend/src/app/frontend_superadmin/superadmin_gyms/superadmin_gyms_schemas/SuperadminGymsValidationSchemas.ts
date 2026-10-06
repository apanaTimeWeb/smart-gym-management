/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsValidationSchemas owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Contains the Zod validation schema and inferred types for the Gym onboarding form. Isolated to the Gyms module.
import { z } from 'zod';
export const OnboardGymSchema = z.object({
    gymName: z.string().min(2, 'Gym name must be at least 2 characters'),
    ownerName: z.string().min(2, 'Owner name is required'),
    adminEmail: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number required'),
    aadharNumber: z.string()
        .regex(/^\d{12}$/, 'Aadhar number must be exactly 12 digits')
        .optional()
        .or(z.literal('')),
    plan: z.string().min(1, 'Please select a plan'),
    temporaryPassword: z.string().min(8, 'Password must be at least 8 characters'),
});
export type OnboardGymFormValues = z.infer<typeof OnboardGymSchema>;
