/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminTicketsV1Schema owned by the superadmin_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminTicketsV1DataSchema = z.object({ summary: z.object({ open: z.number(), urgent: z.number(), nearTarget: z.number(), overTarget: z.number(), averageFirstResponseMinutes: z.number(), averageResolutionHours: z.number(), satisfaction: z.number() }), agents: z.array(z.object({ name: z.string(), open: z.number(), urgent: z.number(), overTarget: z.number(), averageHours: z.number() })), aging: z.array(z.object({ bucket: z.string(), count: z.number() })), categories: z.array(z.object({ name: z.string(), count: z.number() })) });
