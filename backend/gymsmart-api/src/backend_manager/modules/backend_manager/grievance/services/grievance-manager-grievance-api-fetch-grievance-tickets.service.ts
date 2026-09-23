// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { GrievanceRepository } from '@/backend_manager/modules/backend_manager/grievance/repositories/grievance-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class GrievanceManagerGrievanceApiFetchGrievanceTicketsService {
  constructor(private readonly repository: GrievanceRepository) {}
  /** @description Lists grievance records for the Manager scope. @param query - Validated query. @returns Contract-compatible rows. */
  async fetchGrievanceTickets(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findGrievanceList(query);
    return result.data.map((row) => ({ id: row.id, ...row.payload }));
  }
}
