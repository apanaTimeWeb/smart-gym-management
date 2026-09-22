// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/inquiries/:id.
// FLOW: Controller DTO -> InquiriesDeleteInquiryService -> InquiriesOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { InquiriesOrchestratorService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-orchestrator.service';

@Injectable()
export class InquiriesDeleteInquiryService {
  constructor(private readonly orchestrator: InquiriesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteInquiry(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteInquiriesById(id); }
}
