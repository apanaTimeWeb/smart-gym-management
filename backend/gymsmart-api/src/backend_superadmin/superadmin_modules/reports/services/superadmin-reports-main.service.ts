// RESPONSIBILITY: Translates persisted report snapshot rows into the frontend report contract with request-aware filtering.
// FLOW: Controller -> SuperadminReportsMainService -> repository query -> contract payload -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';

@Injectable()
export class SuperadminReportsMainService {
  constructor(private readonly repository: SuperadminReportsRepository) {}

  /** Returns the latest report payload without discarding supported query input. */
  async findReportsData(input: { from?: string; to?: string; period?: string } = {}): Promise<unknown> {
    return await this.repository.getLiveReports(input);
  }

}