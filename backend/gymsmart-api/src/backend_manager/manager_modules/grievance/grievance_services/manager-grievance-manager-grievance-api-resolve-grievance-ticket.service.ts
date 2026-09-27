// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

import { ManagerGrievanceOrchestratorService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService {
  constructor(private readonly orchestrator: ManagerGrievanceOrchestratorService) {}
  /** @description Resolves the selected grievance record. @param id - Resource UUID. @param data - Validated request payload. @returns Updated domain payload. */
  async updateGrievanceTicket(data: ManagerCoreJsonObject, id?: string): ReturnType<ManagerGrievanceOrchestratorService['updateGrievance']> { if (!id) throw new ManagerCoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.orchestrator.updateGrievance({ ...data, status: 'CLOSED', resolvedAt: new Date().toISOString() }, id); }
}

export { ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService as GrievanceManagerGrievanceApiResolveGrievanceTicketService };
