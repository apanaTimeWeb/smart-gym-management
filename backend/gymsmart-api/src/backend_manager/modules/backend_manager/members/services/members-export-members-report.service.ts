// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/modules/backend_manager/members/repositories/members-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class MembersExportMembersReportService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async exportMembersReport(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findMembersList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { members: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
