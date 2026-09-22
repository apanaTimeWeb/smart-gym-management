// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/sales/all-memberships.
// FLOW: Controller -> SalesFetchAllMembershipsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { SalesRepository } from '@/backend_manager/modules/manager/sales/repositories/sales-repository';

@Injectable()
export class SalesFetchAllMembershipsService {
  constructor(private readonly repository: SalesRepository) {}

  /** @description Loads the sales collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAllMemberships(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findSalesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { members: rows, total: result.meta.total }, meta: result.meta };
  }
}
