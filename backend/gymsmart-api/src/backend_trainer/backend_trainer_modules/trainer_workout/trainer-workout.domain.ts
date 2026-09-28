// RESPONSIBILITY: Defines the Trainer workout response domain independently from persistence nullability.
// FLOW: TrainerWorkoutEntity → mapper → frontend-compatible workout response.

export interface WorkoutDomain {
  id: string; name: string; level: string; days: number; exercises: number; focus: string; duration: string; tags: string[];
  goal?: string; startDate?: string; endDate?: string; instructions?: string; assignedMemberId?: string;
  workoutExercises: Record<string, unknown>[]; isActive: boolean;
}
