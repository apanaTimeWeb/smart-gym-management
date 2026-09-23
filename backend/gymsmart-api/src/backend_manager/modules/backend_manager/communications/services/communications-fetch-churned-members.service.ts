// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/modules/backend_manager/communications/repositories/communications-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class CommunicationsFetchChurnedMembersService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchChurnedMembers(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findCommunicationsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { members: rows, } as any;
  }
}
