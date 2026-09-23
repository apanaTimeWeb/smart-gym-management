// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { InquiriesRepository } from '@/backend_manager/modules/backend_manager/inquiries/repositories/inquiries-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class InquiriesFetchInquiryPlansSnapshotService {
  constructor(private readonly repository: InquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchInquiryPlansSnapshot(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findInquiriesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { plans: rows, } as any;
  }
}
