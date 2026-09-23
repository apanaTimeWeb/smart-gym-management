// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

import { GrievanceOrchestratorService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class GrievanceManagerGrievanceApiResolveGrievanceTicketService {
  constructor(private readonly orchestrator: GrievanceOrchestratorService) {}
  /** @description Resolves the selected grievance record. @param id - Resource UUID. @param data - Validated request payload. @returns Updated domain payload. */
  async resolveGrievanceTicket(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.orchestrator.updateGrievanceById({ ...data, status: 'CLOSED', resolvedAt: new Date().toISOString() }, id); }
}
