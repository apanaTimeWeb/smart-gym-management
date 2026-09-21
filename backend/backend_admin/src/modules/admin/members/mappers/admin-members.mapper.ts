// RESPONSIBILITY: Translates the TypeORM Admin members entity into an ORM-independent domain model and frontend response.
// FLOW: AdminMembersEntity → AdminMembersMapper → domain/response object.

import { AdminMembersDomainModel } from '@/modules/admin/members/domain/admin-members.domain';
import { AdminMembersEntity } from '@/modules/admin/members/entities/admin-members-entity';

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
  toResponse(domain: AdminMembersDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
