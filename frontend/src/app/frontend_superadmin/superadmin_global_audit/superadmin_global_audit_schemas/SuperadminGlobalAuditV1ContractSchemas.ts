/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminGlobalAuditV1DataSchema = z.object({ changes: z.array(z.object({ time: z.string(), actor: z.string(), action: z.string(), resource: z.string(), before: z.string(), after: z.string(), risk: z.string() })), anomalies: z.array(z.object({ title: z.string(), detail: z.string(), severity: z.string() })), filters: z.array(z.string()) });
export const SuperadminGlobalAuditV1ResponseSchema = z.object({ data: SuperadminGlobalAuditV1DataSchema, message: z.string(), success: z.boolean() });
