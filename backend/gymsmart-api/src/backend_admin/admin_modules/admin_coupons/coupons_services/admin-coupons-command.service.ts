// RESPONSIBILITY: Owns write-side use cases for Admin coupons; persistence remains behind the feature repository.
// FLOW: AdminCouponsCommandController -> AdminCouponsCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';

import { AdminCouponsMutationDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-mutation.dto.js';
import { AdminCouponsResponsePresenter } from '@/backend_admin/admin_modules/admin_coupons/coupons_mappers/admin-coupons.response.presenter.js';
import { AdminCouponsRepository } from '@/backend_admin/admin_modules/admin_coupons/coupons_repositories/admin-coupons-repository.js';

@Injectable()
/**
 * @description Defines the AdminCouponsCommandService boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsCommandService {
  constructor(
    private readonly repository: AdminCouponsRepository,
    private readonly presenter: AdminCouponsResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the createCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createRecord(input: AdminCouponsMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord(input);
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the updateCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateById(id: string, input: AdminCouponsMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateById(id, input);
    return this.createResponse(entity, 'UPDATED');
  }

  /**
   * @description Executes the deleteCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deleteCoupon(id: string): Promise<null> {
    await this.repository.deleteCoupon(id);
    await this.createAudit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the toggleCoupon mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async updateCouponActiveById(id: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.updateCouponActiveById(id);
    return this.createResponse(entity, 'STATUS_TOGGLED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminCouponsRepository['findByIdOrThrow']>>, action: string): Promise<Record<string, unknown>> {
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'coupons' });
  }
}
