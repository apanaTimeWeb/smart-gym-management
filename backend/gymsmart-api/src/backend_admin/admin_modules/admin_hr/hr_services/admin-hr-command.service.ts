// RESPONSIBILITY: Owns write-side use cases for Admin hr; persistence remains behind the feature repository.
// FLOW: AdminHrCommandController -> AdminHrCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';

import { AdminHrMutationDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-mutation.dto.js';
import { AdminHrResponsePresenter } from '@/backend_admin/admin_modules/admin_hr/hr_mappers/admin-hr.response.presenter.js';
import { AdminHrRepository } from '@/backend_admin/admin_modules/admin_hr/hr_repositories/admin-hr-repository.js';

@Injectable()
/**
 * @description Defines the AdminHrCommandService boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrCommandService {
  constructor(
    private readonly repository: AdminHrRepository,
    private readonly presenter: AdminHrResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the createStaff mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createStaff(input: AdminHrMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord(input);
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the updateStaff mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateStaff(id: string, input: AdminHrMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, input);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the deleteStaff mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deleteStaff(id: string): Promise<null> {
    await this.repository.markAsDeleted(id);
    await this.createAudit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the bulkDeactivate mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateBulkDeactivate(ids: string[]): Promise<Record<string, unknown>> {
    const entities = await Promise.all(ids.map((id) => this.repository.updateById(id, { isActive: false, status: 'inactive' } as any)));
    return { affected: entities.length };
  }

  /**
   * @description Executes the createPayroll mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createPayroll(input: AdminHrMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'PAYROLL', ...input } as any);
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the updatePayroll mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updatePayroll(id: string, input: AdminHrMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, { recordType: 'PAYROLL', ...input } as any);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the updatePayrollStatus mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updatePayrollStatus(id: string, status: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, { recordType: 'PAYROLL', status: status as any } as any);
    return this.createResponse(entity, 'STATUS_UPDATED');
  }

  /**
   * @description Executes the createAdvance mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createAdvance(input: AdminHrMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'ADVANCE', ...input } as any);
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the payDue mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updatePayDue(input: AdminHrMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'DUE_PAYMENT', ...input } as any);
    return this.createResponse(entity, 'DUE_PAID');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminHrRepository['findByIdOrThrow']>>, action: string): Promise<Record<string, unknown>> {
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'hr' });
  }
}
