// RESPONSIBILITY: One read use-case for GET /api/v1/manager/grievance.
// FLOW: Controller query -> repository query -> ORM-free domain -> response contract.
import { Injectable } from '@nestjs/common';

import type { CoreJsonObject } from '@/core/types/json-value.types';
import { GrievanceRepository } from '@/modules/manager/grievance/repositories/grievance-repository';

@Injectable()
export class GrievanceManagerGrievanceApiFetchGrievanceTicketsService {
  constructor(private readonly repository: GrievanceRepository) {}
  /** @description Lists grievance records for the Manager scope. @param query - Validated query. @returns Contract-compatible rows. */
  async fetchGrievanceTickets(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findGrievanceList(query);
    return result.data.map((row) => ({ id: row.id, ...row.payload })) as unknown as CoreJsonObject;
  }
}
