// RESPONSIBILITY: Read use-case for GET /api/v1/manager/inquiries/plans.
// FLOW: Controller -> InquiriesFetchInquiryPlansService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { InquiriesRepository } from '@/backend_manager/modules/manager/inquiries/repositories/inquiries-repository';

@Injectable()
export class InquiriesFetchInquiryPlansService {
  constructor(private readonly repository: InquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchInquiryPlans(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findInquiriesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
