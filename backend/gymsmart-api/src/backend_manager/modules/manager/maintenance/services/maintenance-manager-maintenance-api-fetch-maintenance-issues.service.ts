// RESPONSIBILITY: One read use-case for GET /api/v1/manager/maintenance.
// FLOW: Controller query -> repository query -> ORM-free domain -> response contract.
import { Injectable } from '@nestjs/common';

import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MaintenanceRepository } from '@/modules/manager/maintenance/repositories/maintenance-repository';

@Injectable()
export class MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService {
  constructor(private readonly repository: MaintenanceRepository) {}
  /** @description Lists maintenance records for the Manager scope. @param query - Validated query. @returns Contract-compatible rows. */
  async fetchMaintenanceIssues(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findMaintenanceList(query);
    return result.data.map((row) => ({ id: row.id, ...row.payload })) as unknown as CoreJsonObject;
  }
}
