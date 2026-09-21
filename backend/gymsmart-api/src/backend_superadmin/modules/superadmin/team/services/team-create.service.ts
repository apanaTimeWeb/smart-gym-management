// RESPONSIBILITY: Executes creation business flow for the team feature.
// FLOW: CommandController -> TeamCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { TeamRepository } from '@/backend_superadmin/modules/superadmin/team/team.repository';
import { TeamMapper } from '@/backend_superadmin/modules/superadmin/team/team.mapper';
import type { TeamCreateInput, TeamDomainModel } from '@/backend_superadmin/modules/superadmin/team/types/team.interfaces';
@Injectable()
export class TeamCreateService {
  constructor(private readonly repository: TeamRepository) {}
  /** Creates a new team record. */
  async createTeam(input: TeamCreateInput): Promise<TeamDomainModel> { return TeamMapper.toDomain(await this.repository.createTeam(input)); }
}
