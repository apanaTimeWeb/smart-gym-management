// RESPONSIBILITY: Executes single-record retrieval for the team feature.
// FLOW: QueryController -> TeamFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { TeamRepository } from '@/backend_superadmin/modules/superadmin/team/team.repository';
import { TeamMapper } from '@/backend_superadmin/modules/superadmin/team/team.mapper';
import type { TeamDomainModel } from '@/backend_superadmin/modules/superadmin/team/types/team.interfaces';
@Injectable()
export class TeamFindService {
  constructor(private readonly repository: TeamRepository) {}
  /** Retrieves one active team record by UUID. */
  async findTeamById(id: string): Promise<TeamDomainModel> { return TeamMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}