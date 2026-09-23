// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { GrievanceEntity } from '@/backend_manager/modules/backend_manager/grievance/grievance.entity';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { GrievanceDomainData } from '@/backend_manager/modules/backend_manager/grievance/grievance.interfaces';

export class GrievanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: GrievanceEntity): GrievanceDomainData { return {id: entity.id, payload: entity.payload}; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: GrievanceDomainData): CoreJsonObject { return data.payload; }
}
