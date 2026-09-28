// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type ChurnedMemberRow = { id: string; memberId?: string; name?: string; phone?: string; email?: string; plan?: string; exitDate?: string; daysSinceExit?: number; reason?: string; lastContactedAt?: string | null; recovered?: boolean; lifetimeValue?: number; };
export type CommunicationsChurnedMembersResult = { members: ChurnedMemberRow[] };

@Injectable()
export class ManagerCommunicationsFindChurnedMembersService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findChurnedMembers(query: ManagerCoreJsonObject = {}): Promise<CommunicationsChurnedMembersResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { members: rows, };
  }
}

export { ManagerCommunicationsFindChurnedMembersService as CommunicationsFindChurnedMembersService };
