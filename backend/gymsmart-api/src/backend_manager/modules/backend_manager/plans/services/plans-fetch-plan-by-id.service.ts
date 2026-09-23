// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansRepository } from '@/backend_manager/modules/backend_manager/plans/repositories/plans-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class PlansFetchPlanByIdService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads one plans record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchPlanById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findPlansByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
