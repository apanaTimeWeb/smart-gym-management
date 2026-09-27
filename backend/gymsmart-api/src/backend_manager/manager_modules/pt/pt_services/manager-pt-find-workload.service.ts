// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtRepository } from '@/backend_manager/manager_modules/pt/manager-pt.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface PtWorkloadRow { id: string; trainerId?: string; trainerName?: string; activeClients?: number; totalSessionsConducted?: number; rating?: number; status?: string; }
export interface PtWorkloadResult { workload: PtWorkloadRow[]; }

@Injectable()
export class ManagerPtFindWorkloadService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findWorkload(query: ManagerCoreJsonObject = {}): Promise<PtWorkloadResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { workload: rows, };
  }
}

export { ManagerPtFindWorkloadService as PtFindWorkloadService };
