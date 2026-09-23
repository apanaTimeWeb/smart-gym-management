// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtRepository } from '@/backend_manager/modules/backend_manager/pt/repositories/pt-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class PtFetchPtDashboardKpisService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPtDashboardKpis(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findPtList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const now=Date.now();
    const today=new Date(now).toISOString().slice(0,10);
    const week=now+7*24*60*60*1000;
    return { totalActiveAssignments:rows.filter((row)=>row.status==='ACTIVE').length, sessionsScheduledToday:rows.filter((row)=>String(row.sessionDate ?? row.date ?? '').slice(0,10)===today).length, packagesExpiringSoon:rows.filter((row)=>{ const value=Date.parse(String(row.endDate ?? '')); return Number.isFinite(value) && value>=now && value<=week; }).length, monthlyPtRevenue:rows.reduce((sum,row)=>sum+Number(row.amountPaid ?? (row as any).revenue ?? 0),0) };
  }
}
