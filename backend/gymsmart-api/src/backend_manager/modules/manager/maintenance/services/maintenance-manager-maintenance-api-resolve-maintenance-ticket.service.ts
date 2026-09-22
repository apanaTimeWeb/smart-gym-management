// RESPONSIBILITY: One write use-case for POST /api/v1/manager/maintenance/:id/resolve.
// FLOW: Controller DTO -> MaintenanceOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';

import type { CoreJsonObject } from '@/core/types/json-value.types';
import { CoreContextException } from '@/core/exceptions/core-context.exception';
import { MaintenanceOrchestratorService } from '@/modules/manager/maintenance/services/maintenance-orchestrator.service';

@Injectable()
export class MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService {
  constructor(private readonly orchestrator: MaintenanceOrchestratorService) {}
  /** @description Resolves the selected maintenance record. @param id - Resource UUID. @param data - Validated request payload. @returns Updated domain payload. */
  async resolveMaintenanceTicket(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.orchestrator.updateMaintenanceById(data, id); }
}
