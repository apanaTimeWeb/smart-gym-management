// RESPONSIBILITY: Owns write-side use cases for Admin permissions; persistence remains behind the feature repository.
// FLOW: AdminPermissionsCommandController -> AdminPermissionsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminPermissionsRepository } from '@/modules/admin/permissions/repositories/admin-permissions-repository';
import { AdminPermissionsMapper } from '@/modules/admin/permissions/mappers/admin-permissions.mapper';

@Injectable()
export class AdminPermissionsCommandService {
  constructor(
    private readonly repository: AdminPermissionsRepository,
    private readonly mapper: AdminPermissionsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the updateRolePermissions mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateRolePermissions(role: string, permissions: Record<string, boolean>): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateRolePermissions(role, permissions);
    return this.response(entity, 'PERMISSIONS_UPDATED');
  }

  /**
   * @description Executes the updateGymOverride mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateGymOverride(gymId: string, role: string, overrides: Record<string, boolean>): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateGymOverride(gymId, role, overrides);
    return this.response(entity, 'PERMISSIONS_UPDATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminPermissionsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'Auth' });
  }
}
