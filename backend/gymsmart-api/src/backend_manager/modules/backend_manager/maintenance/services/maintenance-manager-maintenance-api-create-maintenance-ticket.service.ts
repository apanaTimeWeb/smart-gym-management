// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MaintenanceOrchestratorService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService {
  constructor(private readonly orchestrator: MaintenanceOrchestratorService) {}
  /** @description Creates one maintenance record. @param data - Validated request payload. @returns Created domain payload. */
  async createMaintenanceTicket(data: CoreJsonObject): Promise<CoreJsonObject> { return this.orchestrator.createMaintenance(data); }
}
