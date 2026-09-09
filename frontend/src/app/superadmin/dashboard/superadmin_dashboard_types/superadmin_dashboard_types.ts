// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Dashboard module.
export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type TimeRange = 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface DashboardContextType {
  stats: unknown | null;
  status: FetchState;
  error: string;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

export interface Tenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: TenantStatus;
  plan: string;
  createdAt: string;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
  city?: string;
  state?: string;
  country?: string;
  gstin?: string;
  trialEndsAt?: string;
  lastLoginAt?: string;
}

/** Revenue breakdown by plan tier — used for the donut chart */
export interface PlanRevenueBreakdown {
  plan: string;
  amount: number;
  tenantCount: number;
}

export interface SaaSDashboardMetrics {
  totalGyms: number;
  activeGyms: number;
  suspendedGyms: number;
  trialGyms: number;
  totalEndUsers: number;
  monthlyRecurringRevenue: number;
  overdueInvoicesCount: number;
  pendingRevenue: number;
  recentOnboards: Tenant[];
  trialsExpiringIn7Days?: number;
  /** MRR % change vs previous period — from API, never hardcoded */
  mrrDeltaPercent?: number;
  /** ARR % change vs previous year — from API, never hardcoded */
  arrDeltaPercent?: number;
  /** Average Revenue Per User = MRR / activeTenants */
  arpu?: number;
  /** Revenue breakdown by plan tier for donut chart (audit item #35) */
  revenueByTier?: PlanRevenueBreakdown[];
  revenueByGeography?: { region: string; revenue: number }[];
  /**
   * Composite platform health score 0–100.
   * Computed by backend from: churn rate, overdue invoices, system uptime, active tenant ratio.
   * Audit item #34 — must come from API, never hardcoded.
   */
  platformHealthScore?: number;
}

export interface RevenueChartData {
  month: string;
  mrr: number;
}

export interface GrowthChartData {
  month: string;
  gyms: number;
}
