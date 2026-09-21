// RESPONSIBILITY: Translates the TypeORM Admin members entity into an ORM-independent domain model and frontend response.
// FLOW: AdminMembersEntity → AdminMembersMapper → domain/response object.

import { AdminMembersDomainModel } from '@/modules/admin/members/domain/admin-members.domain';
import { AdminMembersEntity } from '@/modules/admin/members/entities/admin-members-entity';
import { AdminMemberDto, AdminMembersSummaryDto } from '@/modules/admin/members/dtos/admin-members-response.dto';

export class AdminMembersMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminMembersEntity): AdminMembersDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: { ...entity.payload },
    };
  }

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminMembersDomainModel): AdminMemberDto {
    return {
      id: domain.id,
      name: String(domain.data.name ?? ''),
      email: String(domain.data.email ?? ''),
      phone: String(domain.data.phone ?? ''),
      branchId: String(domain.data.branchId ?? ''),
      branchName: String(domain.data.branchName ?? ''),
      planName: String(domain.data.planName ?? ''),
      status: String(domain.data.status ?? ''),
      joinDate: String(domain.data.joinDate ?? ''),
      expiryDate: String(domain.data.expiryDate ?? ''),
      pendingAmount: Number(domain.data.pendingAmount ?? 0),
      gender: String(domain.data.gender ?? 'Other'),
      referralSource: domain.data.referralSource ? String(domain.data.referralSource) : undefined,
      photo: domain.data.photo ? String(domain.data.photo) : undefined,
      lastCheckIn: domain.data.lastCheckIn ? String(domain.data.lastCheckIn) : undefined,
      totalVisits: domain.data.totalVisits ? Number(domain.data.totalVisits) : undefined,
      dateOfBirth: domain.data.dateOfBirth ? String(domain.data.dateOfBirth) : undefined,
      address: domain.data.address ? String(domain.data.address) : undefined,
    } as AdminMemberDto;
  }

  /** @description Converts a domain model to a summary frontend response object. @param domain Domain model. @returns Response-safe object. */
  toSummaryResponse(domain: AdminMembersDomainModel): AdminMembersSummaryDto {
    return {
      totalMembers: Number(domain.data.totalMembers ?? 0),
      activeMembers: Number(domain.data.activeMembers ?? 0),
      expiredMembers: Number(domain.data.expiredMembers ?? 0),
      pendingMembers: Number(domain.data.pendingMembers ?? 0),
      expiringThisWeek: Number(domain.data.expiringThisWeek ?? 0),
      expiringThisMonth: Number(domain.data.expiringThisMonth ?? 0),
      totalOutstanding: Number(domain.data.totalOutstanding ?? 0),
      newThisMonth: Number(domain.data.newThisMonth ?? 0),
    };
  }
}
