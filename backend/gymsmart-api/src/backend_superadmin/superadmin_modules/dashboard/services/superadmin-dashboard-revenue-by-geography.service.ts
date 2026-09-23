// RESPONSIBILITY: Owns the dashboard geography-revenue widget use case.
// FLOW: QueryController -> SuperadminDashboardRevenueByGeographyService -> SuperadminDashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import type { SuperadminDashboardRevenueByGeographyProjection } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardRevenueByGeographyService {
  constructor(private readonly repository: SuperadminDashboardRepository, private readonly config: ConfigService) {}

  /** Returns authoritative revenue totals grouped by tenant geography. */
  async getRevenueByGeography(): Promise<SuperadminDashboardRevenueByGeographyProjection[]> {
    return this.repository.getDashboardRevenueByGeography(this.config.get<string>('app.defaultCurrency') ?? 'INR');
  }
}
