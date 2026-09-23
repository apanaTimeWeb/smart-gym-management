// RESPONSIBILITY: Owns the dashboard revenue-chart widget use case.
// FLOW: QueryController -> SuperadminDashboardRevenueChartService -> SuperadminDashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import type { SuperadminDashboardRevenueChartProjection, SuperadminDashboardWidgetQuery } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardRevenueChartService {
  constructor(private readonly repository: SuperadminDashboardRepository, private readonly config: ConfigService) {}

  /** Returns revenue points for the selected dashboard range. */
  async getRevenueChart(query: SuperadminDashboardWidgetQuery = {}): Promise<SuperadminDashboardRevenueChartProjection[]> {
    return this.repository.getDashboardRevenueChart(this.config.get<string>('app.defaultCurrency') ?? 'INR', query);
  }
}
