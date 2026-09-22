// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/dashboard/stats.
// FLOW: Controller -> DashboardFetchDashboardStatsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { DashboardRepository } from '@/backend_manager/modules/manager/dashboard/repositories/dashboard-repository';

@Injectable()
export class DashboardFetchDashboardStatsService {
  constructor(private readonly repository: DashboardRepository) {}

  /** @description Loads the dashboard collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchDashboardStats(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findDashboardList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { memberGrowth: rows,  }, meta: result.meta };
  }
}
