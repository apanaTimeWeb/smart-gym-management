// RESPONSIBILITY: Owns read-side use cases for Admin campaigns; no write persistence occurs here.
// FLOW: AdminCampaignsQueryController â†’ AdminCampaignsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCampaignsQueryDto } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_dtos/admin-campaigns-query.dto.js';
import { AdminCampaignsAudienceDto, AdminCampaignsTemplateDto, AdminCampaignsRecipientsDataDto } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_dtos/admin-campaigns-response.dto.js';
import { AdminCampaignsResponsePresenter } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_mappers/admin-campaigns.response.presenter.js';
import { AdminCampaignsRepository } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_repositories/admin-campaigns-repository.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@Injectable()
/**
 * @description Defines the AdminCampaignsQueryService boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsQueryService {
  constructor(
    private readonly repository: AdminCampaignsRepository,
    private readonly presenter: AdminCampaignsResponsePresenter,
  ) {}

  /** @description Executes fetchAudiences for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllAudiences(query: AdminCampaignsQueryDto): Promise<AdminCorePaginatedResult<AdminCampaignsAudienceDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchTemplates for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllTemplates(query: AdminCampaignsQueryDto): Promise<AdminCorePaginatedResult<AdminCampaignsTemplateDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchRecipients for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllRecipients(query: AdminCampaignsQueryDto): Promise<AdminCampaignsRecipientsDataDto> {
    const snapshot = await this.repository.findLatestSnapshot(query);
    if (!snapshot) throw new NotFoundException('CAMPAIGNS.READ_MODEL.NOT_FOUND');
    return this.presenter.toRecipientsResponse(snapshot as any);
  }
}
