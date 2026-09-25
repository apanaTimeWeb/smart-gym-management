// RESPONSIBILITY: Defines dashboard domain, query, and widget response shapes without ORM leakage.
// FLOW: DTO/query -> service -> repository projection -> response DTO.

/**
 * Primary Intent: Defines SuperadminDashboardListQuery as the interface-level contract for superadmin-dashboard.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDashboardListQuery {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  search?: string;
}

/**
 * Primary Intent: Defines the SuperadminDashboardCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardCreateInput {
  kind?: string;
  payload?: unknown;
}

/**
 * Primary Intent: Defines SuperadminDashboardUpdateInput as the interface-level contract for superadmin-dashboard.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDashboardUpdateInput extends SuperadminDashboardCreateInput {}

/**
 * Primary Intent: Defines the SuperadminDashboardDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardDomainModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  kind: string;
  payload: unknown;
}

/**
 * Primary Intent: Defines the SuperadminDashboardWidgetQuery type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardWidgetQuery {
  range?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Primary Intent: Defines SuperadminDashboardKpisProjection as the interface-level contract for superadmin-dashboard.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDashboardKpisProjection {
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

/**
 * Primary Intent: Defines SuperadminDashboardRecentOnboardProjection as the interface-level contract for superadmin-dashboard.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDashboardRecentOnboardProjection {
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

/**
 * Primary Intent: Defines SuperadminDashboardRevenueChartProjection as the interface-level contract for superadmin-dashboard.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDashboardRevenueChartProjection {
  month: string;
  mrr: number;
  currency: string;
}

/**
 * Primary Intent: Defines the SuperadminDashboardGrowthChartProjection type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardGrowthChartProjection {
  month: string;
  gyms: number;
}

/**
 * Primary Intent: Defines the SuperadminDashboardRevenueByTierProjection type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardRevenueByTierProjection {
  plan: string;
  amount: number;
  currency: string;
  tenantCount: number;
}

/**
 * Primary Intent: Defines SuperadminDashboardRevenueByGeographyProjection as the interface-level contract for superadmin-dashboard.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminDashboardRevenueByGeographyProjection {
  region: string;
  revenue: number;
  currency: string;
}

/**
 * Primary Intent: Defines the SuperadminDashboardBusinessOverviewRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardBusinessOverviewRow {
  current_income: string | number;
  previous_income: string | number;
}
/**
 * Primary Intent: Defines the SuperadminDashboardBusinessOverviewProjection type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminDashboardBusinessOverviewProjection {
  currency: string; openingIncome: number; newIncome: number; growthIncome: number; returningIncome: number; reducedIncome: number; lostIncome: number; endingIncome: number;
  existingIncomeRetained: number; gymRetention: number; revenueLostPercent: number; customerChurn: number;
  alerts: Array<{ id: string; level: string; title: string; detail: string; count: number }>;
  leaderboard: Array<{ name: string; plan: string; income: number; growth: number; health: number }>;
  waterfall: Array<{ label: string; value: number }>;
}
