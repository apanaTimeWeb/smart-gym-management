// RESPONSIBILITY: Owns the dashboard recent-onboards widget use case.
// FLOW: QueryController -> SuperadminDashboardRecentOnboardsService -> SuperadminDashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import type { SuperadminDashboardRecentOnboardProjection } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardRecentOnboardsService {
  constructor(private readonly repository: SuperadminDashboardRepository, private readonly config: ConfigService) {}

  /** Returns the five newest non-deleted tenants with all UI-required fields. */
  async getRecentOnboards(): Promise<SuperadminDashboardRecentOnboardProjection[]> {
    return this.repository.getDashboardRecentOnboards(this.config.get<string>('app.defaultCurrency') ?? 'INR');
  }
}
