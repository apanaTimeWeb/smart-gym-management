// RESPONSIBILITY: Defines the library diet-plan response domain with frontend-compatible optional fields.
// FLOW: TrainerLibraryDietPlanEntity → mapper → Trainer library response.

export interface LibraryDietPlanDomain {
  id: string;
  name: string;
  goal: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  description?: string;
  meals: unknown[];
  isActive: boolean;
}
