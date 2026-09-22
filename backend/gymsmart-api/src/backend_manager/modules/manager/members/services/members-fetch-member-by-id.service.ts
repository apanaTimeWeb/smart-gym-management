// RESPONSIBILITY: Read use-case for GET /api/v1/manager/members/:id.
// FLOW: Controller -> MembersFetchMemberByIdService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MembersRepository } from '@/modules/manager/members/repositories/members-repository';

@Injectable()
export class MembersFetchMemberByIdService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads one members record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws CoreNotFoundException when the record does not exist. */
  async fetchMemberById(id: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    void query;
    const row = await this.repository.findMembersByIdOrThrow(id);
    return { id: row.id, ...row.payload };
  }
}
