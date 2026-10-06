/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminFeaturesUiSchema owned by the superadmin_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const releaseNoteSchema = z.object({
  version: z.string().trim().min(1, 'Version is required'),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
});
