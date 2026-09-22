// RESPONSIBILITY: Read use-case for GET /api/v1/manager/communications/segments/:segment.
// FLOW: Controller -> CommunicationsFetchSegmentRecipientsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { CommunicationsRepository } from '@/modules/manager/communications/repositories/communications-repository';

@Injectable()
export class CommunicationsFetchSegmentRecipientsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the filtered communications collection for a resource-scoped query. @param segment - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchSegmentRecipients(segment: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findCommunicationsList({ ...query, segment });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta };
  }
}
