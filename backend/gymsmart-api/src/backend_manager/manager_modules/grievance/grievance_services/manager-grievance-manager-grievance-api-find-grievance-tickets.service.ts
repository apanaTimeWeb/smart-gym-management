// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerGrievanceRepository } from '@/backend_manager/manager_modules/grievance/manager-grievance.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type GrievanceTicketRow = { id: string; [key: string]: unknown };
export type GrievanceTicketsResult = GrievanceTicketRow[];

@Injectable()
export class ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService {
  constructor(private readonly repository: ManagerGrievanceRepository) {}
  /** @description Lists grievance records for the Manager scope. @param query - Validated query. @returns Contract-compatible rows. */
  async findGrievanceTickets(query: ManagerCoreJsonObject = {}): Promise<GrievanceTicketsResult> {
    const result = await this.repository.findAll(query);
    return result.data.map((row) => ({ id: row.id, ...row.payload }));
  }
}

export { ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService as GrievanceManagerGrievanceApiFindGrievanceTicketsService };
