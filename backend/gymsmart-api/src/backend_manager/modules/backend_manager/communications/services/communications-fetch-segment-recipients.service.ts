// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/modules/backend_manager/communications/repositories/communications-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class CommunicationsFetchSegmentRecipientsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the filtered communications collection for a resource-scoped query. @param segment - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchSegmentRecipients(segment: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findCommunicationsList({ ...query, segment });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { recipients: rows, };
  }
}
