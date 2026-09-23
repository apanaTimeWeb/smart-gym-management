// RESPONSIBILITY: Executes paginated read logic for the jobs feature.
// FLOW: QueryController -> SuperadminJobsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminJobsListQuery } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/types/superadmin-system-ops-jobs.interfaces';

@Injectable()
export class SuperadminJobsListService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findJobsPage(query: SuperadminJobsListQuery): Promise<{ data: ReturnType<typeof SuperadminJobsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminJobsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}