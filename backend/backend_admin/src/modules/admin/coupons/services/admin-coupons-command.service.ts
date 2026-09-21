// RESPONSIBILITY: Owns write-side use cases for Admin coupons; persistence remains behind the feature repository.
// FLOW: AdminCouponsCommandController -> AdminCouponsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminCouponsRepository } from '@/modules/admin/coupons/repositories/admin-coupons-repository';
import { AdminCouponsMapper } from '@/modules/admin/coupons/mappers/admin-coupons.mapper';

@Injectable()
export class AdminCouponsCommandService {
  constructor(
    private readonly repository: AdminCouponsRepository,
    private readonly mapper: AdminCouponsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the createCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createRecord(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord(input);
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Executes the updateCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateById(id: string, input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, input);
    return this.response(entity, 'UPDATED');
  }

  /**
   * @description Executes the deleteCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async markAsDeleted(id: string): Promise<null> {
    await this.repository.markAsDeleted(id);
    await this.audit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the toggleCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async toggleActiveById(id: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.toggleActiveById(id);
    return this.response(entity, 'STATUS_TOGGLED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminCouponsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
