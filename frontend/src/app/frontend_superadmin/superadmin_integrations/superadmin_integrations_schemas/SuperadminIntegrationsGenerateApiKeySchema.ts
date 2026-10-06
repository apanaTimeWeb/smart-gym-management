/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminIntegrationsGenerateApiKeySchema owned by the superadmin_integrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminGenerateApiKeyFormSchema = z.object({
  label: z.string().trim().min(3, 'Label must be at least 3 characters'),
  tenantId: z.string().min(1, 'Please select a tenant'),
  scopes: z.array(z.enum(["READ", "WRITE", "ADMIN"] as const)).min(1, 'Please select at least one scope'),
});
