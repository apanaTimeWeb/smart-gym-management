// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtRepository } from '@/backend_manager/manager_modules/pt/manager-pt.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface PtPackageRow { id: string; name?: string; sessionCount?: number; durationDays?: number; price?: number; description?: string; currency?: string; }
export interface PtPackagesResult { packages: PtPackageRow[]; }

@Injectable()
export class ManagerPtFindPackagesService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findPackages(query: ManagerCoreJsonObject = {}): Promise<PtPackagesResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { packages: rows, };
  }
}

export { ManagerPtFindPackagesService as PtFindPackagesService };
