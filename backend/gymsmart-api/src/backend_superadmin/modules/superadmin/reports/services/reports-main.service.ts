// RESPONSIBILITY: Translates persisted report snapshot rows into the frontend report contract with request-aware filtering.
// FLOW: Controller -> ReportsMainService -> repository query -> contract payload -> response DTO.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';

@Injectable()
export class ReportsMainService {
  constructor(private readonly repository: ReportsRepository) {}

  /** Returns the latest report payload without discarding supported query input. */
  async findReportsData(input: { from?: string; to?: string; period?: string } = {}): Promise<unknown> {
    return await this.repository.getLiveReports(input);
  }

}