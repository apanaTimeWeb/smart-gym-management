import { z } from 'zod';

export const releaseNoteSchema = z.object({
  version: z.string().trim().min(1, 'Version is required'),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
});
