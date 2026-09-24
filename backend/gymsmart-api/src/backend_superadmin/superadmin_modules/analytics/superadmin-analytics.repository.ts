// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for analytics; no business logic.
// FLOW: analytics service -> repository -> authoritative tenant/invoice/feature queries.
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminAnalyticsEntity } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.entity';
import type { SuperadminAnalyticsAdoptionRow, SuperadminAnalyticsCancellationRow, SuperadminAnalyticsCohortRow, SuperadminAnalyticsConcentrationRow, SuperadminAnalyticsCreateInput, SuperadminAnalyticsDomainModel, SuperadminAnalyticsListQuery, SuperadminAnalyticsLivePayload, SuperadminAnalyticsMonthlyRow, SuperadminAnalyticsMovementRow, SuperadminAnalyticsPlanRevenueRow, SuperadminAnalyticsRetentionPayload, SuperadminAnalyticsSourceRow, SuperadminAnalyticsStatusRow, SuperadminAnalyticsSummaryRow, SuperadminAnalyticsUpdateInput } from '@/backend_superadmin/superadmin_modules/analytics/analytics_types/superadmin-analytics.interfaces';

/**
 * Primary Intent: Defines SuperadminAnalyticsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAnalyticsRepository extends SuperadminCoreBaseRepository<SuperadminAnalyticsEntity> {
  constructor(@InjectRepository(SuperadminAnalyticsEntity) repository: Repository<SuperadminAnalyticsEntity>, transactionContext: SuperadminCoreTransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext); }
  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminAnalyticsListQuery): Promise<{ items: SuperadminAnalyticsEntity[]; total: number }> { const qb = this.createActiveQuery('item'); if (query.search?.trim()) qb.andWhere('item.kind ILIKE :search', { search: `%${query.search.trim()}%` }); const sortMap: Record<string, string> = { createdAt: 'item.created_at', updatedAt: 'item.updated_at', kind: 'item.kind' }; qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC').skip((query.page - 1) * query.limit).take(query.limit); const [items, total] = await qb.getManyAndCount(); return { items, total }; }
  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminAnalyticsEntity | null> { return super.findById(id); }
  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminAnalyticsEntity> { return super.findByIdOrThrow(id, 'ANALYTICS.RECORD.NOT_FOUND'); }
  /**
 * Primary Intent: Executes the createAnalytics use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createAnalytics(input: SuperadminAnalyticsCreateInput): Promise<SuperadminAnalyticsEntity> { return this.activeRepository.save(this.activeRepository.create(input as object)); }
  /**
 * Primary Intent: Executes the updateAnalyticsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateAnalyticsById(id: string, input: SuperadminAnalyticsUpdateInput): Promise<SuperadminAnalyticsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }
  /**
 * Primary Intent: Executes the deleteAnalyticsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteAnalyticsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /**
 * Primary Intent: Executes the getLiveAnalytics use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getLiveAnalytics(currency = 'INR', _input: Record<string, unknown> = {}): Promise<SuperadminAnalyticsLivePayload> {
    const [summary, cancellation, monthly, planRevenue] = await Promise.all([this.getSummary(), this.getCancellation(), this.getMonthly(), this.getPlanRevenue()]);
    const mrr = Number(summary.mrr); const active = Number(summary.active_tenants); const cancelled = Number(cancellation.cancelled); const total = Number(cancellation.total);
    const cancellationRate = total ? Number(((cancelled / total) * 100).toFixed(2)) : 0;
    const previousCancellationRate = cancellation.previousTotal ? (cancellation.previousCancelled / cancellation.previousTotal) * 100 : 0;
    const cancellationDeltaPercent = Number((cancellationRate - previousCancellationRate).toFixed(2));
    const previousMrr = this.previousMetric(monthly); const delta = previousMrr ? Number((((mrr - previousMrr) / previousMrr) * 100).toFixed(2)) : 0;
    const cac = Number(summary.acquisition_tenants) ? Math.round(Number(summary.acquisition_spend) / Number(summary.acquisition_tenants)) : 0;
    return { currency, metrics: { mrr, arr: mrr * 12, cancellationRate, ltv: cancellationRate ? Math.round((mrr / Math.max(active, 1)) / (cancellationRate / 100)) : 0, cac, activeTenants: active, arpu: active ? Math.round(mrr / active) : 0, mrrDeltaPercent: delta, arrDeltaPercent: delta, cancellationDeltaPercent }, monthly: monthly.map((row) => ({ month: new Date(row.month).toISOString().slice(0, 7), mrr: Number(row.revenue), tenantCount: Number(row.tenant_count), cancelledCount: Number(row.cancelled_count), currency })), planRevenue: planRevenue.map((row) => ({ plan: row.plan, revenue: Number(row.revenue), tenantCount: Number(row.tenant_count), currency })) };
  }

  /**
 * Primary Intent: Executes the getLiveRetention use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getLiveRetention(currency = 'INR', _input: Record<string, unknown> = {}): Promise<SuperadminAnalyticsRetentionPayload> {
    const [summary, cancellation, cohort, movement, adoption, sources, concentration] = await Promise.all([this.getSummary(), this.getCancellation(), this.getCohort(), this.getMovement(), this.getAdoption(), this.getSources(), this.getConcentration()]);
    const total = Number(cancellation.total); const cancelled = Number(cancellation.cancelled); const retention = total ? Number((((total - cancelled) / total) * 100).toFixed(1)) : 100;
    return {
      metrics: { existingIncomeRetained: this.percent(movement.opening, movement.current), grossIncomeRetained: this.percent(movement.opening, movement.current), gymRetention: retention, revenueLost: Number(movement.lost_revenue), customerChurn: total ? Number(((cancelled / total) * 100).toFixed(1)) : 0 },
      cohort: cohort.map((row) => ({ month: row.month, m1: Number(row.m1), m2: Number(row.m2), m3: Number(row.m3), m6: Number(row.m6), m12: Number(row.m12) })),
      movement: [{ label: 'Opening', value: Number(movement.opening) }, { label: 'New gyms', value: Number(movement.new_revenue) }, { label: 'Returning', value: Number(movement.returning_revenue) }, { label: 'Lost gyms', value: -Math.abs(Number(movement.lost_revenue)) }, { label: 'Closing', value: Number(movement.current) }],
      adoption: adoption.map((row) => ({ feature: row.feature, available: Number(row.available), active: Number(row.active), used: Number(row.used) })),
      sources: sources.map((row) => ({ source: row.source, gyms: Number(row.gyms), monthlyIncome: Number(row.monthly_income), churn: Number(row.churn) })),
      concentration: concentration.map((row) => ({ group: row.group_name, share: Number(row.share) })),
      currency,
    };
  }

  /**
 * Primary Intent: Executes the getSummary use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getSummary(): Promise<SuperadminAnalyticsSummaryRow> { const [row] = await this.dataSource.query<SuperadminAnalyticsSummaryRow[]>(`SELECT COALESCE(SUM(monthly_revenue) FILTER (WHERE status='ACTIVE'),0)::bigint AS mrr, COUNT(*) FILTER (WHERE status='ACTIVE')::int AS active_tenants, COALESCE(SUM(acquisition_cost_minor),0)::bigint AS acquisition_spend, COUNT(*) FILTER (WHERE acquisition_cost_minor > 0 AND created_at >= CURRENT_DATE-INTERVAL '12 months')::int AS acquisition_tenants FROM tenants WHERE deleted_at IS NULL`); return row ?? { mrr: 0, active_tenants: 0, acquisition_spend: 0, acquisition_tenants: 0 }; }
  /**
 * Primary Intent: Executes the getCancellation use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getCancellation(): Promise<SuperadminAnalyticsCancellationRow> {
    const [row] = await this.dataSource.query<SuperadminAnalyticsCancellationRow[]>(`WITH periods AS (SELECT DATE_TRUNC('month',CURRENT_DATE) current_start, DATE_TRUNC('month',CURRENT_DATE)-INTERVAL '1 month' previous_start, DATE_TRUNC('month',CURRENT_DATE)-INTERVAL '1 day' previous_end), current_period AS (SELECT COUNT(*) FILTER(WHERE t.status='CANCELLED')::int cancelled,COUNT(*)::int total FROM tenants t CROSS JOIN periods p WHERE t.deleted_at IS NULL), previous_period AS (SELECT COUNT(*) FILTER(WHERE t.status='CANCELLED')::int cancelled,COUNT(*)::int total FROM tenants t CROSS JOIN periods p WHERE t.deleted_at IS NULL AND t.updated_at >= p.previous_start AND t.updated_at < p.current_start) SELECT c.cancelled,c.total,p.cancelled previous_cancelled,p.total previous_total FROM current_period c CROSS JOIN previous_period p`);
    return row ?? { cancelled: 0, total: 0, previousCancelled: 0, previousTotal: 0 };
  }
  /**
 * Primary Intent: Executes the getMonthly use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getMonthly(): Promise<SuperadminAnalyticsMonthlyRow[]> { return this.dataSource.query<SuperadminAnalyticsMonthlyRow[]>(`SELECT DATE_TRUNC('month', i.issued_at) month, COALESCE(SUM(i.amount) FILTER(WHERE i.status='PAID'),0)::bigint revenue, COUNT(DISTINCT i.tenant_id) FILTER (WHERE i.status='PAID')::int tenant_count, COUNT(DISTINCT i.tenant_id) FILTER (WHERE i.status IN ('FAILED','OVERDUE'))::int cancelled_count FROM superadmin_saas_invoices i WHERE i.deleted_at IS NULL AND i.issued_at >= CURRENT_DATE-INTERVAL '12 months' GROUP BY 1 ORDER BY 1`); }
  /**
 * Primary Intent: Executes the getPlanRevenue use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getPlanRevenue(): Promise<SuperadminAnalyticsPlanRevenueRow[]> { return this.dataSource.query<SuperadminAnalyticsPlanRevenueRow[]>(`SELECT COALESCE(plan,'UNKNOWN') plan, COALESCE(SUM(monthly_revenue) FILTER (WHERE status='ACTIVE'),0)::bigint revenue, COUNT(*) FILTER (WHERE status='ACTIVE')::int tenant_count FROM tenants WHERE deleted_at IS NULL GROUP BY COALESCE(plan,'UNKNOWN') ORDER BY revenue DESC`); }
  /**
 * Primary Intent: Executes the getCohort use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getCohort(): Promise<SuperadminAnalyticsCohortRow[]> { return this.dataSource.query<SuperadminAnalyticsCohortRow[]>(`WITH cohort AS (SELECT DATE_TRUNC('month',created_at) cohort_month, COALESCE(last_active_at, CASE WHEN status='ACTIVE' THEN CURRENT_TIMESTAMP ELSE updated_at END) observed_at FROM tenants WHERE deleted_at IS NULL) SELECT TO_CHAR(cohort_month,'Mon YYYY') month, COUNT(*)::int total, ROUND(100.0*COUNT(*) FILTER (WHERE observed_at >= cohort_month + INTERVAL '1 month')/COUNT(*),1) m1, ROUND(100.0*COUNT(*) FILTER (WHERE observed_at >= cohort_month + INTERVAL '2 months')/COUNT(*),1) m2, ROUND(100.0*COUNT(*) FILTER (WHERE observed_at >= cohort_month + INTERVAL '3 months')/COUNT(*),1) m3, ROUND(100.0*COUNT(*) FILTER (WHERE observed_at >= cohort_month + INTERVAL '6 months')/COUNT(*),1) m6, ROUND(100.0*COUNT(*) FILTER (WHERE observed_at >= cohort_month + INTERVAL '12 months')/COUNT(*),1) m12 FROM cohort GROUP BY cohort_month ORDER BY cohort_month DESC LIMIT 12`); }
  /**
 * Primary Intent: Executes the getMovement use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getMovement(): Promise<SuperadminAnalyticsMovementRow> { const [row] = await this.dataSource.query<SuperadminAnalyticsMovementRow[]>(`WITH paid AS (SELECT COALESCE(SUM(amount) FILTER(WHERE status='PAID' AND issued_at >= DATE_TRUNC('month',CURRENT_DATE)-INTERVAL '1 month' AND issued_at < DATE_TRUNC('month',CURRENT_DATE)),0)::bigint opening, COALESCE(SUM(amount) FILTER(WHERE status='PAID' AND issued_at >= DATE_TRUNC('month',CURRENT_DATE)),0)::bigint current_revenue, COALESCE(SUM(amount) FILTER(WHERE status='PAID' AND issued_at >= DATE_TRUNC('month',CURRENT_DATE) AND tenant_id IN (SELECT tenant_id FROM superadmin_saas_invoices WHERE deleted_at IS NULL GROUP BY tenant_id HAVING MIN(issued_at) >= DATE_TRUNC('month',CURRENT_DATE))),0)::bigint new_revenue, COALESCE(SUM(amount) FILTER(WHERE status='PAID' AND issued_at >= DATE_TRUNC('month',CURRENT_DATE) AND tenant_id IN (SELECT tenant_id FROM superadmin_saas_invoices WHERE deleted_at IS NULL GROUP BY tenant_id HAVING MAX(issued_at) < DATE_TRUNC('month',CURRENT_DATE))),0)::bigint returning_revenue FROM superadmin_saas_invoices WHERE deleted_at IS NULL), lost AS (SELECT COALESCE(SUM(monthly_revenue) FILTER(WHERE status='CANCELLED' AND updated_at >= DATE_TRUNC('month',CURRENT_DATE)),0)::bigint lost_revenue FROM tenants WHERE deleted_at IS NULL) SELECT paid.opening,paid.current_revenue current,paid.new_revenue,paid.returning_revenue,lost.lost_revenue FROM paid CROSS JOIN lost`); return row ?? { opening: 0, current: 0, new_revenue: 0, returning_revenue: 0, lost_revenue: 0 }; }
  /**
 * Primary Intent: Executes the getAdoption use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getAdoption(): Promise<SuperadminAnalyticsAdoptionRow[]> { return this.dataSource.query<SuperadminAnalyticsAdoptionRow[]>(`SELECT f.name feature, COUNT(t.id)::int available, COUNT(t.id) FILTER (WHERE f.is_global_enabled OR f.enabled_tenant_ids @> jsonb_build_array(t.id))::int active, COUNT(t.id) FILTER (WHERE (t.usage_stats->'featureUsage'->>f.name) ~ '^[1-9][0-9]*$')::int used FROM superadmin_feature_flags f CROSS JOIN tenants t WHERE f.deleted_at IS NULL AND t.deleted_at IS NULL GROUP BY f.name,f.is_global_enabled,f.enabled_tenant_ids ORDER BY f.name`); }
  /**
 * Primary Intent: Executes the getSources use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getSources(): Promise<SuperadminAnalyticsSourceRow[]> { return this.dataSource.query<SuperadminAnalyticsSourceRow[]>(`SELECT COALESCE(acquisition_source,'UNKNOWN') source, COUNT(*)::int gyms, COALESCE(SUM(monthly_revenue) FILTER(WHERE status='ACTIVE'),0)::bigint monthly_income, ROUND(100.0*COUNT(*) FILTER(WHERE status='CANCELLED')/COUNT(*),1)::float churn FROM tenants WHERE deleted_at IS NULL GROUP BY COALESCE(acquisition_source,'UNKNOWN') ORDER BY gyms DESC`); }
  /**
 * Primary Intent: Executes the getConcentration use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async getConcentration(): Promise<SuperadminAnalyticsConcentrationRow[]> { return this.dataSource.query<SuperadminAnalyticsConcentrationRow[]>(`WITH totals AS (SELECT COALESCE(SUM(monthly_revenue) FILTER(WHERE status='ACTIVE'),0)::numeric total FROM tenants WHERE deleted_at IS NULL), top10 AS (SELECT COALESCE(SUM(monthly_revenue),0)::numeric value FROM (SELECT monthly_revenue FROM tenants WHERE deleted_at IS NULL AND status='ACTIVE' ORDER BY monthly_revenue DESC LIMIT 10) x), topplan AS (SELECT COALESCE(MAX(value),0)::numeric value FROM (SELECT SUM(monthly_revenue) value FROM tenants WHERE deleted_at IS NULL AND status='ACTIVE' GROUP BY plan) p), topregion AS (SELECT COALESCE(MAX(value),0)::numeric value FROM (SELECT SUM(monthly_revenue) value FROM tenants WHERE deleted_at IS NULL AND status='ACTIVE' GROUP BY country) r) SELECT 'Top 10 gyms' group_name, CASE WHEN totals.total=0 THEN 0 ELSE ROUND(100*top10.value/totals.total,1) END share FROM totals CROSS JOIN top10 UNION ALL SELECT 'Top plan', CASE WHEN totals.total=0 THEN 0 ELSE ROUND(100*topplan.value/totals.total,1) END FROM totals CROSS JOIN topplan UNION ALL SELECT 'Top region', CASE WHEN totals.total=0 THEN 0 ELSE ROUND(100*topregion.value/totals.total,1) END FROM totals CROSS JOIN topregion`); }
  /**
 * Primary Intent: Executes the percent use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private percent(previous: string | number, current: string | number): number { const denominator = Number(previous); return denominator ? Number(((Number(current) / denominator) * 100).toFixed(1)) : 100; }
  /**
 * Primary Intent: Executes the previousMetric use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private previousMetric(rows: SuperadminAnalyticsMonthlyRow[]): number { return rows.length > 1 ? Number(rows[rows.length - 2]?.revenue ?? 0) : 0; }
}
