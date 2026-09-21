// RESPONSIBILITY: Executes paginated read logic for the plans feature.
// FLOW: QueryController -> PlansListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/plans.repository';
import { PlansMapper } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/plans.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { PlansListQuery } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/types/plans.interfaces';

@Injectable()
export class PlansListService {
  constructor(private readonly repository: PlansRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findPlansPage(query: PlansListQuery): Promise<{ data: ReturnType<typeof PlansMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: PlansMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
