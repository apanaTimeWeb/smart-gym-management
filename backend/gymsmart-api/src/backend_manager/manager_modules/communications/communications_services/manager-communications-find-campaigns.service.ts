// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerCommunicationsFindCampaignsServiceFindCampaignsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerCommunicationsFindCampaignsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findCampaigns(query: ManagerCoreJsonObject = {}): Promise<ManagerCommunicationsFindCampaignsServiceFindCampaignsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { campaigns: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerCommunicationsFindCampaignsService as CommunicationsFindCampaignsService };
