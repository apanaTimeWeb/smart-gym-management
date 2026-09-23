// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/modules/backend_manager/hr/repositories/hr-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class HrFetchStaffByIdService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads one hr record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchStaffById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findHrByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
