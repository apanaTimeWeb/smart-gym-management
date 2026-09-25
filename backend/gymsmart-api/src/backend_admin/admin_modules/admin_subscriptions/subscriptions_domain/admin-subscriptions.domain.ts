// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-subscriptions.domain.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminSubscriptionsStatus, AdminSubscriptionsTier } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.constants'

// RESPONSIBILITY: Defines ORM-independent domain contracts for Admin subscription, plan, invoice, and payment-method flows.
// FLOW: Master ORM entities -> AdminSubscriptionsMapper -> domain objects -> services -> response DTOs.

export interface AdminSubscriptionsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: AdminSubscriptionsStatus | null;
  data: Record<string, unknown>;
}

export interface AdminSubscriptionDomain {
  id: string;
  tenantId: string;
  planId: string | null;
  status: AdminSubscriptionsStatus;
  autoRenew: boolean;
  payload: Record<string, unknown>;
}

export interface AdminSubscriptionPlanDomain {
  id: string;
  name: string;
  tier: AdminSubscriptionsTier;
  monthlyPriceMinor: string;
  annualPriceMinor: string;
  isActive: boolean;
  payload: Record<string, unknown>;
}

export interface AdminSubscriptionInvoiceDomain {
  id: string;
  tenantId: string;
  invoiceNo: string;
  amountMinor: string;
  status: AdminSubscriptionsStatus;
  issuedAt: string;
  payload: Record<string, unknown>;
}

export interface AdminSubscriptionPaymentMethodDomain {
  id: string;
  tenantId: string;
  provider: string;
  externalReference: string;
  isDefault: boolean;
  isActive: boolean;
  payload: Record<string, unknown>;
}
