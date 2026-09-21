// RESPONSIBILITY: Owns read-side use cases for Admin campaigns; no write persistence occurs here.
// FLOW: AdminCampaignsQueryController → AdminCampaignsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminCampaignsRepository } from '@/modules/admin/campaigns/repositories/admin-campaigns-repository';
import { AdminCampaignsMapper } from '@/modules/admin/campaigns/mappers/admin-campaigns.mapper';
import { AdminCampaignsQueryDto } from '@/modules/admin/campaigns/dtos/admin-campaigns-query.dto';

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
  async fetchAudiences(query: AdminCampaignsQueryDto): Promise<Record<string, unknown>[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }

  /** @description Executes fetchTemplates for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchTemplates(query: AdminCampaignsQueryDto): Promise<Record<string, unknown>[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }

  /** @description Executes fetchRecipients for the Admin campaigns feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchRecipients(query: AdminCampaignsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot();
    return { recipients: snapshot && Array.isArray(snapshot.payload.recipients) ? snapshot.payload.recipients : [] };
  }
}
