// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type CommunicationsAutomationRow = { id: string; type?: string; title?: string; description?: string; enabled?: boolean; channel?: string; messageTemplate?: string; sendTime?: string };
export type CommunicationsAutomationsResult = { automations: CommunicationsAutomationRow[] };

@Injectable()
export class ManagerCommunicationsFindAutomationsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findAutomations(query: ManagerCoreJsonObject = {}): Promise<CommunicationsAutomationsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { automations: rows, };
  }
}

export { ManagerCommunicationsFindAutomationsService as CommunicationsFindAutomationsService };
