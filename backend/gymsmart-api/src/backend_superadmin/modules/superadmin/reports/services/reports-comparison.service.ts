// RESPONSIBILITY: Produces the report comparison contract while honoring selected period/segment filters.
// FLOW: Controller -> comparison service -> persisted snapshot -> normalized comparison response.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { ReportsComparisonResponseDto } from '@/backend_superadmin/modules/superadmin/reports/reports-comparison-response.dto';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
import { REPORTS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/reports/reports.constants';

@Injectable()
export class ReportsComparisonService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Returns the selected comparison set or the latest complete dataset. */
  async findReportsComparison(input: { period?: string; segment?: string } = {}): Promise<ReportsComparisonResponseDto> {
    const payload = await this.repository.findLatestByKind(REPORTS_SNAPSHOT_KINDS.COMPARISON);
    if (payload === null) throw new NotFoundException('Comparison dataset is not provisioned');
    const typed = payload as ReportsComparisonResponseDto;
    const set = typed.comparisonSets.find((item) => (!input.period || item.periodKey === input.period) && (!input.segment || item.segmentKey === input.segment));
    if (set) return { ...typed, comparisonSets: [set] };
    return typed;
  }
}
