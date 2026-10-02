/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminBroadcastsV1DataSchema = z.object({ segments: z.array(z.object({ name: z.string(), count: z.number(), description: z.string() })), channels: z.array(z.object({ name: z.string(), sent: z.number(), delivered: z.number(), opened: z.number(), clicked: z.number() })), templates: z.array(z.string()) });
export const SuperadminBroadcastsV1ResponseSchema = z.object({ data: SuperadminBroadcastsV1DataSchema, message: z.string(), success: z.boolean() });
