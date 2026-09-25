// RESPONSIBILITY: Owns read-side use cases for Admin subscriptions from the master billing store.
// FLOW: AdminSubscriptionsQueryController â†’ AdminSubscriptionsQueryService â†’ repository â†’ frontend contract.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminSubscriptionsQueryDto } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_dtos/admin-subscriptions-query.dto.js';
import { 
  AdminCurrentSubscriptionDto, 
  AdminSaaSPlanDto, 
  AdminInvoiceDto, 
  AdminPaymentMethodDto, 
  AdminSubscriptionKPIDataDto 
} from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_dtos/admin-subscriptions-response.dto.js';
import { AdminSubscriptionsRepository } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_repositories/admin-subscriptions-repository.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

import type { AdminSubscriptionPlanDomain } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_domain/admin-subscriptions.domain.js';

@Injectable()
/**
 * @description Defines the AdminSubscriptionsQueryService boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsQueryService {
  constructor(private readonly repository: AdminSubscriptionsRepository) {}

  /** @description Returns the current subscription in the exact frontend-consumed shape. @param query Request query. @returns Current subscription contract. */
  async findSubscription(_query: AdminSubscriptionsQueryDto): Promise<AdminCurrentSubscriptionDto> {
    const subscription = await this.repository.findCurrentSubscription();
    if (!subscription) throw new NotFoundException({ message: 'SUBSCRIPTIONS.SUBSCRIPTION_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
    const plan = subscription.planId ? await this.repository.findPlanById(subscription.planId) : null;
    if (!plan) throw new NotFoundException({ message: 'SUBSCRIPTIONS.PLAN_NOT_FOUND', errorCode: 'ADMIN.SUBSCRIPTION.NOT_FOUND' });
    return this.subscriptionResponse(subscription.payload, plan, subscription);
  }

  /** @description Returns active SaaS plans with the current plan marker. @param query Request query. @returns SaaS plan list. */
  async findAllPlans(_query: AdminSubscriptionsQueryDto): Promise<AdminSaaSPlanDto[]> {
    const [plans, subscription] = await Promise.all([this.repository.findActivePlans(), this.repository.findCurrentSubscription()]);
    return plans.map((plan) => this.createPlanResponse(plan, subscription?.planId === plan.id));
  }

  /** @description Returns tenant-scoped invoice history with canonical pagination metadata. @param query Page and limit. @returns Paginated invoice contracts. */
  async findAllInvoices(query: AdminSubscriptionsQueryDto): Promise<AdminCorePaginatedResult<AdminInvoiceDto>> {
    const result = await this.repository.findMasterInvoices(query);
    return { items: result.items.map((invoice): AdminInvoiceDto => ({
      id: invoice.id,
      invoiceNo: invoice.invoiceNo,
      date: this.createStringValue(invoice.payload.date, invoice.issuedAt),
      dueDate: this.createStringValue(invoice.payload.dueDate, invoice.issuedAt),
      amount: Number(invoice.amountMinor),
      status: this.createStringValue(invoice.payload.status, invoice.status).toLowerCase() as any,
      planName: this.createStringValue(invoice.payload.planName, ''),
      billingCycle: this.createStringValue(invoice.payload.billingCycle, 'monthly'),
      pdfUrl: this.createStringValue(invoice.payload.pdfUrl, ''),
      taxAmount: this.createOptionalNumber(invoice.payload.taxAmount),
      gstNumber: typeof invoice.payload.gstNumber === 'string' ? invoice.payload.gstNumber : undefined,
      currency: this.createStringValue(invoice.payload.currency, 'INR'),
    })), meta: result.meta };
  }

  /** @description Returns active saved payment methods for the authenticated tenant. @param query Request query. @returns Payment method contracts. */
  async findAllPaymentMethods(_query: AdminSubscriptionsQueryDto): Promise<AdminPaymentMethodDto[]> {
    const methods = await this.repository.findActivePaymentMethods();
    return methods.map((method): AdminPaymentMethodDto => ({
      id: method.id,
      type: this.createStringValue(method.payload.type, method.provider),
      last4: typeof method.payload.last4 === 'string' ? method.payload.last4 : undefined,
      brand: typeof method.payload.brand === 'string' ? method.payload.brand : undefined,
      upiId: typeof method.payload.upiId === 'string' ? method.payload.upiId : undefined,
      bankName: typeof method.payload.bankName === 'string' ? method.payload.bankName : undefined,
      expiryMonth: this.createOptionalNumber(method.payload.expiryMonth),
      expiryYear: this.createOptionalNumber(method.payload.expiryYear),
      isDefault: method.isDefault,
    }));
  }

  /** @description Calculates subscription KPIs from master subscription and invoice state. @param query Request query. @returns KPI contract. */
  async findSubscriptionKpis(_query: AdminSubscriptionsQueryDto): Promise<AdminSubscriptionKPIDataDto> {
    const kpis = await this.repository.findKpis();
    return {
      currentPlan: this.createStringValue(kpis.currentPlan, ''),
      monthlySpend: this.createNumberValue(kpis.monthlySpend),
      currency: this.createStringValue(kpis.currency, 'INR'),
      totalInvoices: this.createNumberValue(kpis.totalInvoices),
      nextBillingAmount: this.createNumberValue(kpis.nextBillingAmount),
      daysUntilRenewal: this.createNumberValue(kpis.daysUntilRenewal),
      savedWithAnnual: this.createNumberValue(kpis.savedWithAnnual),
    };
  }

  /** @description Executes the subscriptionResponse query within the subscriptions read boundary. @returns Frontend-safe result. */
  private subscriptionResponse(payload: Record<string, unknown>, plan: AdminSubscriptionPlanDomain, subscription: { autoRenew: boolean }): AdminCurrentSubscriptionDto {
    return {
      planId: plan.id,
      planName: plan.name,
      tier: plan.tier,
      monthlyPrice: Number(plan.monthlyPriceMinor),
      currency: this.createStringValue(plan.payload.currency, 'INR'),
      annualPrice: Number(plan.annualPriceMinor),
      billingCycle: this.createStringValue(payload.billingCycle, 'monthly'),
      status: this.createStringValue(payload.status, 'active') as any,
      currentPeriodStart: this.createStringValue(payload.currentPeriodStart, new Date().toISOString()),
      currentPeriodEnd: this.createStringValue(payload.currentPeriodEnd, new Date().toISOString()),
      nextBillingDate: this.createStringValue(payload.nextBillingDate, new Date().toISOString()),
      autoRenew: subscription.autoRenew,
      gymCount: this.createNumberValue(payload.gymCount),
      memberLimit: this.createNumberValue(plan.payload.memberLimit ?? payload.memberLimit),
      staffLimit: this.createNumberValue(plan.payload.staffLimit ?? payload.staffLimit),
      storageGb: this.createNumberValue(plan.payload.storageGb ?? payload.storageGb),
    };
  }

  /** @description Executes the createPlanResponse query within the subscriptions read boundary. @returns Frontend-safe result. */
  private createPlanResponse(plan: AdminSubscriptionPlanDomain, isCurrent: boolean): AdminSaaSPlanDto {
    return {
      id: plan.id,
      name: plan.name,
      tier: plan.tier,
      monthlyPrice: Number(plan.monthlyPriceMinor),
      currency: this.createStringValue(plan.payload.currency, 'INR'),
      annualPrice: Number(plan.annualPriceMinor),
      gymLimit: this.createNumberValue(plan.payload.gymLimit),
      memberLimit: this.createNumberValue(plan.payload.memberLimit),
      staffLimit: this.createNumberValue(plan.payload.staffLimit),
      storageGb: this.createNumberValue(plan.payload.storageGb),
      features: Array.isArray(plan.payload.features) ? plan.payload.features.filter((value): value is string => typeof value === 'string') : [],
      isPopular: plan.payload.isPopular === true,
      isCurrent,
    };
  }

  /** @description Safely reads a non-empty string from JSONB payload data. @param value Candidate value. @param fallback Fallback string. @returns Valid string value. */
  private createStringValue(value: unknown, fallback: string): string {
    return typeof value === 'string' && value.length > 0 ? value : fallback;
  }

  /** @description Safely reads a finite number from JSONB payload data. @param value Candidate value. @returns Finite number or zero. */
  private createNumberValue(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : 0;
  }

  /** @description Returns a finite optional number from untyped JSON payload data. @param value Candidate value. @returns Finite number or undefined. */
  private createOptionalNumber(value: unknown): number | undefined {
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
  }
}
