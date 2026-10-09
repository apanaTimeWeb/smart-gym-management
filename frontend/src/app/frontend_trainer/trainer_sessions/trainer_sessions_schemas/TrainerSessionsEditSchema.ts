import { z } from 'zod';
export const TrainerSessionsEditFormSchema = z.object({ time: z.string().min(1, 'TEXT_TIME_REQUIRED'), duration: z.string().min(1, 'TEXT_DURATION_REQUIRED'), location: z.string().optional(), room: z.string().optional() });
