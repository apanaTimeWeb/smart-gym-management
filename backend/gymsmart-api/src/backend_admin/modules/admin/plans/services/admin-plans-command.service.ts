// RESPONSIBILITY: Owns write-side use cases for Admin plans; persistence remains behind the feature repository.
// FLOW: AdminPlansCommandController -> AdminPlansCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { AdminPlansRepository } from '@/backend_admin/modules/admin/plans/repositories/admin-plans-repository';
import { AdminPlansMapper } from '@/backend_admin/modules/admin/plans/mappers/admin-plans.mapper';

@Injectable()
export class AdminPlansCommandService {
  constructor(
    private readonly repository: AdminPlansRepository,
    private readonly mapper: AdminPlansMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the createPlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createRecord(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord(input);
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the updatePlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateById(id: string, input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, input);
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the deletePlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async markAsDeleted(id: string): Promise<null> {
    await this.repository.markAsDeleted(id);
    await this.audit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminPlansMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'Plans' });
  }
}
