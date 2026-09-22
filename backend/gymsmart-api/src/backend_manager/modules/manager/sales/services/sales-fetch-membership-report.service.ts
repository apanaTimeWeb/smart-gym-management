// RESPONSIBILITY: Read use-case for GET /api/v1/manager/sales/membership-report.
// FLOW: Controller -> SalesFetchMembershipReportService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { SalesRepository } from '@/modules/manager/sales/repositories/sales-repository';

@Injectable()
export class SalesFetchMembershipReportService {
  constructor(private readonly repository: SalesRepository) {}

  /** @description Loads the sales collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchMembershipReport(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findSalesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { report: rows,  }, meta: result.meta };
  }
}
