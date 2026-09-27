// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ScheduleEntity } from '@/backend_manager/manager_modules/schedule/manager-schedule.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerScheduleDomainData } from '@/backend_manager/manager_modules/schedule/schedule_types/manager-schedule.types';

export class ManagerScheduleMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ScheduleEntity): ManagerScheduleDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerScheduleDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerScheduleMapper as ScheduleMapper };
