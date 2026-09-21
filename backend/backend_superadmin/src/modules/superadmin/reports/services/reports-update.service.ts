// RESPONSIBILITY: Executes partial update business flow for the reports feature.
// FLOW: CommandController -> ReportsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/modules/superadmin/reports/reports.repository';
import { ReportsMapper } from '@/modules/superadmin/reports/reports.mapper';
import type { ReportsDomainModel, ReportsUpdateInput } from '@/modules/superadmin/reports/types/reports.interfaces';
@Injectable()
export class ReportsUpdateService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Updates a reports record by UUID. */
  async updateReports(id: string, input: ReportsUpdateInput): Promise<ReportsDomainModel> { return ReportsMapper.toDomain(await this.repository.updateReportsById(id, input)); }
}
