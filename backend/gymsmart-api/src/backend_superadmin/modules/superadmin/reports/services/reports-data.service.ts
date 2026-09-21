// RESPONSIBILITY: Produces revenue, cancellation, and tenant-health report arrays from the persisted report dataset.
// FLOW: Controller -> report data service -> reports repository -> typed contract projection.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
import { REPORTS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/reports/reports.constants';

export interface RevenueRow { month: string; mrr: number; newRevenue: number; cancelledRevenue: number; netRevenue: number; tenantCount: number }
export interface CancellationsRecord { id: string; gymName: string; ownerName: string; plan: string; cancelledAt: string; reason: string; mrr: number; daysActive: number }
export interface TenantHealthScore { id: string; gymName: string; plan: string; score: number; grade: string; memberCount: number; lastLogin: string; paymentHealth: string; featureUsage: number; supportTickets: number }

@Injectable()
export class ReportsDataService {
  constructor(private readonly repository: ReportsRepository) {}

  /** Returns revenue rows from the authoritative persisted report dataset. */
  async revenue(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<RevenueRow[]> {
    const data = await this.dataset();
    return this.filterDate(data.revenue as RevenueRow[], query.from, query.to);
  }

  /** Returns cancellation rows from the authoritative persisted report dataset. */
  async cancellations(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<CancellationsRecord[]> {
    const data = await this.dataset();
    return this.filterDate(data.cancellations as CancellationsRecord[], query.from, query.to).filter((item) => !query.plan || item.plan === query.plan);
  }

  /** Returns health rows from the authoritative persisted report dataset. */
  async health(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<TenantHealthScore[]> {
    const data = await this.dataset();
    return (data.health as TenantHealthScore[]).filter((item) => !query.plan || item.plan === query.plan);
  }

  /** Loads and validates the persisted report dataset. */
  private async dataset(): Promise<{ revenue: RevenueRow[]; cancellations: CancellationsRecord[]; health: TenantHealthScore[] }> {
    const payload = await this.repository.findLatestByKind(REPORTS_SNAPSHOT_KINDS.MAIN);
    if (!payload || typeof payload !== 'object') throw new NotFoundException('Report dataset is not provisioned');
    const value = payload as Record<string, unknown>;
    return {
      revenue: Array.isArray(value.revenue) ? value.revenue as RevenueRow[] : [],
      cancellations: Array.isArray(value.cancellations) ? value.cancellations as CancellationsRecord[] : [],
      health: Array.isArray(value.health) ? value.health as TenantHealthScore[] : [],
    };
  }

  /** Applies ISO date filtering to rows with date-bearing fields. */
  private filterDate<T extends { month?: string; cancelledAt?: string }>(rows: T[], from?: string, to?: string): T[] {
    const min = from ? Date.parse(from) : Number.NEGATIVE_INFINITY;
    const max = to ? Date.parse(to) : Number.POSITIVE_INFINITY;
    return rows.filter((row) => {
      const raw = row.cancelledAt ?? row.month;
      if (!raw) return true;
      const timestamp = Date.parse(raw);
      return Number.isNaN(timestamp) || (timestamp >= min && timestamp <= max);
    });
  }
}
