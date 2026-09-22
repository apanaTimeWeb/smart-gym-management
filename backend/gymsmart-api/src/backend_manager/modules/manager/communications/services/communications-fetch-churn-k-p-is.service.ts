// RESPONSIBILITY: Read use-case for GET /api/v1/manager/communications/churn-kpis.
// FLOW: Controller -> CommunicationsFetchChurnKPIsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { CommunicationsRepository } from '@/modules/manager/communications/repositories/communications-repository';

@Injectable()
export class CommunicationsFetchChurnKPIsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchChurnKPIs(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findCommunicationsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
