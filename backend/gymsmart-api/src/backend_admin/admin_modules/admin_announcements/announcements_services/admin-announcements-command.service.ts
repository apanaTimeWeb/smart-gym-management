// RESPONSIBILITY: Owns write-side use cases for Admin announcements; persistence remains behind the feature repository.
// FLOW: AdminAnnouncementsCommandController -> AdminAnnouncementsCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'

import { AdminAnnouncementsMutationDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-mutation.dto'
import { AdminAnnouncementDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-response.dto'
import { AdminAnnouncementsResponsePresenter } from '@/backend_admin/admin_modules/admin_announcements/announcements_mappers/admin-announcements.response.presenter'
import { AdminAnnouncementsRepository } from '@/backend_admin/admin_modules/admin_announcements/announcements_repositories/admin-announcements-repository'

@Injectable()
/**
 * @description Defines the AdminAnnouncementsCommandService boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsCommandService {
  constructor(
    private readonly repository: AdminAnnouncementsRepository,
    private readonly presenter: AdminAnnouncementsResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the createAnnouncement mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminAnnouncementDto> frontend-facing result.
   */
  async createRecord(input: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    const entity = await this.repository.createRecord(input);
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the updateAnnouncement mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminAnnouncementDto> frontend-facing result.
   */
  async updateById(id: string, input: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementDto> {
    const entity = await this.repository.updateById(id, input);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the deleteAnnouncement mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deleteAnnouncement(id: string): Promise<null> {
    await this.repository.deleteAnnouncement(id);
    await this.createAudit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the togglePin mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminAnnouncementDto> frontend-facing result.
   */
  async updatePinById(id: string): Promise<AdminAnnouncementDto> {
    const entity = await this.repository.updatePinById(id);
    return this.createResponse(entity, 'PIN_TOGGLED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminAnnouncementsRepository['findByIdOrThrow']>>, action: string): Promise<AdminAnnouncementDto> {
    const response = this.presenter.toResponse(entity as any) as any;
    await this.createAudit(entity.id, action, response);
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'announcements' });
  }
}
