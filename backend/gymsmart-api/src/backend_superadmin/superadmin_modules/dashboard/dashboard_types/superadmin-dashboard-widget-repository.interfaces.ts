// RESPONSIBILITY: Defines SQL row shapes owned by the dashboard widget repository.
// FLOW: TypeORM/PostgreSQL row -> widget repository -> typed dashboard projection.

/**
 * Primary Intent: Defines the DashboardKpiRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardKpiRow {
  total_gyms: string | number;
  active_gyms: string | number;
  suspended_gyms: string | number;
  trial_gyms: string | number;
  total_end_users: string | number;
  mrr: string | number;
  overdue_count: string | number;
  pending_revenue: string | number;
  current_revenue: string | number;
  previous_revenue: string | number;
  current_arr: string | number;
  previous_arr: string | number;
  trials_expiring: string | number;
}
/**
 * Primary Intent: Defines the DashboardHealthRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardHealthRow {
  open_critical: string | number;
}
/**
 * Primary Intent: Defines the DashboardRevenueChartRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardRevenueChartRow { month_start: string | Date; revenue: string | number; }
/**
 * Primary Intent: Defines the DashboardGrowthChartRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardGrowthChartRow { month_start: string | Date; gyms: string | number; }
/**
 * Primary Intent: Defines the DashboardTierRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardTierRow { plan: string; amount: string | number; tenant_count: string | number; }
/**
 * Primary Intent: Defines the DashboardGeoRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardGeoRow { region: string; revenue: string | number; }
/**
 * Primary Intent: Defines the DashboardOnboardRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface DashboardOnboardRow {
  id: string; name: string; owner_name: string; admin_email: string; phone: string; status: string; plan: string;
  created_at: string | Date; member_count: string | number; monthly_revenue: string | number; database_version: string;
  city: string | null; state: string | null; country: string | null; gstin: string | null;
  trial_ends_at: string | Date | null; last_login_at: string | Date | null; last_active_at: string | Date | null; staff_count: string | number;
}
/**
 * Primary Intent: Defines SuperadminDashboardRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */

