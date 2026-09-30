// RESPONSIBILITY: Proves nullable diet-plan persistence fields are omitted to match frontend optional properties.
// FLOW: Jest → LibraryDietPlanMapper → null nutrition fields → frontend-compatible response.

import type { TrainerLibraryDietPlanEntity } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.entity';
import { LibraryDietPlanMapper } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.mapper';
import { DietGoal } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enums';

describe('LibraryDietPlanMapper', () => {
  it('omits nullable nutrition and description fields when they are absent', () => {
    const entity = { id: 'diet-1', name: 'Basic Plan', goal: DietGoal.MAINTENANCE, calories: null, protein: null, carbs: null, fats: null, description: null, meals: [], isActive: true } as unknown as TrainerLibraryDietPlanEntity;
    expect(LibraryDietPlanMapper(entity)).toEqual({ id: 'diet-1', name: 'Basic Plan', goal: 'Maintenance', meals: [], isActive: true });
  });
});
