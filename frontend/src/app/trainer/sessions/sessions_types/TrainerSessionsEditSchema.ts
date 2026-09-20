import { z } from 'zod';
export const TrainerSessionsEditFormSchema = z.object({ time: z.string().min(1, 'Time is required'), duration: z.string().min(1, 'Duration is required'), location: z.string().optional(), room: z.string().optional() });
export type TrainerSessionsEditFormValues = z.infer<typeof TrainerSessionsEditFormSchema>;
