// RESPONSIBILITY: Read use-case for GET /api/v1/manager/communications/churned-members.
// FLOW: Controller -> CommunicationsFetchChurnedMembersService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { CommunicationsRepository } from '@/modules/manager/communications/repositories/communications-repository';

@Injectable()
export class CommunicationsFetchChurnedMembersService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchChurnedMembers(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findCommunicationsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
