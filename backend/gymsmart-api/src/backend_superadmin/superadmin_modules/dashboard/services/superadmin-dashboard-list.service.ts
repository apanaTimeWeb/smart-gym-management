// RESPONSIBILITY: Executes paginated read logic for the dashboard feature.
// FLOW: QueryController -> SuperadminDashboardListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardMapper } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardListQuery } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardListService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findDashboardPage(query: SuperadminDashboardListQuery): Promise<{ data: SuperadminDashboardResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminDashboardMapper.toResponse(SuperadminDashboardMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}