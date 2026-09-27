// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerInquiriesRepository } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerInquiriesFindInquiryStatsServiceFindInquiryStatsResult {
  total: unknown;
  new: unknown;
  followUp: unknown;
  converted: unknown;
  lost: unknown;
}

@Injectable()
export class ManagerInquiriesFindInquiryStatsService {
  constructor(private readonly repository: ManagerInquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findInquiryStats(query:ManagerCoreJsonObject={}):Promise<ManagerInquiriesFindInquiryStatsServiceFindInquiryStatsResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const count=(value:string)=>rows.filter((row)=>String(row.status ?? '').toUpperCase()===value).length;
    return { total:rows.length, new:count('NEW'), followUp:count('FOLLOW_UP'), converted:count('CONVERTED'), lost:count('LOST') };
  }
}

export { ManagerInquiriesFindInquiryStatsService as InquiriesFindInquiryStatsService };
