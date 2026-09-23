// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { InquiriesRepository } from '@/backend_manager/modules/backend_manager/inquiries/repositories/inquiries-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class InquiriesFetchInquiryByIdService {
  constructor(private readonly repository: InquiriesRepository) {}

  /** @description Loads one inquiries record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchInquiryById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findInquiriesByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
