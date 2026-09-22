// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/store/orders.
// FLOW: Controller -> StoreFetchOrdersService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { StoreRepository } from '@/backend_manager/modules/manager/store/repositories/store-repository';

@Injectable()
export class StoreFetchOrdersService {
  constructor(private readonly repository: StoreRepository) {}

  /** @description Loads the store collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchOrders(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findStoreList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { orders: rows, total: result.meta.total }, meta: result.meta };
  }
}
