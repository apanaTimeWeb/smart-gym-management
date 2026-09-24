// RESPONSIBILITY: Produces revenue, cancellation, and tenant-health report arrays from the persisted report dataset.
// FLOW: Controller -> report data service -> reports repository -> typed contract projection.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/reports/reports_repositories/superadmin-reports-analytics.repository';

/**
 * Primary Intent: Defines SuperadminRevenueRow as the interface-level contract for superadmin-reports-data.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminRevenueRow { month: string; mrr: number; newRevenue: number; cancelledRevenue: number; netRevenue: number; tenantCount: number }
/**
 * Primary Intent: Defines the SuperadminCancellationsRecord type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminCancellationsRecord { id: string; gymName: string; ownerName: string; plan: string; cancelledAt: string; reason: string; mrr: number; daysActive: number }
/**
 * Primary Intent: Defines the SuperadminTenantHealthScore type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminTenantHealthScore { id: string; gymName: string; plan: string; score: number; grade: string; memberCount: number; lastLogin: string; paymentHealth: string; featureUsage: number; supportTickets: number }

/**
 * Primary Intent: Defines SuperadminReportsDataService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminReportsDataService {
  constructor(private readonly repository: SuperadminReportsRepository, private readonly analyticsRepository: SuperadminReportsAnalyticsRepository) {}
/**
 * Primary Intent: Executes the revenue use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns revenue rows from the authoritative persisted report dataset. */
  async revenue(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<SuperadminRevenueRow[]> {
    const data = await this.analyticsRepository.getLiveReports(query, 'INR') as { revenue: SuperadminRevenueRow[]; cancellations: SuperadminCancellationsRecord[]; health: SuperadminTenantHealthScore[] };
    return data.revenue as SuperadminRevenueRow[];
  }

  /**
 * Primary Intent: Executes the `cancellations` responsibility owned by this feature-local superadmin-reports-data.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  async cancellations(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<SuperadminCancellationsRecord[]> {
    const data = await this.analyticsRepository.getLiveReports(query, 'INR') as { revenue: SuperadminRevenueRow[]; cancellations: SuperadminCancellationsRecord[]; health: SuperadminTenantHealthScore[] };
    return data.cancellations as SuperadminCancellationsRecord[];
  }

  /**
 * Primary Intent: Executes the `health` responsibility owned by this superadmin-reports-data.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  async health(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<SuperadminTenantHealthScore[]> {
    const data = await this.analyticsRepository.getLiveReports(query, 'INR') as { revenue: SuperadminRevenueRow[]; cancellations: SuperadminCancellationsRecord[]; health: SuperadminTenantHealthScore[] };
    return data.health as SuperadminTenantHealthScore[];
  }

}
