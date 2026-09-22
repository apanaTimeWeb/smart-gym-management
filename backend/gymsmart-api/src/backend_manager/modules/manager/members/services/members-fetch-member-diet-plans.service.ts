// RESPONSIBILITY: Read use-case for GET /api/v1/manager/members/diet-plans.
// FLOW: Controller -> MembersFetchMemberDietPlansService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { MembersRepository } from '@/backend_manager/modules/manager/members/repositories/members-repository';

@Injectable()
export class MembersFetchMemberDietPlansService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchMemberDietPlans(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findMembersList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
