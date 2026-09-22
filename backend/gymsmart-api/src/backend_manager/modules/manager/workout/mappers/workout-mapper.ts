// RESPONSIBILITY: Maps Manager workout ORM entities to ORM-free domain objects.
// FLOW: WorkoutEntity -> WorkoutMapper -> domain payload -> repository/service.
import { WorkoutEntity } from '@/backend_manager/modules/manager/workout/workout.entity';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { WorkoutDomainData } from '@/backend_manager/modules/manager/workout/workout.interfaces';
export class WorkoutMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: WorkoutEntity): WorkoutDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: WorkoutDomainData): CoreJsonObject { return data.payload; }
}
