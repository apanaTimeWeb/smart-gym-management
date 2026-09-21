// RESPONSIBILITY: Owns read-side use cases for Admin announcements; no write persistence occurs here.
// FLOW: AdminAnnouncementsQueryController → AdminAnnouncementsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminAnnouncementsRepository } from '@/modules/admin/announcements/repositories/admin-announcements-repository';
import { AdminAnnouncementsMapper } from '@/modules/admin/announcements/mappers/admin-announcements.mapper';
import { AdminAnnouncementsQueryDto } from '@/modules/admin/announcements/dtos/admin-announcements-query.dto';

@Injectable()
export class AdminAnnouncementsQueryService {
  constructor(
    private readonly repository: AdminAnnouncementsRepository,
    private readonly mapper: AdminAnnouncementsMapper,
  ) {}


  /** @description Executes fetchAnnouncements for the Admin announcements feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAnnouncements(query: AdminAnnouncementsQueryDto): Promise<{ items: Record<string, unknown>[]; meta: import('@/core/types/core-api-response.types').CorePaginationMeta }> {
    const result = await this.repository.findAll(query); return { items: result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))), meta: result.meta };
  }

  /** @description Executes fetchKPIs for the Admin announcements feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminAnnouncementsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload as Record<string, unknown>) : {};
  }
}
