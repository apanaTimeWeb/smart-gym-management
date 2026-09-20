// RESPONSIBILITY: Owns Zod runtime validation schemas for the Admin Members module.
import { z } from 'zod';

export const memberSearchSchema = z.object({ search: z.string().optional() });
export const adminMemberSchema = z.any(); export const adminMembersSummarySchema = z.any();
