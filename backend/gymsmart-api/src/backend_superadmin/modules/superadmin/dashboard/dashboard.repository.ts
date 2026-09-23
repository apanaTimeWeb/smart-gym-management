// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for dashboard; no business logic.
// FLOW: Dashboard service -> repository -> TypeORM entity queries or parameterized widget queries.
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { DashboardEntity } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.entity';
import type {
  DashboardBusinessOverviewRow,
  DashboardCreateInput,
  DashboardGrowthChartProjection,
  DashboardKpisProjection,
  DashboardListQuery,
  DashboardRecentOnboardProjection,
  DashboardRevenueByGeographyProjection,
  DashboardRevenueByTierProjection,
  DashboardRevenueChartProjection,
  DashboardUpdateInput,
  DashboardWidgetQuery,
} from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';

interface DashboardKpiRow {
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

interface DashboardHealthRow {
  open_critical: string | number;
}

interface DashboardRevenueChartRow { month_start: string | Date; revenue: string | number; }
interface DashboardGrowthChartRow { month_start: string | Date; gyms: string | number; }
interface DashboardTierRow { plan: string; amount: string | number; tenant_count: string | number; }
interface DashboardGeoRow { region: string; revenue: string | number; }
interface DashboardOnboardRow {
  id: string; name: string; owner_name: string; admin_email: string; phone: string; status: string; plan: string;
  created_at: string | Date; member_count: string | number; monthly_revenue: string | number; database_version: string;
  city: string | null; state: string | null; country: string | null; gstin: string | null;
  trial_ends_at: string | Date | null; last_login_at: string | Date | null; last_active_at: string | Date | null; staff_count: string | number;
}

@Injectable()
export class DashboardRepository extends BaseRepository<DashboardEntity> {
  constructor(
    @InjectRepository(DashboardEntity) repository: Repository<DashboardEntity>,
    transactionContext: TransactionContext,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active dashboard records. */
  async findPage(query: DashboardListQuery): Promise<{ items: DashboardEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    if (query.search?.trim()) qb.andWhere('item.kind ILIKE :search', { search: `%${query.search.trim()}%` });
    const sortMap: Record<string, string> = { createdAt: 'item.created_at', updatedAt: 'item.updated_at', kind: 'item.kind' };
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<DashboardEntity | null> { return super.findById(id); }
  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<DashboardEntity> { return super.findByIdOrThrow(id, 'DASHBOARD.RECORD.NOT_FOUND'); }
  /** Creates and persists a dashboard record. */
  async createDashboard(input: DashboardCreateInput): Promise<DashboardEntity> { return this.activeRepository.save(this.activeRepository.create(input as object)); }
  /** Updates a dashboard record through a named repository mutation. */
  async updateDashboardById(id: string, input: DashboardUpdateInput): Promise<DashboardEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }
  /** Soft-deletes a dashboard record. */
  async deleteDashboardById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Returns KPI metrics from authoritative tenant, invoice, and support-ticket state. */
  async getDashboardKpis(currency: string, query: DashboardWidgetQuery): Promise<DashboardKpisProjection> {
    const range = this.resolveRange(query);
    const [row, health] = await Promise.all([this.queryKpis(range), this.queryHealth()]);
    return this.mapKpis(row, health, currency);
  }

  /** Returns monthly paid-revenue points bounded by the selected dashboard date range. */
  async getDashboardRevenueChart(currency: string, query: DashboardWidgetQuery): Promise<DashboardRevenueChartProjection[]> {
    const { start, end } = this.resolveRange(query);
    const rows = await this.dataSource.query<DashboardRevenueChartRow[]>(`SELECT DATE_TRUNC('month', issued_at) AS month_start, COALESCE(SUM(amount) FILTER (WHERE status='PAID'),0)::bigint AS revenue FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND issued_at >= $1 AND issued_at < $2 GROUP BY 1 ORDER BY 1 ASC`, [start, end]);
    return rows.map((row) => ({ month: new Date(row.month_start).toISOString().slice(0, 7), mrr: Number(row.revenue), currency }));
  }

  /** Returns monthly new-tenant counts bounded by the selected dashboard date range. */
  async getDashboardGrowthChart(query: DashboardWidgetQuery): Promise<DashboardGrowthChartProjection[]> {
    const { start, end } = this.resolveRange(query);
    const rows = await this.dataSource.query<DashboardGrowthChartRow[]>(`SELECT DATE_TRUNC('month', created_at) AS month_start, COUNT(*)::int AS gyms FROM tenants WHERE deleted_at IS NULL AND created_at >= $1 AND created_at < $2 GROUP BY 1 ORDER BY 1 ASC`, [start, end]);
    return rows.map((row) => ({ month: new Date(row.month_start).toISOString().slice(0, 7), gyms: Number(row.gyms) }));
  }

  /** Returns revenue grouped by current subscription plan. */
  async getDashboardRevenueByTier(currency: string): Promise<DashboardRevenueByTierProjection[]> {
    const rows = await this.dataSource.query<DashboardTierRow[]>(`SELECT COALESCE(plan,'UNKNOWN') AS plan, COALESCE(SUM(monthly_revenue),0)::bigint AS amount, COUNT(*)::int AS tenant_count FROM tenants WHERE deleted_at IS NULL GROUP BY COALESCE(plan,'UNKNOWN') ORDER BY amount DESC`);
    return rows.map((row) => ({ plan: row.plan, amount: Number(row.amount), currency, tenantCount: Number(row.tenant_count) }));
  }

  /** Returns revenue grouped by tenant country. */
  async getDashboardRevenueByGeography(currency: string): Promise<DashboardRevenueByGeographyProjection[]> {
    const rows = await this.dataSource.query<DashboardGeoRow[]>(`SELECT COALESCE(country,'UNKNOWN') AS region, COALESCE(SUM(monthly_revenue),0)::bigint AS revenue FROM tenants WHERE deleted_at IS NULL GROUP BY COALESCE(country,'UNKNOWN') ORDER BY revenue DESC`);
    return rows.map((row) => ({ region: row.region, revenue: Number(row.revenue), currency }));
  }

  /** Returns all UI-required fields for the five newest non-deleted tenants. */
  async getDashboardRecentOnboards(currency: string): Promise<DashboardRecentOnboardProjection[]> {
    const rows = await this.dataSource.query<DashboardOnboardRow[]>(`SELECT id,name,owner_name,admin_email,phone,status,plan,created_at,member_count,monthly_revenue,database_version,city,state,country,gstin,trial_ends_at,last_login_at,last_active_at,staff_count FROM tenants WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT 5`);
    return rows.map((row) => this.mapOnboard(row, currency));
  }

  /** Computes retention, movement, alerts, leaderboard, and waterfall from authoritative tenant/invoice/support state. */
  async getLiveBusinessOverview(currency = 'INR', _input: Record<string, unknown> = {}): Promise<unknown> {
    const [row] = await this.dataSource.query<Array<Record<string, string | number>>>(`WITH bounds AS (SELECT date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' AS month_start), tenant_revenue AS (SELECT t.id,t.name,t.plan,t.status,COALESCE(SUM(i.amount) FILTER (WHERE i.status='PAID' AND i.issued_at >= b.month_start AND i.issued_at < CURRENT_TIMESTAMP),0)::bigint current_income,COALESCE(SUM(i.amount) FILTER (WHERE i.status='PAID' AND i.issued_at >= b.month_start-INTERVAL '1 month' AND i.issued_at < b.month_start),0)::bigint previous_income,EXISTS(SELECT 1 FROM superadmin_saas_invoices h WHERE h.tenant_id=t.id AND h.deleted_at IS NULL AND h.status='PAID' AND h.issued_at < b.month_start-INTERVAL '1 month') AS had_history FROM tenants t CROSS JOIN bounds b LEFT JOIN superadmin_saas_invoices i ON i.tenant_id=t.id AND i.deleted_at IS NULL WHERE t.deleted_at IS NULL GROUP BY t.id,t.name,t.plan,t.status,b.month_start), classified AS (SELECT *,CASE WHEN current_income>0 AND previous_income=0 AND NOT had_history THEN 'NEW' WHEN current_income>0 AND previous_income=0 AND had_history THEN 'RETURNING' WHEN current_income>previous_income AND previous_income>0 THEN 'GROWTH' WHEN current_income>0 AND current_income<previous_income THEN 'REDUCED' WHEN current_income=0 AND previous_income>0 THEN 'LOST' ELSE 'FLAT' END movement FROM tenant_revenue), totals AS (SELECT COALESCE(SUM(previous_income),0)::bigint opening_income,COALESCE(SUM(current_income) FILTER(WHERE movement='NEW'),0)::bigint new_income,COALESCE(SUM(current_income-previous_income) FILTER(WHERE movement='GROWTH'),0)::bigint growth_income,COALESCE(SUM(current_income) FILTER(WHERE movement='RETURNING'),0)::bigint returning_income,COALESCE(SUM(current_income-previous_income) FILTER(WHERE movement='REDUCED'),0)::bigint reduced_income,COALESCE(SUM(-previous_income) FILTER(WHERE movement='LOST'),0)::bigint lost_income,COALESCE(SUM(current_income),0)::bigint ending_income,COUNT(*) FILTER(WHERE previous_income>0)::int opening_gyms,COUNT(*) FILTER(WHERE previous_income>0 AND current_income>0)::int retained_gyms,COUNT(*) FILTER(WHERE previous_income>0 AND status='CANCELLED')::int churned_gyms,COALESCE(SUM(LEAST(current_income,previous_income)) FILTER(WHERE previous_income>0),0)::bigint retained_income FROM classified) SELECT * FROM totals`, []);
    const opening = Number(row?.opening_income ?? 0); const ending = Number(row?.ending_income ?? 0); const churned = Number(row?.churned_gyms ?? 0); const openingGyms = Number(row?.opening_gyms ?? 0); const lostIncome = Number(row?.lost_income ?? 0);
    const [alerts, leaderboard] = await Promise.all([this.queryBusinessAlerts(), this.queryBusinessLeaderboard()]);
    const growthIncome = Number(row?.growth_income ?? 0); const reducedIncome = Number(row?.reduced_income ?? 0); const returningIncome = Number(row?.returning_income ?? 0); const newIncome = Number(row?.new_income ?? 0);
    return { openingIncome: opening, newIncome, growthIncome, returningIncome, reducedIncome, lostIncome, endingIncome: ending, existingIncomeRetained: opening ? Number(((Number(row?.retained_income ?? 0) / opening) * 100).toFixed(1)) : 100, gymRetention: openingGyms ? Number(((Number(row?.retained_gyms ?? 0) / openingGyms) * 100).toFixed(1)) : 100, revenueLostPercent: opening ? Number(((Math.abs(lostIncome) / opening) * 100).toFixed(1)) : 0, customerChurn: openingGyms ? Number(((churned / openingGyms) * 100).toFixed(1)) : 0, alerts, leaderboard, waterfall: [{ label: 'Opening', value: opening }, { label: 'New gyms', value: newIncome }, { label: 'Upgrades', value: growthIncome }, { label: 'Returning', value: returningIncome }, { label: 'Downgrades', value: reducedIncome }, { label: 'Lost gyms', value: lostIncome }, { label: 'Closing', value: ending }], currency };
  }

  /** Returns live critical platform alerts from overdue invoices, expiring trials, and urgent support tickets. */
  private async queryBusinessAlerts(): Promise<Array<{ id: string; level: string; title: string; detail: string; count: number }>> {
    const rows = await this.dataSource.query<Array<{ id: string; level: string; title: string; detail: string; count: string | number }>>(`SELECT 'overdue-invoices' AS id,'CRITICAL' AS level,'Overdue invoices' AS title,'Invoices requiring payment recovery.' AS detail,COUNT(*)::int AS count FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status='OVERDUE' UNION ALL SELECT 'expiring-trials','WARNING','Trials expiring soon','Trial tenants ending within seven days.',COUNT(*)::int FROM tenants WHERE deleted_at IS NULL AND status='TRIAL' AND trial_ends_at >= CURRENT_TIMESTAMP AND trial_ends_at < CURRENT_TIMESTAMP+INTERVAL '7 days' UNION ALL SELECT 'critical-support','CRITICAL','Critical support tickets','Urgent or critical tickets awaiting resolution.',COUNT(*)::int FROM superadmin_support_tickets WHERE deleted_at IS NULL AND priority IN ('URGENT','CRITICAL') AND status IN ('OPEN','INPROGRESS','WAITING') ORDER BY count DESC,id`);
    return rows.filter((row) => Number(row.count) > 0).map((row) => ({ id: row.id, level: row.level, title: row.title, detail: row.detail, count: Number(row.count) }));
  }

  /** Returns top tenants by current paid revenue with live month-over-month growth and health. */
  private async queryBusinessLeaderboard(): Promise<Array<{ name: string; plan: string; income: number; growth: number; health: number }>> {
    const rows = await this.dataSource.query<Array<{ name: string; plan: string; current_income: string | number; previous_income: string | number; health: string | number }>>(`SELECT t.name,t.plan,COALESCE(SUM(i.amount) FILTER (WHERE i.status='PAID' AND i.issued_at >= date_trunc('month',CURRENT_TIMESTAMP AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'),0)::bigint AS current_income,COALESCE(SUM(i.amount) FILTER (WHERE i.status='PAID' AND i.issued_at >= (date_trunc('month',CURRENT_TIMESTAMP AT TIME ZONE 'UTC') AT TIME ZONE 'UTC')-INTERVAL '1 month' AND i.issued_at < date_trunc('month',CURRENT_TIMESTAMP AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'),0)::bigint AS previous_income,CASE WHEN t.status='ACTIVE' AND NOT EXISTS(SELECT 1 FROM superadmin_saas_invoices o WHERE o.tenant_id=t.id AND o.deleted_at IS NULL AND o.status='OVERDUE') THEN 100 WHEN t.status='ACTIVE' THEN 75 ELSE 50 END::int AS health FROM tenants t LEFT JOIN superadmin_saas_invoices i ON i.tenant_id=t.id AND i.deleted_at IS NULL WHERE t.deleted_at IS NULL GROUP BY t.id,t.name,t.plan,t.status ORDER BY current_income DESC,t.name ASC LIMIT 5`);
    return rows.map((row) => ({ name: row.name, plan: row.plan, income: Number(row.current_income), growth: this.percentChange(Number(row.previous_income), Number(row.current_income)), health: Number(row.health) }));
  }

  /** Queries KPI aggregates for the selected date window. */
  private async queryKpis(range: { start: string; end: string }): Promise<DashboardKpiRow> {
    const [row] = await this.dataSource.query<DashboardKpiRow[]>(`SELECT COUNT(*)::int AS total_gyms, COUNT(*) FILTER (WHERE status='ACTIVE')::int AS active_gyms, COUNT(*) FILTER (WHERE status='SUSPENDED')::int AS suspended_gyms, COUNT(*) FILTER (WHERE status='TRIAL')::int AS trial_gyms, COALESCE(SUM(member_count),0)::int AS total_end_users, COALESCE(SUM(monthly_revenue),0)::bigint AS mrr, COUNT(*) FILTER (WHERE trial_ends_at >= NOW() AND trial_ends_at < NOW()+INTERVAL '7 days' AND deleted_at IS NULL)::int AS trials_expiring, (SELECT COUNT(*) FROM superadmin_support_tickets WHERE deleted_at IS NULL AND status IN ('OPEN','INPROGRESS','WAITING'))::int AS open_tickets, (SELECT COUNT(*) FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status IN ('OVERDUE','FAILED'))::int AS overdue_count, COALESCE((SELECT SUM(amount) FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status IN ('PENDING','OVERDUE','FAILED')),0)::bigint AS pending_revenue, COALESCE((SELECT SUM(amount) FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status='PAID' AND issued_at >= $1 AND issued_at < $2),0)::bigint AS current_revenue, COALESCE((SELECT SUM(amount) FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status='PAID' AND issued_at >= ($1::timestamptz-INTERVAL '1 month') AND issued_at < $1),0)::bigint AS previous_revenue, COALESCE((SELECT SUM(amount) FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status='PAID' AND issued_at >= ($2::timestamptz-INTERVAL '12 months') AND issued_at < $2),0)::bigint AS current_arr, COALESCE((SELECT SUM(amount) FROM superadmin_saas_invoices WHERE deleted_at IS NULL AND status='PAID' AND issued_at >= ($1::timestamptz-INTERVAL '24 months') AND issued_at < ($1::timestamptz-INTERVAL '12 months')),0)::bigint AS previous_arr FROM tenants WHERE deleted_at IS NULL`, [range.start, range.end]);
    return row ?? { total_gyms: 0, active_gyms: 0, suspended_gyms: 0, trial_gyms: 0, total_end_users: 0, mrr: 0, overdue_count: 0, pending_revenue: 0, current_revenue: 0, previous_revenue: 0, current_arr: 0, previous_arr: 0, trials_expiring: 0 };
  }

  /** Queries current open critical support-ticket count for the health widget. */
  private async queryHealth(): Promise<DashboardHealthRow> {
    const [row] = await this.dataSource.query<DashboardHealthRow[]>(`SELECT COUNT(*)::int AS open_critical FROM superadmin_support_tickets WHERE deleted_at IS NULL AND priority IN ('URGENT','CRITICAL') AND status IN ('OPEN','INPROGRESS','WAITING')`);
    return row ?? { open_critical: 0 };
  }

  /** Maps raw KPI rows into the typed dashboard widget contract. */
  private mapKpis(row: DashboardKpiRow, health: DashboardHealthRow, currency: string): DashboardKpisProjection {
    const totalGyms = Number(row.total_gyms); const activeGyms = Number(row.active_gyms); const overdue = Number(row.overdue_count); const currentRevenue = Number(row.current_revenue); const previousRevenue = Number(row.previous_revenue); const currentArr = Number(row.current_arr); const previousArr = Number(row.previous_arr); const openCritical = Number(health.open_critical);
    const activeRatio = totalGyms ? activeGyms / totalGyms : 0; const overdueRatio = totalGyms ? Math.min(overdue / totalGyms, 1) : 0; const criticalRatio = totalGyms ? Math.min(openCritical / totalGyms, 1) : 0;
    const platformHealthScore = totalGyms ? Math.round(activeRatio * 50 + (1 - overdueRatio) * 30 + (1 - criticalRatio) * 20) : 0;
    return { currency, totalGyms, activeGyms, suspendedGyms: Number(row.suspended_gyms), trialGyms: Number(row.trial_gyms), totalEndUsers: Number(row.total_end_users), monthlyRecurringRevenue: Number(row.mrr), overdueInvoicesCount: overdue, pendingRevenue: Number(row.pending_revenue), trialsExpiringIn7Days: Math.max(0, Number(row.trials_expiring)), mrrDeltaPercent: previousRevenue ? Number((((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(2)) : 0, arrDeltaPercent: previousArr ? Number((((currentArr - previousArr) / previousArr) * 100).toFixed(2)) : 0, arpu: activeGyms ? Math.round(Number(row.mrr) / activeGyms) : 0, platformHealthScore };
  }

  /** Maps a tenant row into the full frontend dashboard tenant shape. */
  private mapOnboard(row: DashboardOnboardRow, currency: string): DashboardRecentOnboardProjection {
    return { id: row.id, name: row.name, ownerName: row.owner_name, adminEmail: row.admin_email, phone: row.phone, status: row.status, plan: row.plan, createdAt: new Date(row.created_at).toISOString(), memberCount: Number(row.member_count), monthlyRevenue: Number(row.monthly_revenue), databaseVersion: row.database_version, city: row.city ?? undefined, state: row.state ?? undefined, country: row.country ?? undefined, gstin: row.gstin ?? undefined, trialEndsAt: row.trial_ends_at ? new Date(row.trial_ends_at).toISOString() : undefined, lastLoginAt: row.last_login_at ? new Date(row.last_login_at).toISOString() : undefined, lastActiveAt: row.last_active_at ? new Date(row.last_active_at).toISOString() : null, staffCount: Number(row.staff_count), currency };
  }

  /** Resolves a validated dashboard date window without interpolating request values into SQL. */
  private resolveRange(query: DashboardWidgetQuery): { start: string; end: string } {
    if (query.range === 'custom' && query.startDate && query.endDate) return { start: new Date(query.startDate).toISOString(), end: new Date(query.endDate).toISOString() };
    const now = new Date(); const end = now.toISOString(); const days = query.range === 'daily' ? 1 : query.range === 'weekly' ? 7 : query.range === 'last_3_months' ? 92 : query.range === 'last_6_months' ? 184 : query.range === 'yearly' || query.range === 'this_year' ? 366 : 31;
    const start = new Date(now.getTime() - days * 86_400_000).toISOString();
    return { start, end };
  }
  /** Calculates month-over-month change for dashboard leaderboard metrics. */
  private percentChange(previous: number, current: number): number { return previous ? Number((((current - previous) / previous) * 100).toFixed(1)) : current ? 100 : 0; }

}
