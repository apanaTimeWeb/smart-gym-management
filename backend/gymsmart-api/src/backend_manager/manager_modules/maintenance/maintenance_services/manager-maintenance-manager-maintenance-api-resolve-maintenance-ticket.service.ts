// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

import { MaintenanceOrchestratorService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService {
  constructor(private readonly orchestrator: MaintenanceOrchestratorService) {}
  /** @description Resolves the selected maintenance record. @param id - Resource UUID. @param data - Validated request payload. @returns Updated domain payload. */
  async updateMaintenanceTicket(data: ManagerCoreJsonObject, id?: string): ReturnType<MaintenanceOrchestratorService['updateMaintenance']> { if (!id) throw new ManagerCoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.orchestrator.updateMaintenance({ ...data, status: 'RESOLVED', resolvedAt: new Date().toISOString() }, id); }
}

export { ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService as MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService };
