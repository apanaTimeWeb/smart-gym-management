// RESPONSIBILITY: Read use-case for GET /api/v1/manager/hr/ledger/:staffId.
// FLOW: Controller -> HrFetchLedgerService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { HrRepository } from '@/modules/manager/hr/repositories/hr-repository';

@Injectable()
export class HrFetchLedgerService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the filtered hr collection for a resource-scoped query. @param staffId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchLedger(staffId: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findHrList({ ...query, staffId });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta };
  }
}
