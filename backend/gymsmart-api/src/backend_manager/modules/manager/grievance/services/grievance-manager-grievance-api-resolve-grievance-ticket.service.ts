// RESPONSIBILITY: One write use-case for POST /api/v1/manager/grievance/:id/resolve.
// FLOW: Controller DTO -> GrievanceOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';

import type { CoreJsonObject } from '@/core/types/json-value.types';
import { CoreContextException } from '@/core/exceptions/core-context.exception';
import { GrievanceOrchestratorService } from '@/modules/manager/grievance/services/grievance-orchestrator.service';

@Injectable()
export class GrievanceManagerGrievanceApiResolveGrievanceTicketService {
  constructor(private readonly orchestrator: GrievanceOrchestratorService) {}
  /** @description Resolves the selected grievance record. @param id - Resource UUID. @param data - Validated request payload. @returns Updated domain payload. */
  async resolveGrievanceTicket(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.orchestrator.updateGrievanceById(data, id); }
}
