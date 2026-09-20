// RESPONSIBILITY: Types and validation contract for trainer-authored member notes.
import { z } from 'zod';

export const TrainerMemberNoteSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  date: z.string(),
});
export const CreateTrainerMemberNoteSchema = TrainerMemberNoteSchema.omit({ id: true, date: true });
export type TrainerMemberNote = z.infer<typeof TrainerMemberNoteSchema>;
export type CreateTrainerMemberNote = z.infer<typeof CreateTrainerMemberNoteSchema>;
