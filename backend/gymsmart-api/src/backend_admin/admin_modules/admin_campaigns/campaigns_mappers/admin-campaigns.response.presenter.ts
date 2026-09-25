// RESPONSIBILITY: Presents ORM-independent AdminCampaigns domain data as the frontend response contract.
// FLOW: Domain object -> AdminCampaignsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminCampaignsDomainModel } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_domain/admin-campaigns.domain.js';

import { AdminCampaignsRecipientsDataDto } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_dtos/admin-campaigns-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminCampaigns feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminCampaignsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminCampaignsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps campaign recipients from the read model into the typed frontend contract. @param domain Read-model domain object. @returns Recipient response. */
  toRecipientsResponse(domain: AdminCampaignsDomainModel): AdminCampaignsRecipientsDataDto {
    const recipients = Array.isArray(domain.data.recipients) ? domain.data.recipients.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object') : [];
    return { recipients: recipients.map((item) => Object.assign({ id: '', name: '', phone: '', branchName: '' }, item)) };
  }
}
