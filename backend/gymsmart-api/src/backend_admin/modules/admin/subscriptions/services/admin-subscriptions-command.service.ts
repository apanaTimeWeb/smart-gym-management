// RESPONSIBILITY: Owns write-side Admin subscription use cases and records immutable mutation audit events.
// FLOW: Command controller → command service → master repository → audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { AdminSubscriptionsRepository } from '@/backend_admin/modules/admin/subscriptions/repositories/admin-subscriptions-repository';

@Injectable()
export class AdminSubscriptionsCommandService {
  constructor(
    private readonly repository: AdminSubscriptionsRepository,
    private readonly auditTrail: CoreAuditTrailService,
  ) {}

  /** @description Upgrades the current tenant subscription to the requested active plan. @param planId Active plan UUID. @returns Null per frontend contract. */
  async upgradePlan(planId: string): Promise<null> {
    const subscription = await this.repository.upgradePlan(planId);
    await this.audit(subscription.id, 'UPGRADED', { planId: subscription.planId, status: subscription.status });
    return null;
  }

  /** @description Toggles auto-renewal for the current tenant subscription. @returns Null per frontend contract. */
  async toggleAutoRenew(): Promise<null> {
    const subscription = await this.repository.toggleAutoRenew();
    await this.audit(subscription.id, 'AUTO_RENEW_TOGGLED', { autoRenew: subscription.autoRenew });
    return null;
  }

  /** @description Sets a tenant payment method as the default. @param paymentMethodId Payment method UUID. @returns Null per frontend contract. */
  async setDefaultPaymentMethod(paymentMethodId: string): Promise<null> {
    const paymentMethod = await this.repository.setDefaultPaymentMethod(paymentMethodId);
    await this.audit(paymentMethod.id, 'PAYMENT_METHOD_DEFAULTED', { paymentMethodId: paymentMethod.id });
    return null;
  }

  /** @description Deactivates a non-default tenant payment method without hard deletion. @param paymentMethodId Payment method UUID. @returns Null per frontend contract. */
  async removePaymentMethod(paymentMethodId: string): Promise<null> {
    await this.repository.deactivatePaymentMethod(paymentMethodId);
    await this.audit(paymentMethodId, 'PAYMENT_METHOD_REMOVED', { paymentMethodId, isActive: false });
    return null;
  }

  private async audit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN.SUBSCRIPTIONS.${action}`, entityType: 'Subscription', entityId, oldValue: null, newValue, severity: 'low', module: 'Finance' });
  }
}
