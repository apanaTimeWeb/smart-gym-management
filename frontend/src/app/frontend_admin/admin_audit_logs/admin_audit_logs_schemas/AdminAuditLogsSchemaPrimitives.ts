import { z } from 'zod';
export const auditSeveritySchema = z.union([z.literal('high'), z.literal('medium'), z.literal('low')]);
