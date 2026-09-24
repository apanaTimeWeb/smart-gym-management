// RESPONSIBILITY: Defines domain/query projection types for analytics without ORM leakage.
// FLOW: Controller DTO -> SuperadminAnalyticsMainService -> SuperadminAnalyticsRepository -> typed SQL projections.
/**
 * Primary Intent: Defines SuperadminAnalyticsListQuery as the interface-level contract for superadmin-analytics.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminAnalyticsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsCreateInput { kind?: string; payload?: unknown; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsUpdateInput extends SuperadminAnalyticsCreateInput {}
/**
 * Primary Intent: Defines the SuperadminAnalyticsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null; kind: string; payload: unknown; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsSummaryRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsSummaryRow { mrr: string | number; active_tenants: string | number; acquisition_spend: string | number; acquisition_tenants: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsCancellationRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsCancellationRow { cancelled: string | number; total: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsMonthlyRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsMonthlyRow { month: string | Date; revenue: string | number; tenant_count: string | number; cancelled_count: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsPlanRevenueRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsPlanRevenueRow { plan: string; revenue: string | number; tenant_count: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsStatusRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsStatusRow { status: string; count: string | number; revenue: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsCohortRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsCohortRow { month: string; total: string | number; m1: string | number; m2: string | number; m3: string | number; m6: string | number; m12: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsMovementRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsMovementRow { opening: string | number; current: string | number; new_revenue: string | number; returning_revenue: string | number; lost_revenue: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsAdoptionRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsAdoptionRow { feature: string; available: string | number; active: string | number; used: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsSourceRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsSourceRow { source: string; gyms: string | number; monthly_income: string | number; churn: string | number; }
/**
 * Primary Intent: Defines SuperadminAnalyticsConcentrationRow as the interface-level contract for superadmin-analytics.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminAnalyticsConcentrationRow { group_name: string; share: string | number; }
/**
 * Primary Intent: Defines the SuperadminAnalyticsLivePayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsLivePayload {
  currency: string;
  metrics: { mrr: number; arr: number; cancellationRate: number; ltv: number; cac: number; activeTenants: number; arpu: number; mrrDeltaPercent: number; arrDeltaPercent: number; cancellationDeltaPercent: number };
  monthly: Array<{ month: string; mrr: number; tenantCount: number; cancelledCount: number; currency: string }>;
  planRevenue: Array<{ plan: string; revenue: number; tenantCount: number; currency: string }>;
}
/**
 * Primary Intent: Defines the SuperadminAnalyticsRetentionPayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAnalyticsRetentionPayload {
  currency: string;
  metrics: { existingIncomeRetained: number; grossIncomeRetained: number; gymRetention: number; revenueLost: number; customerChurn: number };
  cohort: Array<{ month: string; m1: number; m2: number; m3: number; m6: number; m12: number }>;
  movement: Array<{ label: string; value: number }>;
  adoption: Array<{ feature: string; available: number; active: number; used: number }>;
  sources: Array<{ source: string; gyms: number; monthlyIncome: number; churn: number }>;
  concentration: Array<{ group: string; share: number }>;
}
