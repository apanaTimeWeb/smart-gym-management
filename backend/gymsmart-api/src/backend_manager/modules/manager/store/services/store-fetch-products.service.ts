// RESPONSIBILITY: Read use-case for GET /api/v1/manager/store/products.
// FLOW: Controller -> StoreFetchProductsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { StoreRepository } from '@/modules/manager/store/repositories/store-repository';

@Injectable()
export class StoreFetchProductsService {
  constructor(private readonly repository: StoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchProducts(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findStoreList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { products: rows, total: result.meta.total }, meta: result.meta };
  }
}
