// RESPONSIBILITY: Defines the workout business object independent from TypeORM persistence.
// FLOW: workout repository → mapper → domain object → service.

export interface WorkoutExerciseDomain {
  id: string;
  name: string;
  category: string | null;
  muscleGroup: string[] | null;
  equipment: string | null;
  difficulty: string;
  instructions: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sets: number | null;
  reps: string | null;
  duration: string | null;
  description: string | null;
}
