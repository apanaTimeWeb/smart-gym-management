// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminTeamMainService -> SuperadminTeamRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';

@Injectable()
export class SuperadminTeamMainService {
  constructor(private readonly repository: SuperadminTeamRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findTeamData(_input: Record<string, unknown> = {}): Promise<unknown> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'updatedAt', sortOrder: 'DESC' }); return page.items.map((item) => item.payload);
  }
}