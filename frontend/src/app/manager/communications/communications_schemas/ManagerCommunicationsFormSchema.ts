// RESPONSIBILITY: Defines validation rules for the campaign composer form.
import { z } from 'zod';
export const managerCommunicationsFormSchema = z.object({
  title: z.string().trim().min(2, 'Campaign title is required'),
  channel: z.enum(['whatsapp', 'email']),
  segment: z.string().min(1, 'Segment is required'),
  message: z.string().trim().min(1, 'Message body is required'),
  subject: z.string().optional(),
});
