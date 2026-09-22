// RESPONSIBILITY: Maps Manager plans ORM entities to ORM-free domain objects.
// FLOW: PlansEntity -> PlansMapper -> domain payload -> repository/service.
import { PlansEntity } from '@/modules/manager/plans/plans.entity';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import type { PlansDomainData } from '@/modules/manager/plans/plans.interfaces';
export class PlansMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: PlansEntity): PlansDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: PlansDomainData): CoreJsonObject { return data.payload; }
}
