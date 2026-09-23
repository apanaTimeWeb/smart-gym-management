// RESPONSIBILITY: Owns the dashboard KPI widget use case.
// FLOW: QueryController -> DashboardKpisService -> DashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import type { DashboardKpisProjection, DashboardWidgetQuery } from '@/backend_superadmin/modules/superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardKpisService {
  constructor(private readonly repository: DashboardRepository, private readonly config: ConfigService) {}

  /** Returns the authoritative KPI widget for the selected dashboard range. */
  async getDashboardKpis(query: DashboardWidgetQuery = {}): Promise<DashboardKpisProjection> {
    return this.repository.getDashboardKpis(this.config.get<string>('app.defaultCurrency') ?? 'INR', query);
  }
}
