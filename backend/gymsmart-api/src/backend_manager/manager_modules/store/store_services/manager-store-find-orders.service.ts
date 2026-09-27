// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerStoreRepository } from '@/backend_manager/manager_modules/store/manager-store.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerStoreFindOrdersServiceFindOrdersResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerStoreFindOrdersService {
  constructor(private readonly repository: ManagerStoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findOrders(query: ManagerCoreJsonObject = {}): Promise<ManagerStoreFindOrdersServiceFindOrdersResult> {
    const result = await this.repository.findAll({ ...query, resource: 'orders' });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { orders: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerStoreFindOrdersService as StoreFindOrdersService };
