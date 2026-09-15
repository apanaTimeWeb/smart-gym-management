// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Dashboard module.
import { z } from 'zod';
import { TenantSchema } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';

export const SaaSDashboardMetricsSchema = z.object({
  totalGyms: z.number(),
  activeGyms: z.number(),
  suspendedGyms: z.number(),
  trialGyms: z.number(),
  totalEndUsers: z.number(),
  monthlyRecurringRevenue: z.number(),
  mrrDeltaPercent: z.number().optional(),
  arrDeltaPercent: z.number().optional(),
  arpu: z.number().optional(),
  revenueByTier: z.array(z.object({ plan: z.string(), amount: z.number() })).optional(),
  revenueByGeography: z.array(z.object({ region: z.string(), revenue: z.number() })).optional(),
  overdueInvoicesCount: z.number(),
  pendingRevenue: z.number(),
  recentOnboards: z.array(TenantSchema),
  platformHealthScore: z.number().optional(),
  trialsExpiringIn7Days: z.number().optional(),
});

export const SuperadminDashboardApiDataSchema = z.object({
  totalTenants: z.number(),
  activeUsers: z.number(),
  monthlyRevenue: z.number(),
  systemHealth: z.number()
});

export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';

export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom' | 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year';

export interface DashboardContextType {
  stats: unknown | null;
  isLoading: boolean;
  isError: boolean;
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
   * Computed by backend from: cancellations rate, overdue invoices, system uptime, active tenant ratio.
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

export interface SuperadminDashboardApiData {
  metrics: SaaSDashboardMetrics;
  revenue: RevenueChartData[];
  growth: GrowthChartData[];
}

export interface SuperadminDashboardKpiGridProps {
  metrics: SaaSDashboardMetrics;
  revenueChartData: RevenueChartData[];
  timeMultiplier: number;
  mrrLabel: string;
}

export interface SuperadminDashboardChartsProps {
  metrics: SaaSDashboardMetrics;
  revenueChartData: RevenueChartData[];
  growthChartData: GrowthChartData[];
  timeMultiplier: number;
  mrrLabel: string;
}

export interface SuperadminDashboardRecentOnboardsProps {
  recentOnboards: Tenant[];
}
