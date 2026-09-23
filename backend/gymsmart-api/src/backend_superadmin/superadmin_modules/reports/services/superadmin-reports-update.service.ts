// RESPONSIBILITY: Executes partial update business flow for the reports feature.
// FLOW: CommandController -> SuperadminReportsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsMapper } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.mapper';
import type { SuperadminReportsDomainModel, SuperadminReportsUpdateInput } from '@/backend_superadmin/superadmin_modules/reports/types/superadmin-reports.interfaces';
@Injectable()
export class SuperadminReportsUpdateService {
  constructor(private readonly repository: SuperadminReportsRepository) {}
  /** Updates a reports record by UUID. */
  async updateReports(id: string, input: SuperadminReportsUpdateInput): Promise<SuperadminReportsDomainModel> { return SuperadminReportsMapper.toDomain(await this.repository.updateReportsById(id, input)); }
}