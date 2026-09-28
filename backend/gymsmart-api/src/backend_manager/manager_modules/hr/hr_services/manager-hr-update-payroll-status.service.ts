// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrOrchestratorService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerHrUpdatePayrollStatusService {
  constructor(private readonly orchestrator: HrOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updatePayrollStatus(data: ManagerCoreJsonObject, id?: string): ReturnType<HrOrchestratorService['updatePayrollStatus']> {
    return this.orchestrator.updatePayrollStatus(data, id);
  }
}

export { ManagerHrUpdatePayrollStatusService as HrUpdatePayrollStatusService };
