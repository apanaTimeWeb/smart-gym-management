// RESPONSIBILITY: Owns write-side use cases for Admin plans; persistence remains behind the feature repository.
// FLOW: AdminPlansCommandController -> AdminPlansCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';

import { AdminPlansMutationDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-mutation.dto.js';
import { AdminPlansResponsePresenter } from '@/backend_admin/admin_modules/admin_plans/plans_mappers/admin-plans.response.presenter.js';
import { AdminPlansRepository } from '@/backend_admin/admin_modules/admin_plans/plans_repositories/admin-plans-repository.js';

@Injectable()
/**
 * @description Defines the AdminPlansCommandService boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansCommandService {
  constructor(
    private readonly repository: AdminPlansRepository,
    private readonly presenter: AdminPlansResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the createPlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createRecord(input: AdminPlansMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord(input);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the updatePlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateById(id: string, input: AdminPlansMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, input);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the deletePlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deletePlan(id: string): Promise<null> {
    await this.repository.deletePlan(id);
    await this.createAudit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminPlansRepository['findByIdOrThrow']>>, action: string): Promise<Record<string, unknown>> {
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'plans' });
  }
}
