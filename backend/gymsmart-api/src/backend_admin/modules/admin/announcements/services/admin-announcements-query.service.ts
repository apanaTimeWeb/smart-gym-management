// RESPONSIBILITY: Owns read-side use cases for Admin announcements; no write persistence occurs here.
// FLOW: AdminAnnouncementsQueryController â†’ AdminAnnouncementsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminAnnouncementsRepository } from '@/backend_admin/modules/admin/announcements/repositories/admin-announcements-repository';
import { AdminAnnouncementsMapper } from '@/backend_admin/modules/admin/announcements/mappers/admin-announcements.mapper';
import { AdminAnnouncementsQueryDto } from '@/backend_admin/modules/admin/announcements/dtos/admin-announcements-query.dto';
import { AdminAnnouncementDto, AdminAnnouncementKPIDataDto } from '@/backend_admin/modules/admin/announcements/dtos/admin-announcements-response.dto';

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
  async fetchAnnouncements(query: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminAnnouncementDto[];
  }

  /** @description Executes fetchKPIs for the Admin announcements feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementKPIDataDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload : {}) as AdminAnnouncementKPIDataDto;
  }
}
