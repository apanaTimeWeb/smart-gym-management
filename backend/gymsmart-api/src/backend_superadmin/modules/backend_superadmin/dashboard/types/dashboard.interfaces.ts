// RESPONSIBILITY: Defines dashboard domain, query, and widget response shapes without ORM leakage.
// FLOW: DTO/query -> service -> repository projection -> response DTO.

export interface DashboardListQuery {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  search?: string;
}

export interface DashboardCreateInput {
  kind?: string;
  payload?: unknown;
}

export interface DashboardUpdateInput extends DashboardCreateInput {}

export interface DashboardDomainModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  kind: string;
  payload: unknown;
}

export interface DashboardWidgetQuery {
  range?: string;
  startDate?: string;
  endDate?: string;
}

export interface DashboardKpisProjection {
  currency: string;
  totalGyms: number;
  activeGyms: number;
  suspendedGyms: number;
  trialGyms: number;
  totalEndUsers: number;
  monthlyRecurringRevenue: number;
  overdueInvoicesCount: number;
  pendingRevenue: number;
  trialsExpiringIn7Days: number;
  mrrDeltaPercent: number;
  arrDeltaPercent: number;
  arpu: number;
  platformHealthScore: number;
}

export interface DashboardRecentOnboardProjection {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: string;
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
  lastActiveAt?: string | null;
  staffCount: number;
  currency: string;
}

export interface DashboardRevenueChartProjection {
  month: string;
  mrr: number;
  currency: string;
}

export interface DashboardGrowthChartProjection {
  month: string;
  gyms: number;
}

export interface DashboardRevenueByTierProjection {
  plan: string;
  amount: number;
  currency: string;
  tenantCount: number;
}

export interface DashboardRevenueByGeographyProjection {
  region: string;
  revenue: number;
  currency: string;
}

export interface DashboardBusinessOverviewRow {
  current_income: string | number;
  previous_income: string | number;
}
