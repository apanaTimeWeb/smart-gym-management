// RESPONSIBILITY: Owns the dashboard plan-revenue widget use case.
// FLOW: QueryController -> DashboardRevenueByTierService -> DashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DashboardRepository } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.repository';
import type { DashboardRevenueByTierProjection } from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardRevenueByTierService {
  constructor(private readonly repository: DashboardRepository, private readonly config: ConfigService) {}

  /** Returns authoritative revenue totals grouped by subscription plan. */
  async getRevenueByTier(): Promise<DashboardRevenueByTierProjection[]> {
    return this.repository.getDashboardRevenueByTier(this.config.get<string>('app.defaultCurrency') ?? 'INR');
  }
}
