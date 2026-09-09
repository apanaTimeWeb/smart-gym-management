// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module.

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  maxMembers: number;
  maxStaff: number;
  dbLimitGb?: number;
  binaryLimitGb?: number;
  features: string[];
  activeTenants: number;
  /** Controls whether this plan appears on the public pricing page */
  isPublic: boolean;
  /** Number of free trial days before billing starts */
  trialDays: number;
  /** One-time setup fee charged at signup, separate from MRR */
  setupFee: number;
  /** ISO 4217 currency code — e.g. 'INR', 'USD' */
  currency: string;
  /** Set by archive action — hides plan from new signups, keeps existing tenants on it */
  isArchived?: boolean;
}

export type CreatePlanPayload = Omit<SubscriptionPlan, 'id' | 'activeTenants' | 'isArchived'>;
export type UpdatePlanPayload = Partial<CreatePlanPayload>;

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
