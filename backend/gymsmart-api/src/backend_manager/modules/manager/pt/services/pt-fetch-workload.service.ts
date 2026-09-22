// RESPONSIBILITY: Read use-case for GET /api/v1/manager/pt/workload.
// FLOW: Controller -> PtFetchWorkloadService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PtRepository } from '@/modules/manager/pt/repositories/pt-repository';

@Injectable()
export class PtFetchWorkloadService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchWorkload(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findPtList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
