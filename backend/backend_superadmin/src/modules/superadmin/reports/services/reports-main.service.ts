// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> ReportsMainService -> ReportsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from '@/modules/superadmin/reports/reports.repository';
import { REPORTS_SNAPSHOT_KINDS } from '@/modules/superadmin/reports/reports.constants';

@Injectable()
export class ReportsMainService {
  constructor(private readonly repository: ReportsRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findReportsData(input: Record<string, unknown> = {}): Promise<unknown> {
    void input;
    const payload = await this.repository.findLatestByKind(REPORTS_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload;
  }
}
