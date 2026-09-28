// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerGrievanceEntity } from '@/backend_manager/manager_modules/grievance/manager-grievance.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerGrievanceDomainData } from '@/backend_manager/manager_modules/grievance/grievance_types/manager-grievance.types';

export class ManagerGrievanceMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerGrievanceEntity): ManagerGrievanceDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerGrievanceDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerGrievanceMapper as GrievanceMapper };
