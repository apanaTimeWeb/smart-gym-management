// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerStoreRepository } from '@/backend_manager/manager_modules/store/manager-store.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerStoreFindStoreSummaryServiceFindStoreSummaryResult {
  totalProducts: unknown;
  totalOrders: unknown;
  totalRevenue: unknown;
  lowStockProducts: unknown[];
}

@Injectable()
export class ManagerStoreFindStoreSummaryService {
  constructor(private readonly repository: ManagerStoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findStoreSummary(query:ManagerCoreJsonObject={}):Promise<ManagerStoreFindStoreSummaryServiceFindStoreSummaryResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows: Array<{ id: string } & ManagerCoreJsonObject> = result.data.map((row)=>({ id:row.id, ...row.payload }));
    const lowStockProducts=rows.filter((row)=>typeof (row).stock==='number' && (row).stock<=Number((row).reorderThreshold ?? 5));
    return { totalProducts:rows.length, totalOrders:rows.reduce((sum,row)=>sum+Number((row).totalOrders ?? 0),0), totalRevenue:rows.reduce((sum,row)=>sum+Number((row).total ?? (row).revenue ?? 0),0), lowStockProducts };
  }
}

export { ManagerStoreFindStoreSummaryService as StoreFindStoreSummaryService };
