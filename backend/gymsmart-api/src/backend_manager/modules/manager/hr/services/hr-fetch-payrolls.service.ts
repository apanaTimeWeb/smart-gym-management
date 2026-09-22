// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/hr/payrolls.
// FLOW: Controller -> HrFetchPayrollsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { HrRepository } from '@/backend_manager/modules/manager/hr/repositories/hr-repository';

@Injectable()
export class HrFetchPayrollsService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the hr collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPayrolls(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findHrList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { payrolls: rows, total: result.meta.total }, meta: result.meta };
  }
}
