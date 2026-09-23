// RESPONSIBILITY: Produces the report comparison contract while honoring selected period/segment filters.
// FLOW: Controller -> comparison service -> persisted snapshot -> normalized comparison response.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsComparisonResponseDto } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-comparison-response.dto';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';

@Injectable()
export class SuperadminReportsComparisonService {
  constructor(private readonly repository: SuperadminReportsRepository) {}
  /** Returns the selected comparison set or the latest complete dataset. */
  async findReportsComparison(input: { period?: string; segment?: string } = {}): Promise<SuperadminReportsComparisonResponseDto> {
    return await this.repository.getLiveComparison({ period: input.period, segment: input.segment }, 'INR') as unknown as SuperadminReportsComparisonResponseDto;
  }
}