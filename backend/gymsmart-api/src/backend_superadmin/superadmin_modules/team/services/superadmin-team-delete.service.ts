// RESPONSIBILITY: Executes the soft-delete flow for the team feature.
// FLOW: CommandController -> SuperadminTeamDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
@Injectable()
export class SuperadminTeamDeleteService {
  constructor(private readonly repository: SuperadminTeamRepository) {}
  /** Soft-deletes one team record. */
  async deleteTeam(id: string): Promise<null> { await this.repository.deleteTeamById(id); return null; }
}