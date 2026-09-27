// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { SalesRepository } from '@/backend_manager/manager_modules/sales/manager-sales.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerSalesFindSalesOverviewServiceFindSalesOverviewResult {
  monthlyRevenue: unknown[];
}

@Injectable()
export class ManagerSalesFindSalesOverviewService {
  constructor(private readonly repository: SalesRepository) {}

  /** @description Loads the sales collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findSalesOverview(query:ManagerCoreJsonObject={}):Promise<ManagerSalesFindSalesOverviewServiceFindSalesOverviewResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true });
    const grouped=new Map<string,number>();
    for(const row of result.data){ const month=String(row.payload.date ?? row.payload.createdAt ?? '').slice(0,7); if(!month) continue; grouped.set(month,(grouped.get(month)??0)+Number(row.payload.amount ?? row.payload.revenue ?? 0)); }
    const monthlyRevenue=[...grouped.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([month,revenue])=>({month,revenue}));
    return { monthlyRevenue };
  }
}

export { ManagerSalesFindSalesOverviewService as SalesFindSalesOverviewService };
