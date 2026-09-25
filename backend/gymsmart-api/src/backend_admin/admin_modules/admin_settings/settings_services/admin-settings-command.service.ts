// RESPONSIBILITY: Owns write-side use cases for Admin settings; persistence remains behind the feature repository.
// FLOW: AdminSettingsCommandController -> AdminSettingsCommandService -> named repository mutation -> audit trail.
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import argon2 from 'argon2';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'
import { AdminCoreMasterAdminRepository } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin-repository'
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'

import { AdminSettingsMutationDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-mutation.dto'
import { AdminSettingsResponsePresenter } from '@/backend_admin/admin_modules/admin_settings/settings_mappers/admin-settings.response.presenter'
import { AdminSettingsRepository } from '@/backend_admin/admin_modules/admin_settings/settings_repositories/admin-settings-repository'

@Injectable()
/**
 * @description Defines the AdminSettingsCommandService boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsCommandService {
  constructor(
    private readonly repository: AdminSettingsRepository,
    private readonly presenter: AdminSettingsResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly masterAdminRepository: AdminCoreMasterAdminRepository,
    private readonly requestContext: AdminCoreRequestContextService,
  ) {}

  /**
   * @description Executes the updateSettings mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateSettings(input: AdminSettingsMutationDto): Promise<Record<string, unknown>> {
    const id = typeof input.id === 'string' ? input.id : (await this.repository.findLatestSnapshot())?.id;
    if (!id) throw new NotFoundException({ message: 'Settings record not found.', errorCode: 'ADMIN.SETTINGS.NOT_FOUND' });
    const entity = await this.repository.updateById(id, input);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the enable2fa mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async updateTwoFactorEnabled(input: AdminSettingsMutationDto): Promise<null> {
    const snapshot = await this.repository.findLatestSnapshot();
    if (!snapshot) throw new NotFoundException({ message: 'Settings record not found.', errorCode: 'ADMIN.SETTINGS.NOT_FOUND' });
    await this.verifyCurrentPassword(input.currentPassword);
    const updated = await this.repository.updateById(snapshot.id, { twoFactorEnabled: true });
    await this.createAudit(updated.id, 'TWO_FACTOR_ENABLED', { twoFactorEnabled: true });
    return null;
  }

  /**
   * @description Executes the disable2fa mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async updateTwoFactorDisabled(input: AdminSettingsMutationDto): Promise<null> {
    const snapshot = await this.repository.findLatestSnapshot();
    if (!snapshot) throw new NotFoundException({ message: 'Settings record not found.', errorCode: 'ADMIN.SETTINGS.NOT_FOUND' });
    await this.verifyCurrentPassword(input.currentPassword);
    const updated = await this.repository.updateById(snapshot.id, { twoFactorEnabled: false });
    await this.createAudit(updated.id, 'TWO_FACTOR_DISABLED', { twoFactorEnabled: false });
    return null;
  }

  /**
   * @description Executes the verify2fa mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async updateTwoFactorVerified(input: AdminSettingsMutationDto): Promise<null> {
    const snapshot = await this.repository.findLatestSnapshot();
    if (!snapshot) throw new NotFoundException({ message: 'Settings record not found.', errorCode: 'ADMIN.SETTINGS.NOT_FOUND' });
    await this.verifyCurrentPassword(input.currentPassword);
    if (!input.verificationCode?.trim()) throw new UnauthorizedException({ message: 'A current 2FA verification code is required.', errorCode: 'ADMIN.SETTINGS.TWO_FACTOR_VERIFICATION_REQUIRED' });
    if (!/^\d{6}$/.test(input.verificationCode.trim())) throw new UnauthorizedException({ message: 'The 2FA verification code is invalid.', errorCode: 'ADMIN.SETTINGS.TWO_FACTOR_VERIFICATION_INVALID' });
    const updated = await this.repository.updateById(snapshot.id, { twoFactorEnabled: true });
    await this.createAudit(updated.id, 'TWO_FACTOR_VERIFIED', { twoFactorEnabled: true });
    return null;
  }

  /** @description Verifies the authenticated Admin password before disabling or completing 2FA state changes. @param currentPassword Current password supplied during explicit re-authentication. @returns Promise completion. */
  private async verifyCurrentPassword(currentPassword: string | undefined): Promise<void> {
    if (!currentPassword?.trim()) throw new UnauthorizedException({ message: 'Re-authentication is required for 2FA state changes.', errorCode: 'ADMIN.SETTINGS.REAUTH_REQUIRED' });
    const actor = await this.masterAdminRepository.findActiveById(this.requestActorId());
    if (!actor || !(await argon2.verify(actor.passwordHash, currentPassword))) throw new UnauthorizedException({ message: 'Current password is invalid.', errorCode: 'ADMIN.SETTINGS.REAUTH_INVALID' });
  }

  /** @description Reads the authenticated actor id from request context without exposing credentials. @returns Actor UUID. */
  private requestActorId(): string {
    return this.requestContext.get().userId;
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminSettingsRepository['findByIdOrThrow']>>, action: string): Promise<Record<string, unknown>> {
    const response = this.presenter.toResponse(entity);
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'settings' });
  }
}
