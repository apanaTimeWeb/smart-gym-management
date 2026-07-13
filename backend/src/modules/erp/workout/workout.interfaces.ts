export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  memberId: string;
  date: string;
  durationMinutes: number;
  exercises: WorkoutExercise[];
  isCompleted: boolean;
  notes?: string;
}

export interface WorkoutResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface WorkoutListResponse {
  success: boolean;
  message?: string;
  data: {
    workouts: any[];
    total: number;
    page: number;
    limit: number;
  };
}
