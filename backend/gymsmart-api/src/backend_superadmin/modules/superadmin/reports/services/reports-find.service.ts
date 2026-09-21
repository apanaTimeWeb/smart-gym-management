// RESPONSIBILITY: Executes single-record retrieval for the reports feature.
// FLOW: QueryController -> ReportsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
import { ReportsMapper } from '@/backend_superadmin/modules/superadmin/reports/reports.mapper';
import type { ReportsDomainModel } from '@/backend_superadmin/modules/superadmin/reports/types/reports.interfaces';
@Injectable()
export class ReportsFindService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Retrieves one active reports record by UUID. */
  async findReportsById(id: string): Promise<ReportsDomainModel> { return ReportsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
