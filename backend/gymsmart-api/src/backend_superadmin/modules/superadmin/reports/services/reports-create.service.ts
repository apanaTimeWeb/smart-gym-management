// RESPONSIBILITY: Executes creation business flow for the reports feature.
// FLOW: CommandController -> ReportsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.repository';
import { ReportsMapper } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.mapper';
import type { ReportsCreateInput, ReportsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/reports/types/reports.interfaces';
@Injectable()
export class ReportsCreateService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Creates a new reports record. */
  async createReports(input: ReportsCreateInput): Promise<ReportsDomainModel> { return ReportsMapper.toDomain(await this.repository.createReports(input)); }
}