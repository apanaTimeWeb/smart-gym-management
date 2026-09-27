// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerInquiriesOrchestratorService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerInquiriesConvertLeadServiceConvertLeadResult {
  memberId: string;
}

@Injectable()
export class ManagerInquiriesConvertLeadService {
  constructor(private readonly orchestrator: ManagerInquiriesOrchestratorService) {}

  /** @description Converts an inquiry into a persisted member through one transaction and returns the new member ID. @param data - Validated member creation payload. @param id - Inquiry UUID. @returns The newly created member ID. */
  async convertLead(data: ManagerCoreJsonObject, id?: string): Promise<ManagerInquiriesConvertLeadServiceConvertLeadResult> {
    return this.orchestrator.convertLead(data, id);
  }
}

export { ManagerInquiriesConvertLeadService as InquiriesConvertLeadService };
