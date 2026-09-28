// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerInquiriesRepository } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerInquiriesFindInquiryByIdServiceFindInquiryByIdResult {
  id: unknown;
}

@Injectable()
export class ManagerInquiriesFindInquiryByIdService {
  constructor(private readonly repository: ManagerInquiriesRepository) {}

  /** @description Loads one inquiries record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws ManagerCoreNotFoundException when the record does not exist. */
  async findInquiryById(id: string, query: ManagerCoreJsonObject = {}): Promise<ManagerInquiriesFindInquiryByIdServiceFindInquiryByIdResult> {
    void query;
    const row = await this.repository.findByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}

export { ManagerInquiriesFindInquiryByIdService as InquiriesFindInquiryByIdService };
