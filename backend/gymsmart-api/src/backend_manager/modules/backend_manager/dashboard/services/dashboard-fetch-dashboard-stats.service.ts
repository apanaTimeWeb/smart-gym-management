// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { DashboardRepository } from '@/backend_manager/modules/backend_manager/dashboard/repositories/dashboard-repository';
import { DashboardResponseMapper } from '@/backend_manager/modules/backend_manager/dashboard/mappers/dashboard-response.mapper';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class DashboardFetchDashboardStatsService {
  constructor(private readonly repository: DashboardRepository) {}

  /** @description Loads the complete Manager dashboard snapshot. @param query - Validated dashboard range filters. @returns The frontend-frozen dashboard data shape. */
  async fetchDashboardStats(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findDashboardList({ ...query, __unbounded: true, page: 1, limit: 1 });
    return DashboardResponseMapper.toResponse(result.data[0]?.payload ?? {});
  }
}