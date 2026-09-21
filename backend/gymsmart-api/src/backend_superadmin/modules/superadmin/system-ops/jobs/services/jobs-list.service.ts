// RESPONSIBILITY: Executes paginated read logic for the jobs feature.
// FLOW: QueryController -> JobsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { JobsListQuery } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';

@Injectable()
export class JobsListService {
  constructor(private readonly repository: JobsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findJobsPage(query: JobsListQuery): Promise<{ data: ReturnType<typeof JobsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: JobsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
