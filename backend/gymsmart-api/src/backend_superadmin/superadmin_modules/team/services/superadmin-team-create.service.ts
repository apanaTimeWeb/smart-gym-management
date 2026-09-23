// RESPONSIBILITY: Executes creation business flow for the team feature.
// FLOW: CommandController -> SuperadminTeamCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
import { SuperadminTeamMapper } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.mapper';
import type { SuperadminTeamCreateInput, SuperadminTeamDomainModel } from '@/backend_superadmin/superadmin_modules/team/types/superadmin-team.interfaces';
@Injectable()
export class SuperadminTeamCreateService {
  constructor(private readonly repository: SuperadminTeamRepository) {}
  /** Creates a new team record. */
  async createTeam(input: SuperadminTeamCreateInput): Promise<SuperadminTeamDomainModel> { return SuperadminTeamMapper.toDomain(await this.repository.createTeam(input)); }
}