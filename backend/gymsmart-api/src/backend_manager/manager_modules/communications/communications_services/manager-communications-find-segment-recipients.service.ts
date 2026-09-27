// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerCommunicationsFindSegmentRecipientsServiceFindSegmentRecipientsResult {
  recipients: unknown[];
}

@Injectable()
export class ManagerCommunicationsFindSegmentRecipientsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the filtered communications collection for a resource-scoped query. @param segment - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async findSegmentRecipients(segment: string, query: ManagerCoreJsonObject = {}): Promise<ManagerCommunicationsFindSegmentRecipientsServiceFindSegmentRecipientsResult> {
    const result = await this.repository.findAll({ ...query, segment });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { recipients: rows, };
  }
}

export { ManagerCommunicationsFindSegmentRecipientsService as CommunicationsFindSegmentRecipientsService };
