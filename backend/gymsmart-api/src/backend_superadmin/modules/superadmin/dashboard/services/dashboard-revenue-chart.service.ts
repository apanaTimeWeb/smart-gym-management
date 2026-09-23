// RESPONSIBILITY: Owns the dashboard revenue-chart widget use case.
// FLOW: QueryController -> DashboardRevenueChartService -> DashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import type { DashboardRevenueChartProjection, DashboardWidgetQuery } from '@/backend_superadmin/modules/superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardRevenueChartService {
  constructor(private readonly repository: DashboardRepository, private readonly config: ConfigService) {}

  /** Returns revenue points for the selected dashboard range. */
  async getRevenueChart(query: DashboardWidgetQuery = {}): Promise<DashboardRevenueChartProjection[]> {
    return this.repository.getDashboardRevenueChart(this.config.get<string>('app.defaultCurrency') ?? 'INR', query);
  }
}
