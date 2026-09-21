// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> TeamMainService -> TeamRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamRepository } from '@/modules/superadmin/team/team.repository';
import { TEAM_SNAPSHOT_KINDS } from '@/modules/superadmin/team/team.constants';

@Injectable()
export class TeamMainService {
  constructor(private readonly repository: TeamRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findTeamData(input: Record<string, unknown> = {}): Promise<unknown> {
    void input;
    const payload = await this.repository.findLatestByKind(TEAM_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload;
  }
}
