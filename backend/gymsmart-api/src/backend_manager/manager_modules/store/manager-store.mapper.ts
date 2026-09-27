// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerStoreEntity } from '@/backend_manager/manager_modules/store/manager-store.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { StoreDomainData } from '@/backend_manager/manager_modules/store/store_types/manager-store.types';

export class ManagerStoreMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerStoreEntity): StoreDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.price = ManagerStoreMapper.fromMinor(entity.priceMinor);
    payload.costPrice = ManagerStoreMapper.fromMinor(entity.costPriceMinor);
    payload.total = ManagerStoreMapper.fromMinor(entity.totalMinor);
    return { id: entity.id, payload } as StoreDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: StoreDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerStoreMapper as StoreMapper };
