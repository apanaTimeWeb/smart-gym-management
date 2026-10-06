/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const PlatformSettingSchema = z.object({
    id: z.string(),
    key: z.string(),
    value: z.string(),
    description: z.string(),
    category: z.string(),
    dataType: z.enum(['string', 'number', 'boolean']),
});
