// RESPONSIBILITY: Read use-case for GET /api/v1/manager/hr/staff/:id.
// FLOW: Controller -> HrFetchStaffByIdService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { HrRepository } from '@/backend_manager/modules/manager/hr/repositories/hr-repository';

@Injectable()
export class HrFetchStaffByIdService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads one hr record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchStaffById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findHrByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
