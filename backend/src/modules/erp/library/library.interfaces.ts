export interface IExercise {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDietPlan {
  id: number;
  name: string;
  goal: string;
  calories: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ExerciseResponse {
  success: boolean;
  message: string;
  data: IExercise;
}

export interface ExerciseListResponse {
  success: boolean;
  message: string;
  data: {
    exercises: IExercise[];
    total: number;
  };
}

export interface DietPlanResponse {
  success: boolean;
  message: string;
  data: IDietPlan;
}

export interface DietPlanListResponse {
  success: boolean;
  message: string;
  data: {
    dietPlans: IDietPlan[];
    total: number;
  };
}
