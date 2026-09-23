// RESPONSIBILITY: Executes paginated read logic for the infrastructure feature.
// FLOW: QueryController -> SuperadminInfrastructureListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminInfrastructureMapper } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminInfrastructureListQuery } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';

@Injectable()
export class SuperadminInfrastructureListService {
  constructor(private readonly repository: SuperadminInfrastructureRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findInfrastructurePage(query: SuperadminInfrastructureListQuery): Promise<{ data: ReturnType<typeof SuperadminInfrastructureMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminInfrastructureMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}