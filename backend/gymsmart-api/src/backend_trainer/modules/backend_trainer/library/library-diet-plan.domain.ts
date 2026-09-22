// RESPONSIBILITY: Defines the library business object independent from TypeORM persistence.
// FLOW: library repository → mapper → domain object → service.

export interface LibraryDietPlanDomain {
  id: string;
  name: string;
  goal: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  description: string | null;
  meals: unknown[];
  isActive: boolean;
}
