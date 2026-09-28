// RESPONSIBILITY: Defines the reusable workout-exercise response domain independently from persistence.
// FLOW: TrainerWorkoutExerciseEntity → mapper → frontend-compatible exercise response.

export interface WorkoutExerciseDomain {
  id: string; name: string; category?: string; muscleGroup?: string[]; equipment?: string; difficulty: string; instructions?: string; videoUrl?: string; imageUrl?: string;
  isActive: boolean; sets?: number; reps?: string; duration?: string; description?: string;
}
