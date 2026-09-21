// RESPONSIBILITY: Owns write-side use cases for Admin announcements; persistence remains behind the feature repository.
// FLOW: AdminAnnouncementsCommandController -> AdminAnnouncementsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { AdminAnnouncementsRepository } from '@/backend_admin/modules/admin/announcements/repositories/admin-announcements-repository';
import { AdminAnnouncementsMapper } from '@/backend_admin/modules/admin/announcements/mappers/admin-announcements.mapper';
import { AdminAnnouncementDto } from '@/backend_admin/modules/admin/announcements/dtos/admin-announcements-response.dto';
import { AdminAnnouncementsMutationDto } from '@/backend_admin/modules/admin/announcements/dtos/admin-announcements-mutation.dto';

@Injectable()
export class AdminAnnouncementsCommandService {
  constructor(
    private readonly repository: AdminAnnouncementsRepository,
    private readonly mapper: AdminAnnouncementsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the createAnnouncement mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminAnnouncementDto> frontend-facing result.
   */
  async createRecord(input: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    const entity = await this.repository.createRecord(input);
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Executes the updateAnnouncement mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminAnnouncementDto> frontend-facing result.
   */
  async updateById(id: string, input: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    const entity = await this.repository.updateById(id, input);
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the deleteAnnouncement mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async markAsDeleted(id: string): Promise<null> {
    await this.repository.markAsDeleted(id);
    await this.audit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the togglePin mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminAnnouncementDto> frontend-facing result.
   */
  async togglePinById(id: string): Promise<AdminAnnouncementDto> {
    const entity = await this.repository.togglePinById(id);
    return this.response(entity, 'PIN_TOGGLED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminAnnouncementsMapper['toDomain']>[0], action: string): Promise<AdminAnnouncementDto> {
    const response = this.mapper.toResponse(this.mapper.toDomain(entity)) as AdminAnnouncementDto;
    await this.audit(entity.id, action, response as any);
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async audit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'Settings' });
  }
}
