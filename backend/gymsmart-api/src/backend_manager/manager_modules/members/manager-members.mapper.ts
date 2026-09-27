// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { MembersEntity } from '@/backend_manager/manager_modules/members/manager-members.entity';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { MembersDomainData } from '@/backend_manager/manager_modules/members/members_types/manager-members.types';

export class ManagerMembersMapper {
  /** @description Maps an ORM entity to an ORM-free domain object. @param entity - TypeORM entity. @returns Domain object. */
  static toDomain(entity: MembersEntity): MembersDomainData {
    const payload: ManagerCoreJsonObject = { ...entity.payload, currency: entity.currency };
    payload.createdAt = entity.createdAt.toISOString();
    payload.updatedAt = entity.updatedAt.toISOString();
    payload.totalAmount = ManagerMembersMapper.fromMinor(entity.totalAmountMinor);
    payload.paidAmount = ManagerMembersMapper.fromMinor(entity.paidAmountMinor);
    payload.pendingAmount = ManagerMembersMapper.fromMinor(entity.pendingAmountMinor);
    payload.advanceAmount = ManagerMembersMapper.fromMinor(entity.advanceAmountMinor);
    payload.amountPaid = ManagerMembersMapper.fromMinor(entity.amountPaidMinor);
    return { id: entity.id, payload } as MembersDomainData;
  }
  /** @description Extracts the JSON persistence payload from a domain object. @param data - Domain object. @returns JSON payload. */
  static toEntity(data: MembersDomainData): ManagerCoreJsonObject { return data.payload; }
  /** Converts a persisted bigint minor-unit string into a safe API integer. */
  private static fromMinor(value: string | null): number { return value === null ? 0 : Number(value); }

}

export { ManagerMembersMapper as MembersMapper };
