// RESPONSIBILITY: Executes partial update business flow for the team feature.
// FLOW: CommandController -> SuperadminTeamUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
import { SuperadminTeamMapper } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.mapper';
import type { SuperadminTeamDomainModel, SuperadminTeamUpdateInput } from '@/backend_superadmin/superadmin_modules/team/types/superadmin-team.interfaces';
@Injectable()
export class SuperadminTeamUpdateService {
  constructor(private readonly repository: SuperadminTeamRepository) {}
  /** Updates a team record by UUID. */
  async updateTeam(id: string, input: SuperadminTeamUpdateInput): Promise<SuperadminTeamDomainModel> { return SuperadminTeamMapper.toDomain(await this.repository.updateTeamById(id, input)); }
}