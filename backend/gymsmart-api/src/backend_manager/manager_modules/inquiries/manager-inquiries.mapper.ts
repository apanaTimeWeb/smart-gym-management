// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerInquiriesEntity } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerInquiriesDomainData } from '@/backend_manager/manager_modules/inquiries/inquiries_types/manager-inquiries.types';

export class ManagerInquiriesMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: ManagerInquiriesEntity): ManagerInquiriesDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.totalAmount = ManagerInquiriesMapper.fromMinor(entity.totalAmountMinor);
    payload.paidAmount = ManagerInquiriesMapper.fromMinor(entity.paidAmountMinor);
    payload.pendingAmount = ManagerInquiriesMapper.fromMinor(entity.pendingAmountMinor);
    return { id: entity.id, payload } as ManagerInquiriesDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: ManagerInquiriesDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerInquiriesMapper as InquiriesMapper };
