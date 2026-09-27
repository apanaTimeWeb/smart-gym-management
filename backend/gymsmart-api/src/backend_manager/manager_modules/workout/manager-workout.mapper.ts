// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerWorkoutEntity } from '@/backend_manager/manager_modules/workout/manager-workout.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { WorkoutDomainData } from '@/backend_manager/manager_modules/workout/workout_types/manager-workout.types';

export class ManagerWorkoutMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerWorkoutEntity): WorkoutDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: WorkoutDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerWorkoutMapper as WorkoutMapper };
