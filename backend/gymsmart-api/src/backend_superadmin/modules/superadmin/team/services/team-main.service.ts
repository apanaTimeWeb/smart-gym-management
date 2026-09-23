// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> TeamMainService -> TeamRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { TeamRepository } from '@/backend_superadmin/modules/superadmin/team/team.repository';

@Injectable()
export class TeamMainService {
  constructor(private readonly repository: TeamRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findTeamData(_input: Record<string, unknown> = {}): Promise<unknown> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'updatedAt', sortOrder: 'DESC' }); return page.items.map((item) => item.payload);
  }
}