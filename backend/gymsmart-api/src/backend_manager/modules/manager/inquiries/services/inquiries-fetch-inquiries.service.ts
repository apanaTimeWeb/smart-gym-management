// RESPONSIBILITY: Read use-case for GET /api/v1/manager/inquiries.
// FLOW: Controller -> InquiriesFetchInquiriesService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { InquiriesRepository } from '@/modules/manager/inquiries/repositories/inquiries-repository';

@Injectable()
export class InquiriesFetchInquiriesService {
  constructor(private readonly repository: InquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchInquiries(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findInquiriesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { inquiries: rows, total: result.meta.total }, meta: result.meta };
  }
}
