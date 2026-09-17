import { z } from 'zod';

export const WorkoutExerciseSchema = z.object({
  exerciseId: z.string().optional(),
  name: z.string(),
  sets: z.coerce.number().min(1),
  reps: z.string().or(z.coerce.number().transform(v => String(v))),
  weight: z.string().optional().default(''),
  restTime: z.string().optional().default(''),
  sortOrder: z.coerce.number().default(0),
});

export const WorkoutSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name is required'),
  level: z.string(),
  days: z.coerce.number().min(1, 'Must be a valid number > 0'),
  exercises: z.coerce.number().min(1, 'Must be a valid number > 0'),
  focus: z.string().min(2, 'Focus area is required'),
  duration: z.string().min(2, 'Duration is required'),
  tags: z.array(z.string()).or(z.string().transform(s => s.split(',').map(t => t.trim()).filter(Boolean))),
  goal: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  instructions: z.string().optional(),
  assignedMemberId: z.string().optional(),
  workoutExercises: z.array(WorkoutExerciseSchema).optional(),
  isActive: z.boolean().optional(),
});

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name is required'),
  category: z.string().optional(),
  muscleGroup: z.array(z.string()).optional(),
  equipment: z.string().optional(),
  difficulty: z.string(),
  instructions: z.string().optional(),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
  sets: z.number().optional(),
  reps: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
});

export const CreateWorkoutPlanSchema = WorkoutSchema.omit({ id: true, isActive: true }).extend({
  tags: z.string().optional(), // DTO takes string for tags
});

export const CreateExerciseSchema = ExerciseSchema.omit({ id: true, isActive: true }).extend({
  muscle: z.string().min(2, 'Primary muscle is required'),
});

export type Workout = z.infer<typeof WorkoutSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type WorkoutExercise = z.infer<typeof WorkoutExerciseSchema>;
export type CreateWorkoutPlanDto = z.infer<typeof CreateWorkoutPlanSchema>;
export type CreateWorkoutFormValues = z.input<typeof CreateWorkoutPlanSchema>;
export type CreateExerciseDto = z.infer<typeof CreateExerciseSchema>;
export type CreateExerciseFormValues = z.input<typeof CreateExerciseSchema>;

export const EMPTY_WORKOUT_FORM: CreateWorkoutFormValues = { 
  name: '', 
  level: 'Beginner', 
  days: 0, 
  exercises: 0, 
  focus: '', 
  duration: '', 
  tags: '',
  goal: '',
  startDate: '',
  endDate: '',
  instructions: '',
  assignedMemberId: '',
  workoutExercises: []
};

export const EMPTY_EXERCISE_FORM: CreateExerciseFormValues = { 
  name: '', 
  muscle: '', 
  equipment: 'Barbell', 
  difficulty: 'Beginner',
  instructions: '',
  videoUrl: ''
};
