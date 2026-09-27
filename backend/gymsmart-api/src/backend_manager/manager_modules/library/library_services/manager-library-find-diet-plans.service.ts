// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerLibraryRepository } from '@/backend_manager/manager_modules/library/manager-library.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerLibraryFindDietPlansServiceFindDietPlansResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerLibraryFindDietPlansService {
  constructor(private readonly repository: ManagerLibraryRepository) {}

  /** @description Loads the library collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findDietPlans(query: ManagerCoreJsonObject = {}): Promise<ManagerLibraryFindDietPlansServiceFindDietPlansResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { dietPlans: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerLibraryFindDietPlansService as LibraryFindDietPlansService };
