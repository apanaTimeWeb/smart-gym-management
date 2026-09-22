// RESPONSIBILITY: Write use-case for POST /api/v1/manager/inquiries.
// FLOW: Controller DTO -> InquiriesCreateInquiryService -> InquiriesOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { InquiriesOrchestratorService } from '@/modules/manager/inquiries/services/inquiries-orchestrator.service';

@Injectable()
export class InquiriesCreateInquiryService {
  constructor(private readonly orchestrator: InquiriesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createInquiry(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createInquiries(data, id);
  }
}
