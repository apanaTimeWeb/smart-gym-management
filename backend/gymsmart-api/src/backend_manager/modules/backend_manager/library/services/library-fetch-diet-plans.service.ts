// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { LibraryRepository } from '@/backend_manager/modules/backend_manager/library/repositories/library-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class LibraryFetchDietPlansService {
  constructor(private readonly repository: LibraryRepository) {}

  /** @description Loads the library collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchDietPlans(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findLibraryList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { dietPlans: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
