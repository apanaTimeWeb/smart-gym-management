import { z } from 'zod';

export const TrainerMemberAttendanceDaySchema = z.object({
  day: z.number().int().nonnegative(),
  status: z.string(),
});

export const TrainerMemberAttendanceResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(TrainerMemberAttendanceDaySchema).nullable().optional(),
});

export const TrainerMemberDietPlanListItemSchema = z.object({
  id: z.string(), name: z.string(), goal: z.string().optional(), calories: z.number().optional(),
  protein: z.number().optional(), carbs: z.number().optional(), fats: z.number().optional(),
  description: z.string().optional(), meals: z.array(z.union([z.string(), z.object({ name: z.string().optional(), time: z.string().optional(), items: z.string().optional(), description: z.string().optional() })])).optional(),
});

export const TrainerMemberDietPlansResponseSchema = z.object({
  success: z.boolean(), message: z.string(), data: z.object({ dietPlans: z.array(TrainerMemberDietPlanListItemSchema), total: z.number().int().nonnegative() }).nullable().optional(),
});

export const TrainerMemberWorkoutExerciseSchema = z.object({
  id: z.string().optional(), name: z.string(), sets: z.number(), reps: z.union([z.string(), z.number()]), restTime: z.string().optional(), weight: z.string().optional(),
});

export const TrainerMemberWorkoutPlanSchema = z.object({
  id: z.string(), name: z.string(), level: z.string().optional(), duration: z.string().optional(), focus: z.string().optional(), days: z.number().optional(),
  instructions: z.string().optional(),
  workoutExercises: z.array(TrainerMemberWorkoutExerciseSchema).optional(),
});

export const TrainerMemberWorkoutPlansResponseSchema = z.object({
  success: z.boolean(), message: z.string(), data: z.object({ workouts: z.array(TrainerMemberWorkoutPlanSchema), total: z.number().int().nonnegative() }).nullable().optional(),
});

export const TrainerMemberProgressEntrySchema = z.object({
  id: z.string(), memberId: z.string(), date: z.string(), weightKg: z.number(), heightCm: z.number().nullable().optional(), bmi: z.number().nullable().optional(),
  bodyFatPercent: z.number().nullable().optional(), muscleMassKg: z.number().nullable().optional(), chestCm: z.number().nullable().optional(), waistCm: z.number().nullable().optional(),
  recordedBy: z.string().optional(), progressPhotos: z.array(z.string()).optional(),
});

export const TrainerMemberProgressEntriesResponseSchema = z.object({
  success: z.boolean(), message: z.string(), data: z.array(TrainerMemberProgressEntrySchema).nullable().optional(),
});

export type TrainerMemberAttendanceDay = z.infer<typeof TrainerMemberAttendanceDaySchema>;
export type TrainerMemberDietPlanListItem = z.infer<typeof TrainerMemberDietPlanListItemSchema>;
export type TrainerMemberWorkoutPlan = z.infer<typeof TrainerMemberWorkoutPlanSchema>;
export type TrainerMemberProgressEntry = z.infer<typeof TrainerMemberProgressEntrySchema>;
