// RESPONSIBILITY: TypeScript types for the Subscriptions / Billing module.
export type PlanTier = 'starter' | 'growth' | 'pro' | 'enterprise';
export type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'refunded';
export type PaymentMethodType = 'card' | 'upi' | 'netbanking';
export type BillingCycle = 'monthly' | 'annual';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due';

export interface CurrentSubscription {
  planId: string;
  planName: string;
  tier: PlanTier;
  monthlyPrice: number;
  annualPrice: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  autoRenew: boolean;
  gymCount: number;
  memberLimit: number;
  staffLimit: number;
  storageGb: number;
}

export interface SaaSPlan {
  id: string;
  name: string;
  tier: PlanTier;
  monthlyPrice: number;
  annualPrice: number;
  gymLimit: number;
  memberLimit: number;
  staffLimit: number;
  storageGb: number;
  features: string[];
  isPopular: boolean;
  isCurrent: boolean;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  planName: string;
  billingCycle: BillingCycle;
  pdfUrl: string;
  taxAmount?: number;
  gstNumber?: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4?: string;
  brand?: string;
  upiId?: string;
  bankName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface SubscriptionKPIData {
  currentPlan: string;
  monthlySpend: number;
  totalInvoices: number;
  nextBillingAmount: number;
  daysUntilRenewal: number;
  savedWithAnnual: number;
}
