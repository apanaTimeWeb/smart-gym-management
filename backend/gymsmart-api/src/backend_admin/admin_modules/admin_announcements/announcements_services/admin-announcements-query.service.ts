// RESPONSIBILITY: Owns read-side use cases for Admin announcements; no write persistence occurs here.
// FLOW: AdminAnnouncementsQueryController â†’ AdminAnnouncementsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminAnnouncementsQueryDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-query.dto.js';
import { AdminAnnouncementDto, AdminAnnouncementKPIDataDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-response.dto.js';
import { AdminAnnouncementsResponsePresenter } from '@/backend_admin/admin_modules/admin_announcements/announcements_mappers/admin-announcements.response.presenter.js';
import { AdminAnnouncementsRepository } from '@/backend_admin/admin_modules/admin_announcements/announcements_repositories/admin-announcements-repository.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@Injectable()
/**
 * @description Defines the AdminAnnouncementsQueryService boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsQueryService {
  constructor(
    private readonly repository: AdminAnnouncementsRepository,
    private readonly presenter: AdminAnnouncementsResponsePresenter,
  ) {}

  /** @description Executes fetchAnnouncements for the Admin announcements feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllAnnouncements(query: AdminAnnouncementsQueryDto): Promise<AdminCorePaginatedResult<AdminAnnouncementDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchKPIs for the Admin announcements feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAnnouncementKpis(query: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementKPIDataDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toKpiResponse(snapshot);
  }
}
