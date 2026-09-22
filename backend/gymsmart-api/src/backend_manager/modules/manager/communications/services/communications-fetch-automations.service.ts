// RESPONSIBILITY: Read use-case for GET /api/v1/manager/communications/automations.
// FLOW: Controller -> CommunicationsFetchAutomationsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { CommunicationsRepository } from '@/backend_manager/modules/manager/communications/repositories/communications-repository';

@Injectable()
export class CommunicationsFetchAutomationsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAutomations(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findCommunicationsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
