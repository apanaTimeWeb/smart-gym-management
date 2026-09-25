// RESPONSIBILITY: Owns write-side Admin subscription use cases and records immutable mutation audit events.
// FLOW: Command controller â†’ command service â†’ master repository â†’ audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';

import { AdminSubscriptionsRepository } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_repositories/admin-subscriptions-repository.js';

@Injectable()
/**
 * @description Defines the AdminSubscriptionsCommandService boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsCommandService {
  constructor(
    private readonly repository: AdminSubscriptionsRepository,
    private readonly auditTrail: AdminCoreAuditTrailService,
  ) {}

  /** @description Upgrades the current tenant subscription to the requested active plan. @param planId Active plan UUID. @returns Null per frontend contract. */
  async updatePlan(planId: string): Promise<null> {
    const subscription = await this.repository.updatePlan(planId);
    await this.createAudit(subscription.id, 'UPGRADED', { planId: subscription.planId, status: subscription.status });
    return null;
  }

  /** @description Toggles auto-renewal for the current tenant subscription. @returns Null per frontend contract. */
  async updateAutoRenew(): Promise<null> {
    const subscription = await this.repository.updateAutoRenew();
    await this.createAudit(subscription.id, 'AUTO_RENEW_TOGGLED', { autoRenew: subscription.autoRenew });
    return null;
  }

  /** @description Sets a tenant payment method as the default. @param paymentMethodId Payment method UUID. @returns Null per frontend contract. */
  async updateDefaultPaymentMethod(paymentMethodId: string): Promise<null> {
    const paymentMethod = await this.repository.updateDefaultPaymentMethod(paymentMethodId);
    await this.createAudit(paymentMethod.id, 'PAYMENT_METHOD_DEFAULTED', { paymentMethodId: paymentMethod.id });
    return null;
  }

  /** @description Deactivates a non-default tenant payment method without hard deletion. @param paymentMethodId Payment method UUID. @returns Null per frontend contract. */
  async deletePaymentMethod(paymentMethodId: string): Promise<null> {
    await this.repository.deactivatePaymentMethod(paymentMethodId);
    await this.createAudit(paymentMethodId, 'PAYMENT_METHOD_REMOVED', { paymentMethodId, isActive: false });
    return null;
  }

  /**
   * @description Records a compact audit event for a subscription mutation.
   * @param entityId Subscription resource identifier.
   * @param action Machine-readable mutation action.
   * @param newValue Safe post-mutation snapshot.
   * @returns Persisted audit record identifier.
   * @remarks Audit metadata is resolved from the active request context; callers must not pass credentials or raw request bodies.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN.SUBSCRIPTIONS.${action}`, entityType: 'Subscription', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'subscriptions' });
  }
}
