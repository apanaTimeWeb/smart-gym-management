// RESPONSIBILITY: One write use-case for POST /api/v1/manager/grievance.
// FLOW: Controller DTO -> GrievanceOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';

import type { CoreJsonObject } from '@/core/types/json-value.types';
import { GrievanceOrchestratorService } from '@/modules/manager/grievance/services/grievance-orchestrator.service';

@Injectable()
export class GrievanceManagerGrievanceApiCreateGrievanceTicketService {
  constructor(private readonly orchestrator: GrievanceOrchestratorService) {}
  /** @description Creates one grievance record. @param data - Validated request payload. @returns Created domain payload. */
  async createGrievanceTicket(data: CoreJsonObject): Promise<CoreJsonObject> { return this.orchestrator.createGrievance(data); }
}
