// RESPONSIBILITY: Executes paginated read logic for the infrastructure feature.
// FLOW: QueryController -> InfrastructureListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
import { InfrastructureMapper } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { InfrastructureListQuery } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';

@Injectable()
export class InfrastructureListService {
  constructor(private readonly repository: InfrastructureRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findInfrastructurePage(query: InfrastructureListQuery): Promise<{ data: ReturnType<typeof InfrastructureMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: InfrastructureMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
