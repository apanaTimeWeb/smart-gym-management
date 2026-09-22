// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/pt/kpis.
// FLOW: Controller -> PtFetchPtDashboardKpisService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { PtRepository } from '@/backend_manager/modules/manager/pt/repositories/pt-repository';

@Injectable()
export class PtFetchPtDashboardKpisService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPtDashboardKpis(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findPtList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
