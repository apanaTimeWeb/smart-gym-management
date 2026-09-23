// RESPONSIBILITY: Executes partial update business flow for the team feature.
// FLOW: CommandController -> TeamUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { TeamRepository } from '@/backend_superadmin/modules/backend_superadmin/team/team.repository';
import { TeamMapper } from '@/backend_superadmin/modules/backend_superadmin/team/team.mapper';
import type { TeamDomainModel, TeamUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/team/types/team.interfaces';
@Injectable()
export class TeamUpdateService {
  constructor(private readonly repository: TeamRepository) {}
  /** Updates a team record by UUID. */
  async updateTeam(id: string, input: TeamUpdateInput): Promise<TeamDomainModel> { return TeamMapper.toDomain(await this.repository.updateTeamById(id, input)); }
}