// RESPONSIBILITY: Defines the workout business object independent from TypeORM persistence.
// FLOW: workout repository → mapper → domain object → service.

export interface WorkoutWorkoutDomain {
  id: string;
  name: string;
  level: string;
  days: number;
  exercises: number;
  focus: string;
  duration: string;
  tags: string[];
  goal: string | null;
  startDate: string | null;
  endDate: string | null;
  instructions: string | null;
  assignedMemberId: string | null;
  workoutExercises: Record<string, unknown>[];
  isActive: boolean;
}
