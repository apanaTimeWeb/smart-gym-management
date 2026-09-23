// RESPONSIBILITY: Executes paginated read logic for the team feature.
// FLOW: QueryController -> SuperadminTeamListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
import { SuperadminTeamMapper } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminTeamListQuery } from '@/backend_superadmin/superadmin_modules/team/types/superadmin-team.interfaces';

@Injectable()
export class SuperadminTeamListService {
  constructor(private readonly repository: SuperadminTeamRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findTeamPage(query: SuperadminTeamListQuery): Promise<{ data: ReturnType<typeof SuperadminTeamMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminTeamMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}