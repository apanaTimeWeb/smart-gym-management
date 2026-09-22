// RESPONSIBILITY: One write use-case for POST /api/v1/manager/maintenance.
// FLOW: Controller DTO -> MaintenanceOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';

import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MaintenanceOrchestratorService } from '@/modules/manager/maintenance/services/maintenance-orchestrator.service';

@Injectable()
export class MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService {
  constructor(private readonly orchestrator: MaintenanceOrchestratorService) {}
  /** @description Creates one maintenance record. @param data - Validated request payload. @returns Created domain payload. */
  async createGrievanceTicket(data: CoreJsonObject): Promise<CoreJsonObject> { return this.orchestrator.createMaintenance(data); }
}
