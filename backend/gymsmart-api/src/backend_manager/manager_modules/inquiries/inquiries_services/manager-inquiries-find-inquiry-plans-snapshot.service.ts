// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerInquiriesRepository } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type InquiryPlanSnapshotRow = { id: string; [key: string]: unknown };
export type InquiriesPlansSnapshotResult = { plans: InquiryPlanSnapshotRow[] };

@Injectable()
export class ManagerInquiriesFindInquiryPlansSnapshotService {
  constructor(private readonly repository: ManagerInquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findInquiryPlansSnapshot(query: ManagerCoreJsonObject = {}): Promise<InquiriesPlansSnapshotResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { plans: rows, };
  }
}

export { ManagerInquiriesFindInquiryPlansSnapshotService as InquiriesFindInquiryPlansSnapshotService };
