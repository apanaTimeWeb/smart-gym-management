// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { GrievanceOrchestratorService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class GrievanceManagerGrievanceApiCreateGrievanceTicketService {
  constructor(private readonly orchestrator: GrievanceOrchestratorService) {}
  /** @description Creates one grievance record. @param data - Validated request payload. @returns Created domain payload. */
  async createGrievanceTicket(data: CoreJsonObject): Promise<CoreJsonObject> { return this.orchestrator.createGrievance(data); }
}
