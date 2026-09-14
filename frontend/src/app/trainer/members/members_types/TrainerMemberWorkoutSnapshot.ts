import { z } from 'zod';

export const TrainerMemberWorkoutExerciseSnapshotSchema = z.object({
  name: z.string(),
  sets: z.number(),
  reps: z.number(),
  restTime: z.string().optional(),
  weight: z.string().optional(),
});

export const TrainerMemberWorkoutSnapshotSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  level: z.string().optional(),
  duration: z.string().optional(),
  focus: z.string().optional(),
  days: z.number().optional(),
  workoutExercises: z.array(TrainerMemberWorkoutExerciseSnapshotSchema).optional(),
});

export type TrainerMemberWorkoutSnapshot = z.infer<typeof TrainerMemberWorkoutSnapshotSchema>;
export type TrainerMemberWorkoutExerciseSnapshot = z.infer<typeof TrainerMemberWorkoutExerciseSnapshotSchema>;
