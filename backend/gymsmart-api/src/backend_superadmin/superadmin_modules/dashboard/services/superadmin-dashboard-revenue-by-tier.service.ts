// RESPONSIBILITY: Owns the dashboard plan-revenue widget use case.
// FLOW: QueryController -> SuperadminDashboardRevenueByTierService -> SuperadminDashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import type { SuperadminDashboardRevenueByTierProjection } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardRevenueByTierService {
  constructor(private readonly repository: SuperadminDashboardRepository, private readonly config: ConfigService) {}

  /** Returns authoritative revenue totals grouped by subscription plan. */
  async getRevenueByTier(): Promise<SuperadminDashboardRevenueByTierProjection[]> {
    return this.repository.getDashboardRevenueByTier(this.config.get<string>('app.defaultCurrency') ?? 'INR');
  }
}
