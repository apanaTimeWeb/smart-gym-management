// RESPONSIBILITY: Read use-case for GET /api/v1/manager/inquiries/:id.
// FLOW: Controller -> InquiriesFetchInquiryByIdService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { InquiriesRepository } from '@/modules/manager/inquiries/repositories/inquiries-repository';

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
