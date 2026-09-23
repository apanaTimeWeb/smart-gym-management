// RESPONSIBILITY: Owns the dashboard KPI widget use case.
// FLOW: QueryController -> SuperadminDashboardKpisService -> SuperadminDashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import type { SuperadminDashboardKpisProjection, SuperadminDashboardWidgetQuery } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardKpisService {
  constructor(private readonly repository: SuperadminDashboardRepository, private readonly config: ConfigService) {}

  /** Returns the authoritative KPI widget for the selected dashboard range. */
  async getDashboardKpis(query: SuperadminDashboardWidgetQuery = {}): Promise<SuperadminDashboardKpisProjection> {
    return this.repository.getDashboardKpis(this.config.get<string>('app.defaultCurrency') ?? 'INR', query);
  }
}
