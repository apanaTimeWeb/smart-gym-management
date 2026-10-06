/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminWhiteLabelingSchemas owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const WhiteLabelDomainSchema = z.object({
  id: z.string().uuid(),
  gymId: z.string().uuid(),
  gymName: z.string(),
  domain: z.string(),
  status: z.enum(['pending', 'active', 'failed']),
  sslStatus: z.enum(['pending', 'issued', 'failed']),
  logoUrl: z.string().url().nullable().optional(),
  primaryColor: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
});

export const WhiteLabelDomainsDataSchema = z.array(WhiteLabelDomainSchema);

export const UpdateDomainStatusSchema = z.object({
  status: z.enum(['pending', 'active', 'failed']),
});

export const UpdateDomainStatusDataSchema = WhiteLabelDomainSchema;
