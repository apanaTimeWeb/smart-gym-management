// RESPONSIBILITY: Owns write-side use cases for Admin settings; persistence remains behind the feature repository.
// FLOW: AdminSettingsCommandController -> AdminSettingsCommandService -> named repository mutation -> audit trail.

import { Injectable, NotFoundException } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminSettingsRepository } from '@/modules/admin/settings/repositories/admin-settings-repository';
import { AdminSettingsMapper } from '@/modules/admin/settings/mappers/admin-settings.mapper';

@Injectable()
export class AdminSettingsCommandService {
  constructor(
    private readonly repository: AdminSettingsRepository,
    private readonly mapper: AdminSettingsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the updateSettings mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateSettings(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const id = typeof input.id === 'string' ? input.id : (await this.repository.findFirstSnapshot())?.id;
    if (!id) throw new NotFoundException('Settings record not found.');
    const entity = await this.repository.updateById(id, input);
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the enable2fa mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async enableTwoFactor(): Promise<null> {
    const snapshot = await this.repository.findFirstSnapshot();
    if (!snapshot) throw new NotFoundException('Settings record not found.');
    await this.repository.updateById(snapshot.id, { twoFactorEnabled: true });
    return null;
  }

  /**
   * @description Executes the disable2fa mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async disableTwoFactor(): Promise<null> {
    const snapshot = await this.repository.findFirstSnapshot();
    if (!snapshot) throw new NotFoundException('Settings record not found.');
    await this.repository.updateById(snapshot.id, { twoFactorEnabled: false });
    return null;
  }

  /**
   * @description Executes the verify2fa mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async verifyTwoFactor(): Promise<null> {
    const snapshot = await this.repository.findFirstSnapshot();
    if (!snapshot) throw new NotFoundException('Settings record not found.');
    await this.repository.updateById(snapshot.id, { twoFactorEnabled: false });
    return null;
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminSettingsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
    const response = this.mapper.toResponse(this.mapper.toDomain(entity));
    await this.audit(entity.id, action, response);
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'admin' });
  }
}
