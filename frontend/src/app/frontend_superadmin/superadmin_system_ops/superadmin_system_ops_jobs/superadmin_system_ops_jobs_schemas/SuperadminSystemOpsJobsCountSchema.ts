import { z } from 'zod';

export const CountResponseSchema = z.object({ affectedCount: z.number().nonnegative() });
