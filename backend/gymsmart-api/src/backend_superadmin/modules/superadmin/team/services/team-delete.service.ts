// RESPONSIBILITY: Executes the soft-delete flow for the team feature.
// FLOW: CommandController -> TeamDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { TeamRepository } from '@/backend_superadmin/modules/backend_superadmin/team/team.repository';
@Injectable()
export class TeamDeleteService {
  constructor(private readonly repository: TeamRepository) {}
  /** Soft-deletes one team record. */
  async deleteTeam(id: string): Promise<null> { await this.repository.deleteTeamById(id); return null; }
}