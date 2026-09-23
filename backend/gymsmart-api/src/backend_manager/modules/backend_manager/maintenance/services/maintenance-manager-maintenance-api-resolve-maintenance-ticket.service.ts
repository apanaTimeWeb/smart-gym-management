// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

import { MaintenanceOrchestratorService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService {
  constructor(private readonly orchestrator: MaintenanceOrchestratorService) {}
  /** @description Resolves the selected maintenance record. @param id - Resource UUID. @param data - Validated request payload. @returns Updated domain payload. */
  async resolveMaintenanceTicket(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.orchestrator.updateMaintenanceById({ ...data, status: 'RESOLVED', resolvedAt: new Date().toISOString() }, id); }
}
