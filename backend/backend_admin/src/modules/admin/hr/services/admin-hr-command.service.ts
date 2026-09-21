// RESPONSIBILITY: Owns write-side use cases for Admin hr; persistence remains behind the feature repository.
// FLOW: AdminHrCommandController -> AdminHrCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminHrRepository } from '@/modules/admin/hr/repositories/admin-hr-repository';
import { AdminHrMapper } from '@/modules/admin/hr/mappers/admin-hr.mapper';

@Injectable()
export class AdminHrCommandService {
  constructor(
    private readonly repository: AdminHrRepository,
    private readonly mapper: AdminHrMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the createStaff mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createStaff(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord(input);
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Executes the updateStaff mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateStaff(id: string, input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, input);
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the deleteStaff mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deleteStaff(id: string): Promise<null> {
    await this.repository.markAsDeleted(id);
    await this.audit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the bulkDeactivate mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async bulkDeactivate(ids: string[]): Promise<Record<string, unknown>> {
    const entities = await Promise.all(ids.map((id) => this.repository.updateById(id, { isActive: false, status: 'inactive' })));
    return { affected: entities.length };
  }

  /**
   * @description Executes the createPayroll mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createPayroll(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'PAYROLL', ...input });
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Executes the updatePayroll mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updatePayroll(id: string, input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, { recordType: 'PAYROLL', ...input });
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the updatePayrollStatus mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updatePayrollStatus(id: string, status: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, { recordType: 'PAYROLL', status });
    return this.response(entity, 'STATUS_UPDATED');
  }

  /**
   * @description Executes the createAdvance mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createAdvance(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'ADVANCE', ...input });
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Executes the payDue mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async payDue(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'DUE_PAYMENT', ...input });
    return this.response(entity, 'DUE_PAID');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminHrMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'HR' });
  }
}
