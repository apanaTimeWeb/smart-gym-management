// RESPONSIBILITY: Owns the dashboard geography-revenue widget use case.
// FLOW: QueryController -> DashboardRevenueByGeographyService -> DashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DashboardRepository } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.repository';
import type { DashboardRevenueByGeographyProjection } from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardRevenueByGeographyService {
  constructor(private readonly repository: DashboardRepository, private readonly config: ConfigService) {}

  /** Returns authoritative revenue totals grouped by tenant geography. */
  async getRevenueByGeography(): Promise<DashboardRevenueByGeographyProjection[]> {
    return this.repository.getDashboardRevenueByGeography(this.config.get<string>('app.defaultCurrency') ?? 'INR');
  }
}
