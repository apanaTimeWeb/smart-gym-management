// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MaintenanceRepository } from '@/backend_manager/modules/backend_manager/maintenance/repositories/maintenance-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService {
  constructor(private readonly repository: MaintenanceRepository) {}
  /** @description Lists maintenance records for the Manager scope. @param query - Validated query. @returns Contract-compatible rows. */
  async fetchMaintenanceIssues(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findMaintenanceList(query);
    return result.data.map((row) => ({ id: row.id, ...row.payload }));
  }
}
