// RESPONSIBILITY: Maps LibraryDietPlanEntity ORM state to LibraryDietPlanDomain without leaking TypeORM entities into business logic.
// FLOW: LibraryDietPlanEntity → LibraryDietPlanMapper() → domain object.

import type { LibraryDietPlanEntity } from '@/backend_trainer/modules/backend_trainer/library/library-diet-plan.entity';
import type { LibraryDietPlanDomain } from '@/backend_trainer/modules/backend_trainer/library/library-diet-plan.domain';
export function LibraryDietPlanMapper(entity: LibraryDietPlanEntity): LibraryDietPlanDomain { return {id:entity.id,name:entity.name,goal:entity.goal,calories:entity.calories,protein:entity.protein,carbs:entity.carbs,fats:entity.fats,description:entity.description,meals:entity.meals,isActive:entity.isActive}; }
