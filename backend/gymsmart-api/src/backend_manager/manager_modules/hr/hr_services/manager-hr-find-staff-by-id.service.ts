// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/manager_modules/hr/manager-hr.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerHrFindStaffByIdServiceFindStaffByIdResult {
  id: unknown;
}

@Injectable()
export class ManagerHrFindStaffByIdService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads one hr record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws ManagerCoreNotFoundException when the record does not exist. */
  async findStaffById(id: string, query: ManagerCoreJsonObject = {}): Promise<ManagerHrFindStaffByIdServiceFindStaffByIdResult> {
    void query;
    const row = await this.repository.findByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}

export { ManagerHrFindStaffByIdService as HrFindStaffByIdService };
