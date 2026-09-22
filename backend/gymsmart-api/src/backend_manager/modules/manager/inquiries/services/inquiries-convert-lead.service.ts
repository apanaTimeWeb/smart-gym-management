// RESPONSIBILITY: Write use-case for POST /api/v1/manager/inquiries/:id/convert.
// FLOW: Controller DTO -> InquiriesConvertLeadService -> InquiriesOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { InquiriesOrchestratorService } from '@/modules/manager/inquiries/services/inquiries-orchestrator.service';

@Injectable()
export class InquiriesConvertLeadService {
  constructor(private readonly orchestrator: InquiriesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async convertLead(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return { memberId: id ?? '', ...(await this.orchestrator.updateInquiriesById(data, id)) };
  }
}
