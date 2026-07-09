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
