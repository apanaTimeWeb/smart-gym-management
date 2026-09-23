// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { InquiriesOrchestratorService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class InquiriesDeleteInquiryService {
  constructor(private readonly orchestrator: InquiriesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteInquiry(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteInquiriesById(id); }
}
