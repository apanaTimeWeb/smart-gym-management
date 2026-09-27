// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerInquiriesOrchestratorService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerInquiriesUpdateInquiryService {
  constructor(private readonly orchestrator: ManagerInquiriesOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateInquiry(data: ManagerCoreJsonObject, id?: string): ReturnType<ManagerInquiriesOrchestratorService['updateInquiry']> {
    return this.orchestrator.updateInquiry(data, id);
  }
}

export { ManagerInquiriesUpdateInquiryService as InquiriesUpdateInquiryService };
