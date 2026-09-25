// RESPONSIBILITY: Translates the TypeORM Admin members entity into an ORM-independent domain model and frontend response.
// FLOW: AdminMembersEntity â†’ AdminMembersMapper â†’ domain/response object.
import { AdminMembersDomainModel } from '@/backend_admin/admin_modules/admin_members/members_domain/admin-members.domain'

import { AdminMemberDto, AdminMembersSummaryDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-response.dto'

import { AdminMembersEntity } from '@/backend_admin/admin_modules/admin_members/members_entities/admin-members-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminMembers.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
