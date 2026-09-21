// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> ReportsComparisonService -> ReportsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { ReportsComparisonResponseDto } from '@/modules/superadmin/reports/reports-comparison-response.dto';
import { ReportsRepository } from '@/modules/superadmin/reports/reports.repository';
import { REPORTS_SNAPSHOT_KINDS } from '@/modules/superadmin/reports/reports.constants';

@Injectable()
export class ReportsComparisonService {
  constructor(private readonly repository: ReportsRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findReportsComparison(input: Record<string, unknown> = {}): Promise<ReportsComparisonResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(REPORTS_SNAPSHOT_KINDS.COMPARISON);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as ReportsComparisonResponseDto;
  }
}
