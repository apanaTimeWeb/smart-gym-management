// RESPONSIBILITY: Defines domain/query projection types for analytics without ORM leakage.
// FLOW: Controller DTO -> AnalyticsMainService -> AnalyticsRepository -> typed SQL projections.
export interface AnalyticsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface AnalyticsCreateInput { kind?: string; payload?: unknown; }
export interface AnalyticsUpdateInput extends AnalyticsCreateInput {}
export interface AnalyticsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null; kind: string; payload: unknown; }
export interface AnalyticsSummaryRow { mrr: string | number; active_tenants: string | number; acquisition_spend: string | number; acquisition_tenants: string | number; }
export interface AnalyticsCancellationRow { cancelled: string | number; total: string | number; }
export interface AnalyticsMonthlyRow { month: string | Date; revenue: string | number; tenant_count: string | number; cancelled_count: string | number; }
export interface AnalyticsPlanRevenueRow { plan: string; revenue: string | number; tenant_count: string | number; }
export interface AnalyticsStatusRow { status: string; count: string | number; revenue: string | number; }
export interface AnalyticsCohortRow { month: string; total: string | number; m1: string | number; m2: string | number; m3: string | number; m6: string | number; m12: string | number; }
export interface AnalyticsMovementRow { opening: string | number; current: string | number; new_revenue: string | number; returning_revenue: string | number; lost_revenue: string | number; }
export interface AnalyticsAdoptionRow { feature: string; available: string | number; active: string | number; used: string | number; }
export interface AnalyticsSourceRow { source: string; gyms: string | number; monthly_income: string | number; churn: string | number; }
export interface AnalyticsConcentrationRow { group_name: string; share: string | number; }
