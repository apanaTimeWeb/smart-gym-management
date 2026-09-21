// RESPONSIBILITY: Owns read-side use cases for Admin subscriptions from the master billing store.
// FLOW: AdminSubscriptionsQueryController → AdminSubscriptionsQueryService → repository → frontend contract.

import { Injectable } from '@nestjs/common';
import type { CorePaginationMeta } from '@/backend_admin/core/types/core-api-response.types';
import { CoreMasterPlanEntity } from '@/backend_admin/core/subscription/core-master-plan.entity';
import { AdminSubscriptionsQueryDto } from '@/backend_admin/modules/admin/subscriptions/dtos/admin-subscriptions-query.dto';
import { AdminSubscriptionsRepository } from '@/backend_admin/modules/admin/subscriptions/repositories/admin-subscriptions-repository';
import { 
  AdminCurrentSubscriptionDto, 
  AdminSaaSPlanDto, 
  AdminInvoiceDto, 
  AdminPaymentMethodDto, 
  AdminSubscriptionKPIDataDto 
} from '@/backend_admin/modules/admin/subscriptions/dtos/admin-subscriptions-response.dto';

@Injectable()
export class AdminSubscriptionsQueryService {
  constructor(private readonly repository: AdminSubscriptionsRepository) {}

  /** @description Returns the current subscription in the exact frontend-consumed shape. @param query Request query. @returns Current subscription contract. */
  async fetchSubscription(_query: AdminSubscriptionsQueryDto): Promise<AdminCurrentSubscriptionDto> {
    const subscription = await this.repository.findCurrentSubscription();
    if (!subscription) throw new Error('SUBSCRIPTION_NOT_FOUND');
    const plans = await this.repository.findActivePlans();
    const plan = plans.find((item) => item.id === subscription.planId);
    if (!plan) throw new Error('SUBSCRIPTION_PLAN_NOT_FOUND');
    return this.subscriptionResponse(subscription.payload, plan, subscription);
  }

  /** @description Returns active SaaS plans with the current plan marker. @param query Request query. @returns SaaS plan list. */
  async fetchPlans(_query: AdminSubscriptionsQueryDto): Promise<AdminSaaSPlanDto[]> {
    const [plans, subscription] = await Promise.all([this.repository.findActivePlans(), this.repository.findCurrentSubscription()]);
    return plans.map((plan) => this.planResponse(plan, subscription?.planId === plan.id));
  }

  /** @description Returns tenant-scoped invoice history with canonical pagination metadata. @param query Page and limit. @returns Paginated invoice contracts. */
  async fetchInvoices(query: AdminSubscriptionsQueryDto): Promise<AdminInvoiceDto[]> {
    const result = await this.repository.findMasterInvoices(query);
    return result.items.map((invoice) => ({
      id: invoice.id,
      invoiceNo: invoice.invoiceNo,
      date: this.stringValue(invoice.payload.date, invoice.issuedAt.toISOString()),
      dueDate: this.stringValue(invoice.payload.dueDate, invoice.issuedAt.toISOString()),
      amount: Number(invoice.amountMinor) / 100,
      status: this.stringValue(invoice.payload.status, invoice.status).toLowerCase(),
      planName: this.stringValue(invoice.payload.planName, ''),
      billingCycle: this.stringValue(invoice.payload.billingCycle, 'monthly'),
      pdfUrl: this.stringValue(invoice.payload.pdfUrl, ''),
      taxAmount: typeof invoice.payload.taxAmount === 'number' ? invoice.payload.taxAmount : undefined,
      gstNumber: typeof invoice.payload.gstNumber === 'string' ? invoice.payload.gstNumber : undefined,
    })) as AdminInvoiceDto[];
  }

  /** @description Returns active saved payment methods for the authenticated tenant. @param query Request query. @returns Payment method contracts. */
  async fetchPaymentMethods(_query: AdminSubscriptionsQueryDto): Promise<AdminPaymentMethodDto[]> {
    const methods = await this.repository.findActivePaymentMethods();
    return methods.map((method) => ({ id: method.id, ...method.payload, isDefault: method.isDefault })) as AdminPaymentMethodDto[];
  }

  /** @description Calculates subscription KPIs from master subscription and invoice state. @param query Request query. @returns KPI contract. */
  async fetchKPIs(_query: AdminSubscriptionsQueryDto): Promise<AdminSubscriptionKPIDataDto> {
    return (await this.repository.findKpis()) as AdminSubscriptionKPIDataDto;
  }

  private subscriptionResponse(payload: Record<string, unknown>, plan: CoreMasterPlanEntity, subscription: { autoRenew: boolean }): AdminCurrentSubscriptionDto {
    return {
      planId: plan.id,
      planName: plan.name,
      tier: plan.tier,
      monthlyPrice: Number(plan.monthlyPriceMinor) / 100,
      annualPrice: Number(plan.annualPriceMinor) / 100,
      billingCycle: this.stringValue(payload.billingCycle, 'monthly'),
      status: this.stringValue(payload.status, 'active'),
      currentPeriodStart: this.stringValue(payload.currentPeriodStart, new Date().toISOString()),
      currentPeriodEnd: this.stringValue(payload.currentPeriodEnd, new Date().toISOString()),
      nextBillingDate: this.stringValue(payload.nextBillingDate, new Date().toISOString()),
      autoRenew: subscription.autoRenew,
      gymCount: this.numberValue(payload.gymCount),
      memberLimit: this.numberValue(plan.payload.memberLimit ?? payload.memberLimit),
      staffLimit: this.numberValue(plan.payload.staffLimit ?? payload.staffLimit),
      storageGb: this.numberValue(plan.payload.storageGb ?? payload.storageGb),
    } as AdminCurrentSubscriptionDto;
  }

  private planResponse(plan: CoreMasterPlanEntity, isCurrent: boolean): AdminSaaSPlanDto {
    return {
      id: plan.id,
      name: plan.name,
      tier: plan.tier,
      monthlyPrice: Number(plan.monthlyPriceMinor) / 100,
      annualPrice: Number(plan.annualPriceMinor) / 100,
      gymLimit: this.numberValue(plan.payload.gymLimit),
      memberLimit: this.numberValue(plan.payload.memberLimit),
      staffLimit: this.numberValue(plan.payload.staffLimit),
      storageGb: this.numberValue(plan.payload.storageGb),
      features: Array.isArray(plan.payload.features) ? plan.payload.features.filter((value): value is string => typeof value === 'string') : [],
      isPopular: plan.payload.isPopular === true,
      isCurrent,
    } as AdminSaaSPlanDto;
  }

  private stringValue(value: unknown, fallback: string): string {
    return typeof value === 'string' && value.length > 0 ? value : fallback;
  }

  private numberValue(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : 0;
  }
}
