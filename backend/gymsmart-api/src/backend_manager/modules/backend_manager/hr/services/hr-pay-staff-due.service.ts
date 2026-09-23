// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrOrchestratorService } from '@/backend_manager/modules/backend_manager/hr/services/hr-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class HrPayStaffDueService {
  constructor(private readonly orchestrator: HrOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createStaffDuePayment(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createHr(data);
  }
}
