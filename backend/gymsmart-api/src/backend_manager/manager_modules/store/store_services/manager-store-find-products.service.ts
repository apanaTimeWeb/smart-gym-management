// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerStoreRepository } from '@/backend_manager/manager_modules/store/manager-store.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerStoreFindProductsServiceFindProductsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerStoreFindProductsService {
  constructor(private readonly repository: ManagerStoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findProducts(query: ManagerCoreJsonObject = {}): Promise<ManagerStoreFindProductsServiceFindProductsResult> {
    const result = await this.repository.findAll({ ...query, resource: 'products' });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { products: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerStoreFindProductsService as StoreFindProductsService };
