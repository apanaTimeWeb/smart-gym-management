import { z } from 'zod';

export const SuperadminReleaseNoteSchema = z.object({
  version: z.string().min(1, 'Version is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export type SuperadminReleaseNoteFormValues = z.infer<typeof SuperadminReleaseNoteSchema>;
