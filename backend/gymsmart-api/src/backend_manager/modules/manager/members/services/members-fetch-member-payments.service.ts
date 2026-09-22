// RESPONSIBILITY: Read use-case for GET /api/v1/manager/members/:memberId/payments.
// FLOW: Controller -> MembersFetchMemberPaymentsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MembersRepository } from '@/modules/manager/members/repositories/members-repository';

@Injectable()
export class MembersFetchMemberPaymentsService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the filtered members collection for a resource-scoped query. @param memberId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchMemberPayments(memberId: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findMembersList({ ...query, memberId });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta };
  }
}
