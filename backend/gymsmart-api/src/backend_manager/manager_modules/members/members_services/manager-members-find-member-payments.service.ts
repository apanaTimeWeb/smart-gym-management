// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerMembersFindMemberPaymentsServiceFindMemberPaymentsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerMembersFindMemberPaymentsService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the filtered members collection for a resource-scoped query. @param memberId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async findMemberPayments(memberId: string, query: ManagerCoreJsonObject = {}): Promise<ManagerMembersFindMemberPaymentsServiceFindMemberPaymentsResult> {
    const result = await this.repository.findAll({ ...query, memberId });
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerMembersFindMemberPaymentsService as MembersFindMemberPaymentsService };
