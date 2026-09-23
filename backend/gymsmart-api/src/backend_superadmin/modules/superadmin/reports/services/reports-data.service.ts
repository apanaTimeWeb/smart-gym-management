// RESPONSIBILITY: Produces revenue, cancellation, and tenant-health report arrays from the persisted report dataset.
// FLOW: Controller -> report data service -> reports repository -> typed contract projection.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.repository';

export interface RevenueRow { month: string; mrr: number; newRevenue: number; cancelledRevenue: number; netRevenue: number; tenantCount: number }
export interface CancellationsRecord { id: string; gymName: string; ownerName: string; plan: string; cancelledAt: string; reason: string; mrr: number; daysActive: number }
export interface TenantHealthScore { id: string; gymName: string; plan: string; score: number; grade: string; memberCount: number; lastLogin: string; paymentHealth: string; featureUsage: number; supportTickets: number }

@Injectable()
export class ReportsDataService {
  constructor(private readonly repository: ReportsRepository) {}

  /** Returns revenue rows from the authoritative persisted report dataset. */
  async revenue(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<RevenueRow[]> {
    const data = await this.repository.getLiveReports(query, 'INR') as { revenue: RevenueRow[]; cancellations: CancellationsRecord[]; health: TenantHealthScore[] };
    return data.revenue as RevenueRow[];
  }

  /** Returns cancellation rows from the authoritative persisted report dataset. */
  async cancellations(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<CancellationsRecord[]> {
    const data = await this.repository.getLiveReports(query, 'INR') as { revenue: RevenueRow[]; cancellations: CancellationsRecord[]; health: TenantHealthScore[] };
    return data.cancellations as CancellationsRecord[];
  }

  /** Returns health rows from the authoritative persisted report dataset. */
  async health(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<TenantHealthScore[]> {
    const data = await this.repository.getLiveReports(query, 'INR') as { revenue: RevenueRow[]; cancellations: CancellationsRecord[]; health: TenantHealthScore[] };
    return data.health as TenantHealthScore[];
  }

}