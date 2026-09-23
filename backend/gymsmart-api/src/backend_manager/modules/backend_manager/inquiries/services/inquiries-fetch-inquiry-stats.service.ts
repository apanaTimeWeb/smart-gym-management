// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { InquiriesRepository } from '@/backend_manager/modules/backend_manager/inquiries/repositories/inquiries-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class InquiriesFetchInquiryStatsService {
  constructor(private readonly repository: InquiriesRepository) {}

  /** @description Loads the inquiries collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchInquiryStats(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findInquiriesList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const count=(value:string)=>rows.filter((row)=>String(row.status ?? '').toUpperCase()===value).length;
    return { total:rows.length, new:count('NEW'), followUp:count('FOLLOW_UP'), converted:count('CONVERTED'), lost:count('LOST') };
  }
}
