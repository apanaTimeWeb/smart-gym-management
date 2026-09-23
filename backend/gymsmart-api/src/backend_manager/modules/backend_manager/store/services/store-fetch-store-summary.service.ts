// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { StoreRepository } from '@/backend_manager/modules/backend_manager/store/repositories/store-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class StoreFetchStoreSummaryService {
  constructor(private readonly repository: StoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchStoreSummary(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findStoreList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>({ id:row.id, ...row.payload }));
    const lowStockProducts=rows.filter((row)=>typeof (row as any).stock==='number' && (row as any).stock<=Number((row as any).reorderThreshold ?? 5));
    return { totalProducts:rows.length, totalOrders:rows.reduce((sum,row)=>sum+Number((row as any).totalOrders ?? 0),0), totalRevenue:rows.reduce((sum,row)=>sum+Number((row as any).total ?? (row as any).revenue ?? 0),0), lowStockProducts };
  }
}
