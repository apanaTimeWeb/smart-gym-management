// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for reports; no business logic.
// FLOW: reports service -> repository -> authoritative invoice/tenant/support/feature queries.
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { ReportsEntity } from '@/backend_superadmin/modules/superadmin/reports/reports.entity';
import type { ReportsListQuery, ReportsCreateInput, ReportsUpdateInput, ReportsRevenueRow, ReportsCancellationRow, ReportsHealthRow } from '@/backend_superadmin/modules/superadmin/reports/types/reports.interfaces';

@Injectable()
export class ReportsRepository extends BaseRepository<ReportsEntity> {
  constructor(@InjectRepository(ReportsEntity) repository: Repository<ReportsEntity>, transactionContext: TransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext); }

  /** Returns a filtered report snapshot page. */
  async findPage(query: ReportsListQuery): Promise<{ items: ReportsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    if (query.search?.trim()) qb.andWhere('item.kind ILIKE :search', { search: `%${query.search.trim()}%` });
    const sortMap: Record<string, string> = { createdAt: 'item.created_at', updatedAt: 'item.updated_at', kind: 'item.kind' };
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC').skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one report or null. */
  async findById(id: string): Promise<ReportsEntity | null> { return super.findById(id); }
  /** Returns one report or throws. */
  async findByIdOrThrow(id: string): Promise<ReportsEntity> { return super.findByIdOrThrow(id, 'REPORTS.RECORD.NOT_FOUND'); }
  /** Creates and persists report data. */
  async createReports(input: ReportsCreateInput): Promise<ReportsEntity> { return this.activeRepository.save(this.activeRepository.create(input as {})); }
  /** Updates report data by id. */
  async updateReportsById(id: string, input: ReportsUpdateInput): Promise<ReportsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }
  /** Soft-deletes report data. */
  async deleteReportsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Computes revenue/cancellation/health report data from authoritative invoice, tenant, ticket, and feature tables. */
  async getLiveReports(query: { from?: string; to?: string; plan?: string; region?: string } = {}, currency = 'INR'): Promise<unknown> {
    const revenue = await this.getRevenueRows(query);
    const cancellations = await this.getCancellationRows(query);
    const health = await this.getHealthRows(query);
    return { revenue: revenue.map((row) => this.toRevenueResponse(row, currency)), cancellations: cancellations.map((row) => this.toCancellationResponse(row, currency)), health: health.map((row) => this.toHealthResponse(row)), currency };
  }

  /** Computes the complete period/segment comparison contract from live tenant and invoice data. */
  async getLiveComparison(query: { from?: string; to?: string; plan?: string; region?: string; period?: string; segment?: string } = {}, currency = 'INR'): Promise<unknown> {
    const period = this.periodWindow(query.period ?? 'month', query.from, query.to);
    const [metrics, planComparison, regionComparison, comparisonSets] = await Promise.all([this.compareWindow(period.currentStart, period.currentEnd, period.previousStart, period.previousEnd), this.comparePlans(period.currentStart, period.currentEnd, period.previousStart, period.previousEnd), this.compareRegions(period.currentStart, period.currentEnd, period.previousStart, period.previousEnd), this.buildComparisonSets(period)]);
    return { periods: this.periods(), segments: this.segments(), metrics, planComparison, regionComparison, comparisonSets, currency };
  }

  /** Defines period windows while preserving frontend-selected period semantics. */
  private periodWindow(period: string, from?: string, to?: string): { currentStart: string; currentEnd: string; previousStart: string; previousEnd: string } {
    if (from && to) { const start = new Date(from); const end = new Date(to); return { currentStart: start.toISOString(), currentEnd: end.toISOString(), previousStart: new Date(start.getTime() - (end.getTime() - start.getTime())).toISOString(), previousEnd: start.toISOString() }; }
    const end = new Date(); const days = period === 'quarter' ? 92 : period === 'year' ? 365 : 30; const start = new Date(end.getTime() - days * 86_400_000); const previousStart = new Date(start.getTime() - days * 86_400_000); return { currentStart: start.toISOString(), currentEnd: end.toISOString(), previousStart: previousStart.toISOString(), previousEnd: start.toISOString() };
  }

  /** Returns server-provided period choices required by the comparison UI. */
  private periods(): Array<{ key: string; label: string }> { return [{ key: 'month', label: 'Month' }, { key: 'quarter', label: 'Quarter' }, { key: 'year', label: 'Year' }]; }
  /** Returns server-provided segment choices required by the comparison UI. */
  private segments(): Array<{ key: string; label: string }> { return [{ key: 'all', label: 'All' }, { key: 'plan', label: 'Plan' }, { key: 'region', label: 'Region' }, { key: 'franchise', label: 'Franchise' }, { key: 'trial-paid', label: 'Trial vs Paid' }]; }

  /** Compares live revenue and tenant counts across two adjacent periods. */
  private async compareWindow(currentStart: string, currentEnd: string, previousStart: string, previousEnd: string): Promise<Array<{ name: string; current: number; previous: number; change: number }>> {
    const [current, previous] = await Promise.all([this.sumRevenue(currentStart, currentEnd), this.sumRevenue(previousStart, previousEnd)]);
    const rows = [{ name: 'Revenue', current: Number(current?.revenue ?? 0), previous: Number(previous?.revenue ?? 0) }, { name: 'Gyms', current: Number(current?.tenants ?? 0), previous: Number(previous?.tenants ?? 0) }];
    return rows.map((row) => ({ ...row, change: row.previous ? Number((((row.current - row.previous) / row.previous) * 100).toFixed(1)) : 0 }));
  }

  /** Compares revenue and active-tenant counts by subscription plan. */
  private async comparePlans(currentStart: string, currentEnd: string, previousStart: string, previousEnd: string): Promise<Array<{ name: string; income: number; gyms: number }>> {
    const rows = await this.dataSource.query<Array<{ name: string; income: string | number; gyms: string | number }>>(`WITH current AS (SELECT COALESCE(t.plan,'UNKNOWN') name,COALESCE(SUM(i.amount),0)::bigint income,COUNT(DISTINCT i.tenant_id)::int gyms FROM superadmin_saas_invoices i JOIN tenants t ON t.id=i.tenant_id WHERE i.deleted_at IS NULL AND t.deleted_at IS NULL AND i.status='PAID' AND i.issued_at >= $1 AND i.issued_at < $2 GROUP BY COALESCE(t.plan,'UNKNOWN')) SELECT name,income,gyms FROM current ORDER BY income DESC`, [currentStart, currentEnd]);
    return rows.map((row) => ({ name: row.name, income: Number(row.income), gyms: Number(row.gyms) }));
  }

  /** Compares paid revenue grouped by tenant region for the selected and prior period. */
  private async compareRegions(currentStart: string, currentEnd: string, previousStart: string, previousEnd: string): Promise<Array<{ name: string; current: number; previous: number }>> {
    const rows = await this.dataSource.query<Array<{ name: string; current: string | number; previous: string | number }>>(`WITH current AS (SELECT COALESCE(t.state,'UNKNOWN') name,COALESCE(SUM(i.amount),0)::bigint value FROM superadmin_saas_invoices i JOIN tenants t ON t.id=i.tenant_id WHERE i.deleted_at IS NULL AND t.deleted_at IS NULL AND i.status='PAID' AND i.issued_at >= $1 AND i.issued_at < $2 GROUP BY COALESCE(t.state,'UNKNOWN')), previous AS (SELECT COALESCE(t.state,'UNKNOWN') name,COALESCE(SUM(i.amount),0)::bigint value FROM superadmin_saas_invoices i JOIN tenants t ON t.id=i.tenant_id WHERE i.deleted_at IS NULL AND t.deleted_at IS NULL AND i.status='PAID' AND i.issued_at >= $3 AND i.issued_at < $4 GROUP BY COALESCE(t.state,'UNKNOWN')) SELECT COALESCE(c.name,p.name) name,COALESCE(c.value,0) current,COALESCE(p.value,0) previous FROM current c FULL OUTER JOIN previous p ON p.name=c.name ORDER BY current DESC,name`, [currentStart, currentEnd, previousStart, previousEnd]);
    return rows.map((row) => ({ name: row.name, current: Number(row.current), previous: Number(row.previous) }));
  }

  /** Builds every supported period/segment dataset from live database aggregates. */
  private async buildComparisonSets(_base: { currentStart: string; currentEnd: string }): Promise<Array<{ periodKey: string; segmentKey: string; metrics: Array<{ name: string; current: number; previous: number; change: number }> }>> {
    const work = this.periods().flatMap((period) => this.segments().map((segment) => ({ period, segment })));
    return Promise.all(work.map(async ({ period, segment }) => ({ periodKey: period.key, segmentKey: segment.key, metrics: await this.compareSegment(segment.key, this.periodWindow(period.key)) })));
  }

  /** Dispatches one segment query without broad or dynamic SQL selection. */
  private async compareSegment(segment: string, window: { currentStart: string; currentEnd: string; previousStart: string; previousEnd: string }): Promise<Array<{ name: string; current: number; previous: number; change: number }>> {
    if (segment === 'plan') return this.compareGroupedMetric('t.plan', window, 'plan');
    if (segment === 'region') return this.compareGroupedMetric('t.state', window, 'region');
    if (segment === 'franchise') return this.compareGroupedMetric("t.usage_stats->>'franchiseName'", window, 'franchise');
    if (segment === 'trial-paid') return this.compareTrialPaid(window);
    return this.compareWindow(window.currentStart, window.currentEnd, window.previousStart, window.previousEnd);
  }

  /** Compares live paid revenue by one allowlisted tenant grouping expression. */
  private async compareGroupedMetric(expression: string, window: { currentStart: string; currentEnd: string; previousStart: string; previousEnd: string }, label: string): Promise<Array<{ name: string; current: number; previous: number; change: number }>> {
    const rows = await this.dataSource.query<Array<{ name: string; current: string | number; previous: string | number }>>(`WITH current AS (SELECT COALESCE(${expression},'UNKNOWN') name,COALESCE(SUM(i.amount),0)::bigint value FROM superadmin_saas_invoices i JOIN tenants t ON t.id=i.tenant_id WHERE i.deleted_at IS NULL AND t.deleted_at IS NULL AND i.status='PAID' AND i.issued_at >= $1 AND i.issued_at < $2 GROUP BY 1), previous AS (SELECT COALESCE(${expression},'UNKNOWN') name,COALESCE(SUM(i.amount),0)::bigint value FROM superadmin_saas_invoices i JOIN tenants t ON t.id=i.tenant_id WHERE i.deleted_at IS NULL AND t.deleted_at IS NULL AND i.status='PAID' AND i.issued_at >= $3 AND i.issued_at < $4 GROUP BY 1) SELECT COALESCE(c.name,p.name) name,COALESCE(c.value,0) current,COALESCE(p.value,0) previous FROM current c FULL OUTER JOIN previous p ON p.name=c.name ORDER BY current DESC,name`, [window.currentStart, window.currentEnd, window.previousStart, window.previousEnd]);
    return rows.map((row) => ({ name: row.name || label, current: Number(row.current), previous: Number(row.previous), change: this.percentChange(Number(row.previous), Number(row.current)) }));
  }

  /** Compares paid and trial tenant counts for the selected and previous periods. */
  private async compareTrialPaid(window: { currentStart: string; currentEnd: string; previousStart: string; previousEnd: string }): Promise<Array<{ name: string; current: number; previous: number; change: number }>> {
    const rows = await this.dataSource.query<Array<{ name: string; current: string | number; previous: string | number }>>(`WITH paid AS (SELECT $1::timestamptz current_start,$2::timestamptz current_end,$3::timestamptz previous_start,$4::timestamptz previous_end), values AS (SELECT 'Paid gyms' name,COUNT(DISTINCT i.tenant_id) FILTER (WHERE i.issued_at >= current_start AND i.issued_at < current_end)::int current,COUNT(DISTINCT i.tenant_id) FILTER (WHERE i.issued_at >= previous_start AND i.issued_at < previous_end)::int previous FROM superadmin_saas_invoices i CROSS JOIN paid WHERE i.deleted_at IS NULL AND i.status='PAID'), trial AS (SELECT 'Trial gyms' name,COUNT(*) FILTER (WHERE status='TRIAL' AND updated_at >= current_start AND updated_at < current_end)::int current,COUNT(*) FILTER (WHERE status='TRIAL' AND updated_at >= previous_start AND updated_at < previous_end)::int previous FROM tenants t CROSS JOIN paid WHERE t.deleted_at IS NULL) SELECT name,current,previous FROM values UNION ALL SELECT name,current,previous FROM trial ORDER BY name`, [window.currentStart, window.currentEnd, window.previousStart, window.previousEnd]);
    return rows.map((row) => ({ name: row.name, current: Number(row.current), previous: Number(row.previous), change: this.percentChange(Number(row.previous), Number(row.current)) }));
  }

  /** Calculates a percentage change while keeping zero baselines deterministic. */
  private percentChange(previous: number, current: number): number { return previous ? Number((((current - previous) / previous) * 100).toFixed(1)) : current ? 100 : 0; }

  /** Reads monthly revenue for the requested date interval. */
  private async getRevenueRows(query: { from?: string; to?: string }): Promise<ReportsRevenueRow[]> {
    return this.dataSource.query<ReportsRevenueRow[]>(`SELECT DATE_TRUNC('month',issued_at) month,COALESCE(SUM(amount) FILTER(WHERE status='PAID'),0)::bigint mrr,COALESCE(SUM(amount) FILTER(WHERE status='PAID' AND issued_at>=DATE_TRUNC('month',CURRENT_DATE)),0)::bigint new_revenue,COALESCE(SUM(amount) FILTER(WHERE status IN('FAILED','OVERDUE')),0)::bigint cancelled_revenue,COUNT(DISTINCT tenant_id)::int tenant_count FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND issued_at>=COALESCE($1::timestamptz,CURRENT_DATE-INTERVAL '12 months') AND issued_at<=COALESCE($2::timestamptz,CURRENT_TIMESTAMP) GROUP BY 1 ORDER BY 1`, [query.from ?? null, query.to ?? null]);
  }

  /** Reads real cancellation records and optional cancellation reasons stored on tenant metadata. */
  private async getCancellationRows(query: { from?: string; to?: string; plan?: string; region?: string }): Promise<ReportsCancellationRow[]> {
    return this.dataSource.query<ReportsCancellationRow[]>(`SELECT t.id,t.name gym_name,t.owner_name,t.plan,t.updated_at cancelled_at,COALESCE(t.monthly_revenue,0)::bigint mrr,COALESCE(NULLIF(t.usage_stats->>'cancellationReason',''),'UNSPECIFIED') reason,GREATEST(0,EXTRACT(DAY FROM CURRENT_TIMESTAMP-t.created_at))::int days_active FROM tenants t WHERE t.deleted_at IS NULL AND t.status='CANCELLED' AND ($1::text IS NULL OR t.plan=$1) AND ($2::text IS NULL OR t.state=$2) AND ($3::timestamptz IS NULL OR t.updated_at>=$3) AND ($4::timestamptz IS NULL OR t.updated_at<=$4) ORDER BY t.updated_at DESC LIMIT 100`, [query.plan ?? null, query.region ?? null, query.from ?? null, query.to ?? null]);
  }

  /** Computes tenant health from authoritative invoice, feature-flag, and support-ticket state. */
  private async getHealthRows(query: { plan?: string; region?: string }): Promise<ReportsHealthRow[]> {
    return this.dataSource.query<ReportsHealthRow[]>(`SELECT t.id,t.name gym_name,t.plan,CASE WHEN t.status='ACTIVE' THEN 100 ELSE 50 END::int score,CASE WHEN t.status='ACTIVE' THEN 'A' ELSE 'C' END grade,t.member_count,last_login_at last_login,CASE WHEN COALESCE(inv.overdue_count,0)>0 THEN 'OVERDUE' WHEN COALESCE(inv.risk_count,0)>0 THEN 'AT_RISK' ELSE 'GOOD' END payment_health,CASE WHEN COALESCE(ff.total_flags,0)>0 THEN ROUND((COALESCE(ff.enabled_flags,0)::numeric / ff.total_flags::numeric)*100) ELSE 0 END::int feature_usage,COALESCE(tk.open_tickets,0)::int support_tickets FROM tenants t LEFT JOIN (SELECT tenant_id,COUNT(*) FILTER(WHERE status='OVERDUE') overdue_count,COUNT(*) FILTER(WHERE status IN('FAILED','PENDING')) risk_count FROM superadmin_saas_invoices WHERE deleted_at IS NULL GROUP BY tenant_id) inv ON inv.tenant_id=t.id LEFT JOIN (SELECT t2.id tenant_id,COUNT(*)::int total_flags,COUNT(*) FILTER(WHERE f.is_global_enabled OR f.enabled_tenant_ids @> jsonb_build_array(t2.id))::int enabled_flags FROM tenants t2 CROSS JOIN superadmin_feature_flags f WHERE f.deleted_at IS NULL GROUP BY t2.id) ff ON ff.tenant_id=t.id LEFT JOIN (SELECT tenant_id,COUNT(*) FILTER(WHERE status NOT IN('RESOLVED','CLOSED'))::int open_tickets FROM superadmin_support_tickets WHERE deleted_at IS NULL GROUP BY tenant_id) tk ON tk.tenant_id=t.id WHERE t.deleted_at IS NULL AND ($1::text IS NULL OR t.plan=$1) AND ($2::text IS NULL OR t.state=$2) ORDER BY score DESC,t.name`, [query.plan ?? null, query.region ?? null]);
  }

  /** Maps a revenue row to the frontend response contract. */
  private toRevenueResponse(row: ReportsRevenueRow, currency: string): Record<string, number | string> { return { month: new Date(row.month).toISOString().slice(0, 7), mrr: Number(row.mrr), newRevenue: Number(row.new_revenue), cancelledRevenue: Number(row.cancelled_revenue), netRevenue: Number(row.mrr) - Number(row.cancelled_revenue), tenantCount: Number(row.tenant_count), currency }; }
  /** Maps a cancellation row to the frontend response contract. */
  private toCancellationResponse(row: ReportsCancellationRow, currency: string): Record<string, number | string> { return { id: row.id, gymName: row.gym_name, ownerName: row.owner_name, plan: row.plan, cancelledAt: new Date(row.cancelled_at).toISOString(), reason: row.reason, mrr: Number(row.mrr), daysActive: Number(row.days_active), currency }; }
  /** Maps tenant health data to the frontend response contract. */
  private toHealthResponse(row: ReportsHealthRow): Record<string, number | string | null> { return { id: row.id, gymName: row.gym_name, plan: row.plan, score: Number(row.score), grade: row.grade, memberCount: Number(row.member_count), lastLogin: row.last_login ? new Date(row.last_login).toISOString() : null, paymentHealth: row.payment_health, featureUsage: Number(row.feature_usage), supportTickets: Number(row.support_tickets) }; }
  /** Sums paid invoices for a period, keeping comparison data source authoritative. */
  private async sumRevenue(from?: string | null, to?: string | null): Promise<{ revenue: number; tenants: number } | null> { const rows = await this.dataSource.query<Array<{ revenue: string | number; tenants: string | number }>>(`SELECT COALESCE(SUM(amount),0)::bigint revenue,COUNT(DISTINCT tenant_id)::int tenants FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status='PAID' AND ($1::timestamptz IS NULL OR issued_at >= $1) AND ($2::timestamptz IS NULL OR issued_at <= $2)`, [from ?? null, to ?? null]); return rows[0] ? { revenue: Number(rows[0].revenue), tenants: Number(rows[0].tenants) } : null; }
  /** Derives the prior period start from an optional current period. */
  private previousPeriodStart(from?: string | null, to?: string | null): string | null { if (!from || !to) return null; const start = new Date(from); const end = new Date(to); const duration = end.getTime() - start.getTime(); return new Date(start.getTime() - duration).toISOString(); }
}
