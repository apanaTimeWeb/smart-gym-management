// RESPONSIBILITY: Read use-case for GET /api/v1/manager/members/workouts.
// FLOW: Controller -> MembersFetchMemberWorkoutsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MembersRepository } from '@/modules/manager/members/repositories/members-repository';

@Injectable()
export class MembersFetchMemberWorkoutsService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchMemberWorkouts(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findMembersList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows as unknown as CoreJsonObject;
  }
}
