// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { PtEntity } from '@/backend_manager/manager_modules/pt/manager-pt.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PtDomainData } from '@/backend_manager/manager_modules/pt/pt_types/manager-pt.types';

export class ManagerPtMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: PtEntity): PtDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.price = ManagerPtMapper.fromMinor(entity.priceMinor);
    payload.amountPaid = ManagerPtMapper.fromMinor(entity.amountPaidMinor);
    payload.totalAmount = ManagerPtMapper.fromMinor(entity.totalAmountMinor);
    return { id: entity.id, payload } as PtDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: PtDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerPtMapper as PtMapper };
