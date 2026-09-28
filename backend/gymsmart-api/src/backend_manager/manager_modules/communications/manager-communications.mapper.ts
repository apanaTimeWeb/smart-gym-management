// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { CommunicationsEntity } from '@/backend_manager/manager_modules/communications/manager-communications.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerCommunicationsDomainData } from '@/backend_manager/manager_modules/communications/communications_types/manager-communications.types';

export class ManagerCommunicationsMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: CommunicationsEntity): ManagerCommunicationsDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerCommunicationsDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerCommunicationsMapper as CommunicationsMapper };
