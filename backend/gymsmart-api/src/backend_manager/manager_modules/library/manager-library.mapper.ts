// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerLibraryEntity } from '@/backend_manager/manager_modules/library/manager-library.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { LibraryDomainData } from '@/backend_manager/manager_modules/library/library_types/manager-library.types';

export class ManagerLibraryMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerLibraryEntity): LibraryDomainData { return { id: entity.id, payload: { ...entity.payload, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString() } }; }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: LibraryDomainData): ManagerCoreJsonObject { return data.payload; }
}

export { ManagerLibraryMapper as LibraryMapper };
