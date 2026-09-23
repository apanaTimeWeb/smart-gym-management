// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtRepository } from '@/backend_manager/modules/backend_manager/pt/repositories/pt-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class PtFetchWorkloadService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchWorkload(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findPtList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { workload: rows, } as any;
  }
}
