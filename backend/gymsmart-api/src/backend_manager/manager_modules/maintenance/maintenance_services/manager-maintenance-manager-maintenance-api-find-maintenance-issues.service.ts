// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MaintenanceRepository } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type MaintenanceIssueRow = { id: string; [key: string]: unknown };
export type MaintenanceIssuesResult = MaintenanceIssueRow[];

@Injectable()
export class ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService {
  constructor(private readonly repository: MaintenanceRepository) {}
  /** @description Lists maintenance records for the Manager scope. @param query - Validated query. @returns Contract-compatible rows. */
  async findMaintenanceIssues(query: ManagerCoreJsonObject = {}): Promise<MaintenanceIssuesResult> {
    const result = await this.repository.findAll(query);
    return result.data.map((row) => ({ id: row.id, ...row.payload }));
  }
}

export { ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService as MaintenanceManagerMaintenanceApiFindMaintenanceIssuesService };
