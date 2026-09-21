// RESPONSIBILITY: Translates the TypeORM Admin campaigns entity into an ORM-independent domain model and frontend response.
// FLOW: AdminCampaignsEntity â†’ AdminCampaignsMapper â†’ domain/response object.

import { AdminCampaignsDomainModel } from '@/backend_admin/modules/admin/campaigns/domain/admin-campaigns.domain';
import { AdminCampaignsEntity } from '@/backend_admin/modules/admin/campaigns/entities/admin-campaigns-entity';

export class AdminCampaignsMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminCampaignsEntity): AdminCampaignsDomainModel {
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
  toResponse(domain: AdminCampaignsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
