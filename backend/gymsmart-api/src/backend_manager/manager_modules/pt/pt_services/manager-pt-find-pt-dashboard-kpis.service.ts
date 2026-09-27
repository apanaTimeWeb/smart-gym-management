// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtRepository } from '@/backend_manager/manager_modules/pt/manager-pt.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerPtFindPtDashboardKpisServiceFindPtDashboardKpisResult {
  currency: string;
  totalActiveAssignments: number;
  sessionsScheduledToday: number;
  packagesExpiringSoon: number;
  monthlyPtRevenue: number;
}

@Injectable()
export class ManagerPtFindPtDashboardKpisService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findPtDashboardKpis(query:ManagerCoreJsonObject={}):Promise<ManagerPtFindPtDashboardKpisServiceFindPtDashboardKpisResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row: any)=>row.payload);
    const now=Date.now();
    const today=new Date(now).toISOString().slice(0,10);
    const week=now+7*24*60*60*1000;
    const currency = typeof rows[0]?.currency === 'string' ? String(rows[0].currency) : 'INR';
    return { currency, totalActiveAssignments:rows.filter((row)=>row.status==='ACTIVE').length, sessionsScheduledToday:rows.filter((row)=>String(row.sessionDate ?? row.date ?? '').slice(0,10)===today).length, packagesExpiringSoon:rows.filter((row)=>{ const value=Date.parse(String(row.endDate ?? '')); return Number.isFinite(value) && value>=now && value<=week; }).length, monthlyPtRevenue:rows.reduce((sum,row)=>sum+Number(row.amountPaid ?? (row).revenue ?? 0),0) };
  }
}

export { ManagerPtFindPtDashboardKpisService as PtFindPtDashboardKpisService };
