// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerGrievanceOrchestratorService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService {
  constructor(private readonly orchestrator: ManagerGrievanceOrchestratorService) {}
  /** @description Creates one grievance record. @param data - Validated request payload. @returns Created domain payload. */
  async createGrievanceTicket(data: ManagerCoreJsonObject): ReturnType<ManagerGrievanceOrchestratorService['createGrievance']> { return this.orchestrator.createGrievance(data); }
}

export { ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService as GrievanceManagerGrievanceApiCreateGrievanceTicketService };
