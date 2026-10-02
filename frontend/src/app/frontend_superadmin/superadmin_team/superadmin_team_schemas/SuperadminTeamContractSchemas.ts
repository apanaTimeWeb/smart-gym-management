/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminTeamResponseSchema = z.object({ users: z.array(z.object({ id:z.string(), name:z.string(), email:z.string().email(), role:z.string(), status:z.string(), mfa:z.string().nullable(), lastLogin:z.string().nullable() })), roles: z.array(z.object({ name:z.string(), scope:z.string(), permissions:z.number() })), alerts: z.array(z.object({ name:z.string(), channel:z.string(), threshold:z.string(), enabled:z.boolean() })) });
export const SuperadminTeamAlertPreferencesUpdateResponseSchema = z.object({ data: z.null() });
