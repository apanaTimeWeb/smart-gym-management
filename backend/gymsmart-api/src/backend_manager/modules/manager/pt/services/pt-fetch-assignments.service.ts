// RESPONSIBILITY: Read use-case for GET /api/v1/manager/pt/assignments.
// FLOW: Controller -> PtFetchAssignmentsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PtRepository } from '@/modules/manager/pt/repositories/pt-repository';

@Injectable()
export class PtFetchAssignmentsService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAssignments(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findPtList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { assignments: rows, total: result.meta.total }, meta: result.meta };
  }
}
