// RESPONSIBILITY: Owns write-side use cases for Admin permissions; persistence remains behind the feature repository.
// FLOW: AdminPermissionsCommandController -> AdminPermissionsCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'

import { AdminPermissionsMutationDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-mutation.dto'
import { AdminPermissionsDataDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-response.dto'
import { AdminPermissionsResponsePresenter } from '@/backend_admin/admin_modules/admin_permissions/permissions_mappers/admin-permissions.response.presenter'
import { AdminPermissionsRepository } from '@/backend_admin/admin_modules/admin_permissions/permissions_repositories/admin-permissions-repository'

@Injectable()
/**
 * @description Defines the AdminPermissionsCommandService boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsCommandService {
  constructor(
    private readonly repository: AdminPermissionsRepository,
    private readonly presenter: AdminPermissionsResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the updateRolePermissions mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminPermissionsDataDto> frontend-facing result.
   */
  async updateRolePermissions(role: string, permissions: Record<string, boolean>): Promise<AdminPermissionsDataDto> {
    const entity = await this.repository.updateRolePermissions(role, permissions);
    return this.createResponse(entity, 'PERMISSIONS_UPDATED');
  }

  /**
   * @description Executes the updateGymOverride mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminPermissionsDataDto> frontend-facing result.
   */
  async updateGymOverride(gymId: string, role: string, overrides: Record<string, boolean>): Promise<AdminPermissionsDataDto> {
    const entity = await this.repository.updateGymOverride(gymId, role, overrides);
    return this.createResponse(entity, 'PERMISSIONS_UPDATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminPermissionsRepository['findByIdOrThrow']>>, action: string): Promise<AdminPermissionsDataDto> {
    const response = this.presenter.toResponse(entity) as unknown as AdminPermissionsDataDto;
    await this.createAudit(entity.id, action, response as any);
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'permissions' });
  }
}
