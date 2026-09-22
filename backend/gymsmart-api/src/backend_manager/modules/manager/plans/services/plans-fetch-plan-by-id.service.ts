// RESPONSIBILITY: Read use-case for GET /api/v1/manager/plans/:id.
// FLOW: Controller -> PlansFetchPlanByIdService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PlansRepository } from '@/modules/manager/plans/repositories/plans-repository';

@Injectable()
export class PlansFetchPlanByIdService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads one plans record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchPlanById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findPlansByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
