/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingComposeSchema owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the Superadmin tenant-level message composer validation contract.
import { z } from 'zod';

export const SuperadminMessagingComposeSchema = z.object({
  tenantId: z.string().min(1, 'Select a tenant.'),
  channel: z.enum(['EMAIL', 'SMS', 'IN_APP']),
  subject: z.string().trim().min(1, 'Subject is required.').max(200, 'Subject must be 200 characters or fewer.'),
  body: z.string().trim().min(1, 'Message body is required.').max(5000, 'Message body must be 5000 characters or fewer.'),
});
