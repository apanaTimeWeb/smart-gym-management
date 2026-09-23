// RESPONSIBILITY: Produces revenue, cancellation, and tenant-health report arrays from the persisted report dataset.
// FLOW: Controller -> report data service -> reports repository -> typed contract projection.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';

export interface SuperadminRevenueRow { month: string; mrr: number; newRevenue: number; cancelledRevenue: number; netRevenue: number; tenantCount: number }
export interface SuperadminCancellationsRecord { id: string; gymName: string; ownerName: string; plan: string; cancelledAt: string; reason: string; mrr: number; daysActive: number }
export interface SuperadminTenantHealthScore { id: string; gymName: string; plan: string; score: number; grade: string; memberCount: number; lastLogin: string; paymentHealth: string; featureUsage: number; supportTickets: number }

@Injectable()
export class SuperadminReportsDataService {
  constructor(private readonly repository: SuperadminReportsRepository) {}

  /** Returns revenue rows from the authoritative persisted report dataset. */
  async revenue(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<SuperadminRevenueRow[]> {
    const data = await this.repository.getLiveReports(query, 'INR') as { revenue: SuperadminRevenueRow[]; cancellations: SuperadminCancellationsRecord[]; health: SuperadminTenantHealthScore[] };
    return data.revenue as SuperadminRevenueRow[];
  }

  /** Returns cancellation rows from the authoritative persisted report dataset. */
  async cancellations(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<SuperadminCancellationsRecord[]> {
    const data = await this.repository.getLiveReports(query, 'INR') as { revenue: SuperadminRevenueRow[]; cancellations: SuperadminCancellationsRecord[]; health: SuperadminTenantHealthScore[] };
    return data.cancellations as SuperadminCancellationsRecord[];
  }

  /** Returns health rows from the authoritative persisted report dataset. */
  async health(query: { from?: string; to?: string; plan?: string; region?: string } = {}): Promise<SuperadminTenantHealthScore[]> {
    const data = await this.repository.getLiveReports(query, 'INR') as { revenue: SuperadminRevenueRow[]; cancellations: SuperadminCancellationsRecord[]; health: SuperadminTenantHealthScore[] };
    return data.health as SuperadminTenantHealthScore[];
  }

}