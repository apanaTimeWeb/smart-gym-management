// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { StoreRepository } from '@/backend_manager/modules/backend_manager/store/repositories/store-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class StoreFetchProductsService {
  constructor(private readonly repository: StoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchProducts(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findStoreList({ ...query, resource: 'products' });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { products: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
