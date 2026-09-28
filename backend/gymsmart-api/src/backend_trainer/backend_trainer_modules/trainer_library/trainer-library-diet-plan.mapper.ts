// RESPONSIBILITY: Maps TrainerLibraryDietPlanEntity ORM state to the frontend diet-plan response without nullable optionals.
// FLOW: TrainerLibraryDietPlanEntity → enum translation → nullable-field normalization → LibraryDietPlanDomain.

import type { TrainerLibraryDietPlanEntity } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.entity';
import { TrainerLibraryEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enum.mapper';
import type { LibraryDietPlanDomain } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.domain';

/** Maps a persisted diet plan into the frontend-compatible response contract. */
/**
 * @description Executes LibraryDietPlanMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for LibraryDietPlanMapper.
 * @returns {LibraryDietPlanDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function LibraryDietPlanMapper(entity: TrainerLibraryDietPlanEntity): LibraryDietPlanDomain {
  return {
    id: entity.id, name: entity.name, goal: TrainerLibraryEnumMapper.toApiGoal(entity.goal), meals: entity.meals, isActive: entity.isActive,
    ...(entity.calories !== null ? { calories: Number(entity.calories) } : {}),
    ...(entity.protein !== null ? { protein: Number(entity.protein) } : {}),
    ...(entity.carbs !== null ? { carbs: Number(entity.carbs) } : {}),
    ...(entity.fats !== null ? { fats: Number(entity.fats) } : {}),
    ...(entity.description !== null ? { description: entity.description } : {}),
  };
}
