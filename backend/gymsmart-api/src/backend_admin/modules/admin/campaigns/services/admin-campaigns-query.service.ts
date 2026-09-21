// RESPONSIBILITY: Owns read-side use cases for Admin campaigns; no write persistence occurs here.
// FLOW: AdminCampaignsQueryController â†’ AdminCampaignsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminCampaignsRepository } from '@/backend_admin/modules/admin/campaigns/repositories/admin-campaigns-repository';
import { AdminCampaignsMapper } from '@/backend_admin/modules/admin/campaigns/mappers/admin-campaigns.mapper';
import { AdminCampaignsQueryDto } from '@/backend_admin/modules/admin/campaigns/dtos/admin-campaigns-query.dto';
import { AdminCampaignsAudienceDto, AdminCampaignsTemplateDto, AdminCampaignsRecipientsDataDto } from '@/backend_admin/modules/admin/campaigns/dtos/admin-campaigns-response.dto';

@Injectable()
export class AdminCampaignsQueryService {
  constructor(
    private readonly repository: AdminCampaignsRepository,
    private readonly mapper: AdminCampaignsMapper,
  ) {}


  /** @description Executes fetchAudiences for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAudiences(query: AdminCampaignsQueryDto): Promise<AdminCampaignsAudienceDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminCampaignsAudienceDto[];
  }

  /** @description Executes fetchTemplates for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchTemplates(query: AdminCampaignsQueryDto): Promise<AdminCampaignsTemplateDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminCampaignsTemplateDto[];
  }

  /** @description Executes fetchRecipients for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchRecipients(query: AdminCampaignsQueryDto): Promise<AdminCampaignsRecipientsDataDto> {
    const snapshot = await this.repository.findFirstSnapshot();
    return { recipients: snapshot && Array.isArray(snapshot.payload.recipients) ? snapshot.payload.recipients : [] } as AdminCampaignsRecipientsDataDto;
  }
}
