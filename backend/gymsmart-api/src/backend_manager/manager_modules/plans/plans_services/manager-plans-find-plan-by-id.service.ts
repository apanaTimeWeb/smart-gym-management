// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansRepository } from '@/backend_manager/manager_modules/plans/manager-plans.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerPlansFindPlanByIdServiceFindPlanByIdResult {
  id: unknown;
}

@Injectable()
export class ManagerPlansFindPlanByIdService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads one plans record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws ManagerCoreNotFoundException when the record does not exist. */
  async findPlanById(id: string, query: ManagerCoreJsonObject = {}): Promise<ManagerPlansFindPlanByIdServiceFindPlanByIdResult> {
    void query;
    const row = await this.repository.findByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}

export { ManagerPlansFindPlanByIdService as PlansFindPlanByIdService };
