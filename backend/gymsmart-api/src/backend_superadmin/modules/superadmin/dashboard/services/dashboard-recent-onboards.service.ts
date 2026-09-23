// RESPONSIBILITY: Owns the dashboard recent-onboards widget use case.
// FLOW: QueryController -> DashboardRecentOnboardsService -> DashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DashboardRepository } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.repository';
import type { DashboardRecentOnboardProjection } from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardRecentOnboardsService {
  constructor(private readonly repository: DashboardRepository, private readonly config: ConfigService) {}

  /** Returns the five newest non-deleted tenants with all UI-required fields. */
  async getRecentOnboards(): Promise<DashboardRecentOnboardProjection[]> {
    return this.repository.getDashboardRecentOnboards(this.config.get<string>('app.defaultCurrency') ?? 'INR');
  }
}
