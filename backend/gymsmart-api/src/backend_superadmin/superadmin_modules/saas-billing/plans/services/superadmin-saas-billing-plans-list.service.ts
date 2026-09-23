// RESPONSIBILITY: Executes paginated read logic for the plans feature.
// FLOW: QueryController -> SuperadminPlansListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminPlansMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminPlansListQuery } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/types/superadmin-saas-billing-plans.interfaces';

@Injectable()
export class SuperadminPlansListService {
  constructor(private readonly repository: SuperadminPlansRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findPlansPage(query: SuperadminPlansListQuery): Promise<{ data: ReturnType<typeof SuperadminPlansMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminPlansMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}