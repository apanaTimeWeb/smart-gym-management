// RESPONSIBILITY: Owns Admin subscription transaction boundaries and guarantees that each business mutation and audit event commit atomically.
// FLOW: Subscription command controller -> AdminSubscriptionsOrchestratorService -> Master UnitOfWork -> command service -> repository/audit.
import { Injectable } from '@nestjs/common';

import { AdminCoreMasterUnitOfWorkService } from '@/backend_admin/admin_core/admin_core_database/admin-core-master-unit-of-work.service'

import { AdminSubscriptionsCommandService } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_services/admin-subscriptions-command.service'

@Injectable()
/**
 * @description Defines the AdminSubscriptionsOrchestratorService boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsOrchestratorService {
  constructor(
    private readonly unitOfWork: AdminCoreMasterUnitOfWorkService,
    private readonly commandService: AdminSubscriptionsCommandService,
  ) {}

  /** @description Executes subscription plan changes within one master-database transaction. @param planId Active plan UUID. @returns Null per frontend contract. */
  async updatePlan(planId: string): Promise<null> { return this.unitOfWork.run(() => this.commandService.updatePlan(planId)); }

  /** @description Executes the auto-renewal state transition within one master-database transaction. @returns Null per frontend contract. */
  async updateAutoRenew(): Promise<null> { return this.unitOfWork.run(() => this.commandService.updateAutoRenew()); }

  /** @description Executes payment-method defaulting within one master-database transaction. @param paymentMethodId Payment method UUID. @returns Null per frontend contract. */
  async updateDefaultPaymentMethod(paymentMethodId: string): Promise<null> { return this.unitOfWork.run(() => this.commandService.updateDefaultPaymentMethod(paymentMethodId)); }

  /** @description Executes payment-method removal within one master-database transaction. @param paymentMethodId Payment method UUID. @returns Null per frontend contract. */
  async deletePaymentMethod(paymentMethodId: string): Promise<null> { return this.unitOfWork.run(() => this.commandService.deletePaymentMethod(paymentMethodId)); }
}
