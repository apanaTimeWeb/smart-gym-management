// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MaintenanceOrchestratorService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService {
  constructor(private readonly orchestrator: MaintenanceOrchestratorService) {}
  /** @description Creates one maintenance record. @param data - Validated request payload. @returns Created domain payload. */
  async createMaintenanceTicket(data: ManagerCoreJsonObject): ReturnType<MaintenanceOrchestratorService['createMaintenance']> { return this.orchestrator.createMaintenance(data); }
}

export { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService as MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService };
