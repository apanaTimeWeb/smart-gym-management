// RESPONSIBILITY: Owns write-side use cases for Admin subscriptions; persistence remains behind the feature repository.
// FLOW: AdminSubscriptionsCommandController -> AdminSubscriptionsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminSubscriptionsRepository } from '@/modules/admin/subscriptions/repositories/admin-subscriptions-repository';
import { AdminSubscriptionsMapper } from '@/modules/admin/subscriptions/mappers/admin-subscriptions.mapper';

@Injectable()
export class AdminSubscriptionsCommandService {
  constructor(
    private readonly repository: AdminSubscriptionsRepository,
    private readonly mapper: AdminSubscriptionsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the upgradePlan mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async upgradePlan(planId: string): Promise<null> {
    const snapshot = await this.repository.findFirstSnapshot();
    if (!snapshot) throw new Error('SUBSCRIPTION_NOT_FOUND');
    await this.repository.updateById(snapshot.id, { planId });
    return null;
  }

  /**
   * @description Executes the toggleAutoRenew mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async toggleAutoRenew(): Promise<null> {
    const snapshot = await this.repository.findFirstSnapshot();
    if (!snapshot) throw new Error('SUBSCRIPTION_NOT_FOUND');
    await this.repository.updateById(snapshot.id, { autoRenew: snapshot.payload.autoRenew !== true });
    return null;
  }

  /**
   * @description Executes the setDefaultPaymentMethod mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async setDefaultPaymentMethod(id: string): Promise<null> {
    const snapshot = await this.repository.findFirstSnapshot();
    if (!snapshot) throw new Error('SUBSCRIPTION_NOT_FOUND');
    await this.repository.updateById(snapshot.id, { defaultPaymentMethodId: id });
    return null;
  }

  /**
   * @description Executes the removePaymentMethod mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async removePaymentMethod(id: string): Promise<null> {
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
  private async response(entity: Parameters<AdminSubscriptionsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
