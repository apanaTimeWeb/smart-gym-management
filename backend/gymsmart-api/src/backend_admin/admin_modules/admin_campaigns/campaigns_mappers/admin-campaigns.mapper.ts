// RESPONSIBILITY: Translates the TypeORM Admin campaigns entity into an ORM-independent domain model and frontend response.
// FLOW: AdminCampaignsEntity â†’ AdminCampaignsMapper â†’ domain/response object.
import { AdminCampaignsDomainModel } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_domain/admin-campaigns.domain.js';

import { AdminCampaignsEntity } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_entities/admin-campaigns-entity.js';

import { AdminCampaignsRecipientsDataDto } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_dtos/admin-campaigns-response.dto.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminCampaigns.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
