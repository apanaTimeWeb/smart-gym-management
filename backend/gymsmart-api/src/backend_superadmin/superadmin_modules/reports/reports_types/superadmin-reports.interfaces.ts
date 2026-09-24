// RESPONSIBILITY: Defines domain/data transfer shapes for the reports feature without ORM leakage.
// FLOW: DTO -> ReportsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminReportsListQuery as the interface-level contract for superadmin-reports.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminReportsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
/**
 * Primary Intent: Defines the SuperadminReportsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsCreateInput {
  kind?: string;
  payload?: unknown;
}
/**
 * Primary Intent: Defines the SuperadminReportsUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsUpdateInput extends SuperadminReportsCreateInput {}

/**
 * Primary Intent: Defines the SuperadminReportsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}

/**
 * Primary Intent: Defines the SuperadminReportsRevenueRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsRevenueRow { month: string | Date; mrr: string | number; new_revenue: string | number; cancelled_revenue: string | number; tenant_count: string | number; }
/**
 * Primary Intent: Defines SuperadminReportsCancellationRow as the interface-level contract for superadmin-reports.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminReportsCancellationRow { id: string; gym_name: string; owner_name: string; plan: string; cancelled_at: string | Date; reason: string; mrr: string | number; days_active: string | number; }
/**
 * Primary Intent: Defines the SuperadminReportsHealthRow type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsHealthRow { id: string; gym_name: string; plan: string; score: string | number; grade: 'A' | 'B' | 'C' | 'D' | 'F'; member_count: string | number; last_login: string | Date | null; payment_health: 'GOOD' | 'AT_RISK' | 'OVERDUE'; feature_usage: string | number; support_tickets: string | number; }
/**
 * Primary Intent: Defines the SuperadminReportsLivePayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsLivePayload {
  revenue: Array<{ month: string; mrr: number; newRevenue: number; cancelledRevenue: number; netRevenue: number; tenantCount: number; currency: string }>;
  cancellations: Array<{ id: string; gymName: string; ownerName: string; plan: string; cancelledAt: string; reason: string; mrr: number; daysActive: number; currency: string }>;
  health: Array<{ id: string; gymName: string; plan: string; score: number; grade: string; memberCount: number; lastLogin: string | null; paymentHealth: string; featureUsage: number; supportTickets: number }>;
  currency: string;
}
/**
 * Primary Intent: Defines the SuperadminReportsComparisonPayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminReportsComparisonPayload {
  currency: string;
  periods: Array<{ key: string; label: string }>;
  segments: Array<{ key: string; label: string }>;
  metrics: Array<{ name: string; current: number; previous: number; change: number }>;
  planComparison: Array<{ name: string; income: number; gyms: number }>;
  regionComparison: Array<{ name: string; current: number; previous: number }>;
  comparisonSets: Array<{ periodKey: string; segmentKey: string; metrics: Array<{ name: string; current: number; previous: number; change: number }> }>;
}
