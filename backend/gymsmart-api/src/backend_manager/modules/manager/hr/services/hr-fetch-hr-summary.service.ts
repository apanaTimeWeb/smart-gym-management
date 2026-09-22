// RESPONSIBILITY: Read use-case for GET /api/v1/manager/hr/summary.
// FLOW: Controller -> HrFetchHrSummaryService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { HrRepository } from '@/modules/manager/hr/repositories/hr-repository';

@Injectable()
export class HrFetchHrSummaryService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the hr collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchHrSummary(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findHrList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
