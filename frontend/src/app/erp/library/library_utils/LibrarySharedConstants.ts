import { z } from 'zod';

export const ExerciseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string(),
  muscleGroup: z.string().optional(),
  sets: z.coerce.number().optional(),
  reps: z.coerce.number().optional(),
  duration: z.coerce.number().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  description: z.string().optional(),
  videoUrl: z.string().url("Invalid URL").optional().or(z.literal(''))
});

export type ExerciseFormValues = z.infer<typeof ExerciseSchema>;

export const DietSchema = z.object({
  name: z.string().min(2, "Name is required"),
  goal: z.string(),
  calories: z.coerce.number().min(0).optional(),
  protein: z.coerce.number().min(0).optional(),
  carbs: z.coerce.number().min(0).optional(),
  fats: z.coerce.number().min(0).optional(),
  description: z.string().optional(),
  meals: z.string().optional()
});

export type DietFormValues = z.infer<typeof DietSchema>;

export const CATEGORIES = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Full Body', 'Yoga'];

export const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export const GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility'];

export const DIFF_COLORS: Record<string, string> = {
 BEGINNER: 'bg-success-bg text-success',
 INTERMEDIATE: 'bg-warning-bg text-warning',
 ADVANCED: 'bg-danger-bg text-destructive',
};

export const EMPTY_EXERCISE_FORM = { 
 name: '', 
 category: 'Chest', 
 muscleGroup: '', 
 sets: '', 
 reps: '', 
 duration: '', 
 difficulty: 'BEGINNER', 
 description: '', 
 videoUrl: '' 
};

export const EMPTY_DIET_FORM = { 
 name: '', 
 goal: 'Weight Loss', 
 calories: '', 
 protein: '', 
 carbs: '', 
 fats: '', 
 description: '', 
 meals: '' 
};

export const LIBRARY_TABS = ['Exercises', 'Diet Plans'] as const;
export type LibraryTab = typeof LIBRARY_TABS[number];
