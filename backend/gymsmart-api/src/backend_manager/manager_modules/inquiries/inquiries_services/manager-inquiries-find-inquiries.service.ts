// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerInquiriesRepository } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerInquiriesFindInquiriesServiceFindInquiriesResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerInquiriesFindInquiriesService {
  constructor(private readonly repository: ManagerInquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findInquiries(query: ManagerCoreJsonObject = {}): Promise<ManagerInquiriesFindInquiriesServiceFindInquiriesResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { inquiries: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerInquiriesFindInquiriesService as InquiriesFindInquiriesService };
