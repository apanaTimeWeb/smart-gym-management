// RESPONSIBILITY: Owns master-database persistence for Admin subscription state, plans, invoices, and payment methods.
// FLOW: Admin subscriptions service -> master repository -> trusted tenant context -> TypeORM master DataSource.
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource, EntityManager } from 'typeorm';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreMasterInvoiceEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice.entity.js';
import { AdminCoreMasterPaymentMethodEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-payment-method.entity.js';
import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity.js';
import { AdminCoreMasterSubscriptionEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription.entity.js';
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

import { AdminSubscriptionsQueryDto } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_dtos/admin-subscriptions-query.dto.js';
import { AdminSubscriptionsMapper } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_mappers/admin-subscriptions.mapper.js';
import type { AdminSubscriptionsDomainModel } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_domain/admin-subscriptions.domain.js';

import type { AdminSubscriptionDomain, AdminSubscriptionInvoiceDomain, AdminSubscriptionPaymentMethodDomain, AdminSubscriptionPlanDomain } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_domain/admin-subscriptions.domain.js';

@Injectable()
/**
 * @description Defines the AdminSubscriptionsRepository boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsRepository {
  constructor(
    @InjectDataSource() private readonly masterDataSource: DataSource,
    private readonly requestContext: AdminCoreRequestContextService,
    private readonly mapper: AdminSubscriptionsMapper,
  ) {}

  /** @description Resolves the trusted tenant identifier from request context. @returns Tenant UUID. */
  private tenantId(): string {
    return this.requestContext.get().tenantId;
  }

  /** @description Resolves the current master repository manager, honoring an active AdminCoreMasterUnitOfWork transaction. @returns Master EntityManager. */
  private masterManager(): EntityManager {
    return this.requestContext.get().masterEntityManager ?? this.masterDataSource.manager;
  }
  /** @description Finds the current subscription for the authenticated tenant. @returns Current subscription or null. */
  async findCurrentSubscription(): Promise<AdminSubscriptionDomain | null> {
    const entity = await this.masterManager().getRepository(AdminCoreMasterSubscriptionEntity).findOne({
      where: { tenantId: this.tenantId() },
      order: { id: 'DESC' },
    });
    return entity ? this.mapper.toSubscriptionDomain(entity) : null;
  }

  /** @description Finds one plan by identifier for the authenticated tenant's subscription flow. @param id Plan UUID. @returns Plan or null. */
  async findPlanById(id: string): Promise<AdminSubscriptionPlanDomain | null> {
    const entity = await this.masterManager().getRepository(AdminCoreMasterPlanEntity).findOne({ where: { id, isActive: true } });
    return entity ? this.mapper.toPlanDomain(entity) : null;
  }

  /** @description Finds all active SaaS plans in deterministic order. @returns Active plans. */
  async findActivePlans(): Promise<AdminSubscriptionPlanDomain[]> {
    const entities = await this.masterManager().getRepository(AdminCoreMasterPlanEntity).find({ where: { isActive: true }, order: { name: 'ASC' } });
    return entities.map((entity) => this.mapper.toPlanDomain(entity));
  }

  /** @description Finds tenant invoices with canonical pagination metadata. @param query Frontend pagination query. @returns Paginated invoices. */
  async findMasterInvoices(query: AdminSubscriptionsQueryDto): Promise<AdminCorePaginatedResult<AdminSubscriptionInvoiceDomain>> {
    const repository = this.masterManager().getRepository(AdminCoreMasterInvoiceEntity);
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 20));
    const [items, total] = await repository.findAndCount({
      where: { tenantId: this.tenantId() },
      order: { issuedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      items: items.map((entity) => this.mapper.toInvoiceDomain(entity)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  /** @description Finds active payment methods for the authenticated tenant. @returns Active saved payment methods. */
  async findActivePaymentMethods(): Promise<AdminSubscriptionPaymentMethodDomain[]> {
    const entities = await this.masterManager().getRepository(AdminCoreMasterPaymentMethodEntity).find({
      where: { tenantId: this.tenantId(), isActive: true },
      order: { isDefault: 'DESC', id: 'ASC' },
    });
    return entities.map((entity) => this.mapper.toPaymentMethodDomain(entity));
  }

  /** @description Changes the current tenant plan inside one master-database transaction. @param planId Target plan UUID. @returns Updated subscription. @throws NotFoundException when plan/subscription is unavailable. */
  async updatePlan(planId: string): Promise<AdminSubscriptionDomain> {
    const tenantId = this.tenantId();
    const manager = this.requireMasterTransaction();

      const plan = await manager.getRepository(AdminCoreMasterPlanEntity).findOne({ where: { id: planId, isActive: true } });
      if (!plan) throw new NotFoundException({ message: 'SUBSCRIPTIONS.PLAN_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
      const repository = manager.getRepository(AdminCoreMasterSubscriptionEntity);
    const subscription = await repository.findOne({ where: { tenantId }, lock: { mode: 'pessimistic_write' } });
      if (!subscription) throw new NotFoundException({ message: 'SUBSCRIPTIONS.SUBSCRIPTION_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
    this.requestContext.setMutationBefore(subscription);
    subscription.planId = plan.id;
    subscription.payload = { ...subscription.payload, planName: plan.name, tier: plan.tier };
    subscription.status = 'ACTIVE' as any;
    return this.mapper.toSubscriptionDomain(await repository.save(subscription));
  }

  /** @description Toggles auto-renewal for the current tenant subscription atomically. @returns Updated subscription. @throws NotFoundException when missing. */
  async updateAutoRenew(): Promise<AdminSubscriptionDomain> {
    const tenantId = this.tenantId();
    const manager = this.requireMasterTransaction();

      const repository = manager.getRepository(AdminCoreMasterSubscriptionEntity);
    const subscription = await repository.findOne({ where: { tenantId }, lock: { mode: 'pessimistic_write' } });
      if (!subscription) throw new NotFoundException({ message: 'SUBSCRIPTIONS.SUBSCRIPTION_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
    this.requestContext.setMutationBefore(subscription);
    subscription.autoRenew = !subscription.autoRenew;
    return this.mapper.toSubscriptionDomain(await repository.save(subscription));
  }

  /** @description Makes one tenant payment method default and atomically clears the previous default. @param paymentMethodId Payment method UUID. @returns Updated payment method. @throws NotFoundException when unavailable. */
  async updateDefaultPaymentMethod(paymentMethodId: string): Promise<AdminSubscriptionPaymentMethodDomain> {
    const tenantId = this.tenantId();
    const manager = this.requireMasterTransaction();

    const repository = manager.getRepository(AdminCoreMasterPaymentMethodEntity);
    const method = await repository.findOne({ where: { id: paymentMethodId, tenantId, isActive: true }, lock: { mode: 'pessimistic_write' } });
    if (!method) throw new NotFoundException({ message: 'SUBSCRIPTIONS.PAYMENT_METHOD_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
    this.requestContext.setMutationBefore(method);
    const activeMethods = await repository.createQueryBuilder('payment_method').setLock('pessimistic_write').where('payment_method.tenant_id = :tenantId AND payment_method.is_active = true', { tenantId }).getMany();
    activeMethods.forEach((activeMethod) => { activeMethod.isDefault = activeMethod.id === paymentMethodId; });
    await repository.save(activeMethods);
    return this.mapper.toPaymentMethodDomain(await repository.save(method));
  }

  /** @description Soft-deactivates a non-default payment method. @param paymentMethodId Payment method UUID. @returns Updated payment method. @throws NotFoundException or conflict when unavailable/default. */
  async deactivatePaymentMethod(paymentMethodId: string): Promise<AdminSubscriptionPaymentMethodDomain> {
    const tenantId = this.tenantId();
    const manager = this.requireMasterTransaction();

    const repository = manager.getRepository(AdminCoreMasterPaymentMethodEntity);
    const method = await repository.findOne({ where: { id: paymentMethodId, tenantId, isActive: true }, lock: { mode: 'pessimistic_write' } });
    if (!method) throw new NotFoundException({ message: 'SUBSCRIPTIONS.PAYMENT_METHOD_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
    this.requestContext.setMutationBefore(method);
    if (method.isDefault) throw new ConflictException({ message: 'SUBSCRIPTIONS.DEFAULT_PAYMENT_METHOD_CANNOT_BE_REMOVED', errorCode: 'ADMIN.SUBSCRIPTION.CONFLICT' });
    method.isActive = false;
    return this.mapper.toPaymentMethodDomain(await repository.save(method));
  }

  /** @description Resolves the active master-database transaction manager established by the feature orchestrator. @returns Active EntityManager. @throws Error when a mutation bypasses the orchestrator. */
  private requireMasterTransaction(): import('typeorm').EntityManager {
    const manager = this.requestContext.get().masterEntityManager;
    if (!manager) throw new Error('SUBSCRIPTIONS.TRANSACTION.REQUIRED');
    return manager;
  }

  /** @description Calculates subscription KPIs from master subscription, plan, and invoice state. @returns KPI values. */
  async findKpis(): Promise<Record<string, unknown>> {
    const tenantId = this.tenantId();
    const [subscription, invoices] = await Promise.all([
      this.findCurrentSubscription(),
      this.masterManager().getRepository(AdminCoreMasterInvoiceEntity).find({ where: { tenantId }, order: { issuedAt: 'DESC' } }),
    ]);
    const plan = subscription?.planId ? await this.masterManager().getRepository(AdminCoreMasterPlanEntity).findOne({ where: { id: subscription.planId } }) : null;
    const monthlySpendMinor = plan ? Number(plan.monthlyPriceMinor) : 0;
    const nextBillingMinor = typeof subscription?.payload.nextBillingAmountMinor === 'number' ? subscription.payload.nextBillingAmountMinor : monthlySpendMinor;
    const periodEnd = typeof subscription?.payload.currentPeriodEnd === 'string' ? new Date(subscription.payload.currentPeriodEnd) : null;
    const daysUntilRenewal = periodEnd ? Math.max(0, Math.ceil((periodEnd.getTime() - Date.now()) / 86400000)) : 0;
    return {
      currentPlan: plan?.name ?? subscription?.payload.planName ?? '',
      monthlySpend: monthlySpendMinor,
      currency: typeof plan?.payload.currency === 'string' ? plan.payload.currency : 'INR',
      totalInvoices: invoices.length,
      nextBillingAmount: nextBillingMinor,
      daysUntilRenewal,
      savedWithAnnual: Number(subscription?.payload.savedWithAnnualMinor ?? 0),
    };
  }
}
