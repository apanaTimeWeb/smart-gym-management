// RESPONSIBILITY: Defines domain/query projection types for analytics without ORM leakage.
// FLOW: Controller DTO -> SuperadminAnalyticsMainService -> SuperadminAnalyticsRepository -> typed SQL projections.
export interface SuperadminAnalyticsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminAnalyticsCreateInput { kind?: string; payload?: unknown; }
export interface SuperadminAnalyticsUpdateInput extends SuperadminAnalyticsCreateInput {}
export interface SuperadminAnalyticsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null; kind: string; payload: unknown; }
export interface SuperadminAnalyticsSummaryRow { mrr: string | number; active_tenants: string | number; acquisition_spend: string | number; acquisition_tenants: string | number; }
export interface SuperadminAnalyticsCancellationRow { cancelled: string | number; total: string | number; }
export interface SuperadminAnalyticsMonthlyRow { month: string | Date; revenue: string | number; tenant_count: string | number; cancelled_count: string | number; }
export interface SuperadminAnalyticsPlanRevenueRow { plan: string; revenue: string | number; tenant_count: string | number; }
export interface SuperadminAnalyticsStatusRow { status: string; count: string | number; revenue: string | number; }
export interface SuperadminAnalyticsCohortRow { month: string; total: string | number; m1: string | number; m2: string | number; m3: string | number; m6: string | number; m12: string | number; }
export interface SuperadminAnalyticsMovementRow { opening: string | number; current: string | number; new_revenue: string | number; returning_revenue: string | number; lost_revenue: string | number; }
export interface SuperadminAnalyticsAdoptionRow { feature: string; available: string | number; active: string | number; used: string | number; }
export interface SuperadminAnalyticsSourceRow { source: string; gyms: string | number; monthly_income: string | number; churn: string | number; }
export interface SuperadminAnalyticsConcentrationRow { group_name: string; share: string | number; }
