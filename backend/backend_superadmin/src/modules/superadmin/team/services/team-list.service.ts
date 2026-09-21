// RESPONSIBILITY: Executes paginated read logic for the team feature.
// FLOW: QueryController -> TeamListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { TeamRepository } from '@/modules/superadmin/team/team.repository';
import { TeamMapper } from '@/modules/superadmin/team/team.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { TeamListQuery } from '@/modules/superadmin/team/types/team.interfaces';

@Injectable()
export class TeamListService {
  constructor(private readonly repository: TeamRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findTeamPage(query: TeamListQuery): Promise<{ data: ReturnType<typeof TeamMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: TeamMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
