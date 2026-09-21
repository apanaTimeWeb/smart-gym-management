// RESPONSIBILITY: Owns master-database persistence for Admin subscription state, plans, invoices, and payment methods.
// FLOW: Admin subscriptions service → repository → trusted tenant context → master TypeORM repository → PostgreSQL.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CorePaginatedResult } from '@/core/types/core-api-response.types';
import { CoreRequestContextService } from '@/core/context/core-request-context.service';
import { CoreTenantDataSourceManager } from '@/core/database/core-tenant-data-source.manager';
import { buildPaginationMeta } from '@/core/pagination/core-pagination';
import { CoreMasterSubscriptionEntity } from '@/core/subscription/core-master-subscription.entity';
import { CoreMasterPlanEntity } from '@/core/subscription/core-master-plan.entity';
import { CoreMasterInvoiceEntity } from '@/core/subscription/core-master-invoice.entity';
import { CoreMasterPaymentMethodEntity } from '@/core/subscription/core-master-payment-method.entity';
import { AdminSubscriptionsEntity } from '@/modules/admin/subscriptions/entities/admin-subscriptions-entity';
import { AdminSubscriptionsQueryDto } from '@/modules/admin/subscriptions/dtos/admin-subscriptions-query.dto';

@Injectable()
export class AdminSubscriptionsRepository {
  constructor(
    private readonly tenantManager: CoreTenantDataSourceManager,
    private readonly requestContext: CoreRequestContextService,
    @InjectDataSource() private readonly masterDataSource: DataSource,
  ) {}

  /** @description Finds the authenticated tenant's current master subscription. @returns Subscription or null. */
  async findCurrentSubscription(): Promise<CoreMasterSubscriptionEntity | null> {
    return this.masterDataSource.getRepository(CoreMasterSubscriptionEntity).findOne({
      where: { tenantId: this.requestContext.get().tenantId },
    });
  }

  /** @description Finds active SaaS plans available to the tenant. @returns Active plans. */
  async findActivePlans(): Promise<CoreMasterPlanEntity[]> {
    return this.masterDataSource.getRepository(CoreMasterPlanEntity).find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  /** @description Finds tenant invoices with server-side pagination. @param query Frontend pagination query. @returns Paginated invoices. */
  async findMasterInvoices(query: AdminSubscriptionsQueryDto): Promise<CorePaginatedResult<CoreMasterInvoiceEntity>> {
    const repository = this.masterDataSource.getRepository(CoreMasterInvoiceEntity);
    const tenantId = this.requestContext.get().tenantId;
    const builder = repository.createQueryBuilder('invoice').where('invoice.tenant_id = :tenantId', { tenantId });
    builder.orderBy('invoice.issued_at', 'DESC');
    const [items, total] = await builder.skip((query.page - 1) * query.limit).take(query.limit).getManyAndCount();
    return { items, meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Finds active tenant payment methods. @returns Active payment methods. */
  async findActivePaymentMethods(): Promise<CoreMasterPaymentMethodEntity[]> {
    return this.masterDataSource.getRepository(CoreMasterPaymentMethodEntity).find({
      where: { tenantId: this.requestContext.get().tenantId, isActive: true },
      order: { isDefault: 'DESC', id: 'ASC' },
    });
  }

  /** @description Calculates subscription KPI values from master billing state. @returns Frontend KPI contract. */
  async findKpis(): Promise<Record<string, unknown>> {
    const tenantId = this.requestContext.get().tenantId;
    const subscription = await this.findCurrentSubscription();
    if (!subscription) throw new NotFoundException('Subscription not found.');
    const plan = subscription.planId
      ? await this.masterDataSource.getRepository(CoreMasterPlanEntity).findOne({ where: { id: subscription.planId, isActive: true } })
      : null;
    if (!plan) throw new NotFoundException('Subscription plan not found.');

    const invoiceCount = await this.masterDataSource.getRepository(CoreMasterInvoiceEntity).count({ where: { tenantId } });
    const annual = this.toMajorUnits(plan.annualPriceMinor);
    const monthly = this.toMajorUnits(plan.monthlyPriceMinor);
    const payload = subscription.payload ?? {};
    const nextBillingAmount = typeof payload.nextBillingAmount === 'number' ? payload.nextBillingAmount : annual;
    const nextBillingDate = typeof payload.nextBillingDate === 'string' ? payload.nextBillingDate : null;
    const daysUntilRenewal = nextBillingDate ? Math.max(0, Math.ceil((new Date(nextBillingDate).getTime() - Date.now()) / 86_400_000)) : 0;

    return {
      currentPlan: plan.name,
      monthlySpend: typeof payload.monthlySpend === 'number' ? payload.monthlySpend : monthly,
      totalInvoices: invoiceCount,
      nextBillingAmount,
      daysUntilRenewal,
      savedWithAnnual: Math.max(0, monthly * 12 - annual),
    };
  }

  /** @description Upgrades the current tenant subscription to an active master plan atomically. @param planId Target plan UUID. @returns Updated subscription. */
  async upgradePlan(planId: string): Promise<CoreMasterSubscriptionEntity> {
    return this.masterDataSource.transaction(async (manager) => {
      const tenantId = this.requestContext.get().tenantId;
      const subscriptionRepository = manager.getRepository(CoreMasterSubscriptionEntity);
      const planRepository = manager.getRepository(CoreMasterPlanEntity);
      const subscription = await subscriptionRepository.findOne({ where: { tenantId } });
      if (!subscription) throw new NotFoundException('Subscription not found.');
      const plan = await planRepository.findOne({ where: { id: planId, isActive: true } });
      if (!plan) throw new NotFoundException('Subscription plan not found.');
      subscription.planId = plan.id;
      subscription.status = 'active';
      subscription.payload = {
        ...subscription.payload,
        planName: plan.name,
        tier: plan.tier,
        monthlyPrice: this.toMajorUnits(plan.monthlyPriceMinor),
        annualPrice: this.toMajorUnits(plan.annualPriceMinor),
        memberLimit: this.numberFromPayload(plan.payload.memberLimit, subscription.payload.memberLimit),
        staffLimit: this.numberFromPayload(plan.payload.staffLimit, subscription.payload.staffLimit),
        storageGb: this.numberFromPayload(plan.payload.storageGb, subscription.payload.storageGb),
        gymCount: this.numberFromPayload(subscription.payload.gymCount, 0),
      };
      return subscriptionRepository.save(subscription);
    });
  }

  /** @description Toggles auto-renewal for the current tenant subscription atomically. @returns Updated subscription. */
  async toggleAutoRenew(): Promise<CoreMasterSubscriptionEntity> {
    const tenantId = this.requestContext.get().tenantId;
    return this.masterDataSource.transaction(async (manager) => {
      const repository = manager.getRepository(CoreMasterSubscriptionEntity);
      const subscription = await repository.findOne({ where: { tenantId } });
      if (!subscription) throw new NotFoundException('Subscription not found.');
      subscription.autoRenew = !subscription.autoRenew;
      subscription.payload = { ...subscription.payload, autoRenew: subscription.autoRenew };
      return repository.save(subscription);
    });
  }

  /** @description Sets one active payment method as default and clears the tenant's prior default atomically. @param paymentMethodId Payment method UUID. @returns Updated default payment method. */
  async setDefaultPaymentMethod(paymentMethodId: string): Promise<CoreMasterPaymentMethodEntity> {
    const tenantId = this.requestContext.get().tenantId;
    return this.masterDataSource.transaction(async (manager) => {
      const repository = manager.getRepository(CoreMasterPaymentMethodEntity);
      const paymentMethod = await repository.findOne({ where: { id: paymentMethodId, tenantId, isActive: true } });
      if (!paymentMethod) throw new NotFoundException('Payment method not found.');
      await repository.update({ tenantId, isActive: true }, { isDefault: false });
      paymentMethod.isDefault = true;
      return repository.save(paymentMethod);
    });
  }

  /** @description Deactivates a payment method without physically deleting the master record. @param paymentMethodId Payment method UUID. @returns Completion promise. */
  async deactivatePaymentMethod(paymentMethodId: string): Promise<void> {
    const repository = this.masterDataSource.getRepository(CoreMasterPaymentMethodEntity);
    const tenantId = this.requestContext.get().tenantId;
    const paymentMethod = await repository.findOne({ where: { id: paymentMethodId, tenantId, isActive: true } });
    if (!paymentMethod) throw new NotFoundException('Payment method not found.');
    paymentMethod.isActive = false;
    paymentMethod.isDefault = false;
    await repository.save(paymentMethod);
  }

  // Legacy tenant snapshot methods remain private-compatible for older integration tooling; Admin runtime reads/writes use master entities above.
  async findFirstSnapshot(): Promise<AdminSubscriptionsEntity | null> {
    const source = await this.tenantManager.getCurrent();
    return source.getRepository(AdminSubscriptionsEntity).findOne({ order: { createdAt: 'ASC' } });
  }

  /** @description Converts integer minor-unit money to the frontend's major-unit number contract. @param minorValue Database minor units. @returns Major units. */
  private toMajorUnits(minorValue: string): number {
    return Number(minorValue) / 100;
  }

  /** @description Chooses a numeric plan payload value with a safe fallback. @param value Candidate value. @param fallback Fallback number. @returns Normalized number. */
  private numberFromPayload(value: unknown, fallback: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : typeof fallback === 'number' && Number.isFinite(fallback) ? fallback : 0;
  }
}
