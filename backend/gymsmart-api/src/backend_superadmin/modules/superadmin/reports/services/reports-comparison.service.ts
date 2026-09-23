// RESPONSIBILITY: Produces the report comparison contract while honoring selected period/segment filters.
// FLOW: Controller -> comparison service -> persisted snapshot -> normalized comparison response.
import { Injectable } from '@nestjs/common';
import { ReportsComparisonResponseDto } from '@/backend_superadmin/modules/superadmin/reports/reports-comparison-response.dto';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';

@Injectable()
export class ReportsComparisonService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Returns the selected comparison set or the latest complete dataset. */
  async findReportsComparison(input: { period?: string; segment?: string } = {}): Promise<ReportsComparisonResponseDto> {
    return await this.repository.getLiveComparison({ period: input.period, segment: input.segment }, 'INR') as unknown as ReportsComparisonResponseDto;
  }
}