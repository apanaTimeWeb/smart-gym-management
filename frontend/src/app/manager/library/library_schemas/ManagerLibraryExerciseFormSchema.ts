import { z } from 'zod';

export const managerLibraryExerciseFormSchema = z.object({
  name: z.string().trim().min(2, 'Exercise name is required'),
  category: z.string().trim().min(2, 'Category is required'),
  muscleGroup: z.string().trim(),
  sets: z.number().min(0).max(100).optional(),
  reps: z.number().min(0).max(1000).optional(),
  duration: z.number().min(0).max(1440).optional(),
  difficulty: z.string().min(1, 'Difficulty is required'),
  description: z.string().trim().max(1000).optional(),
  videoUrl: z.string().trim().url('Enter a valid URL').or(z.literal('')).optional(),
  isActive: z.boolean(),
});

export type ManagerLibraryExerciseFormSchemaValues = z.infer<typeof managerLibraryExerciseFormSchema>;
