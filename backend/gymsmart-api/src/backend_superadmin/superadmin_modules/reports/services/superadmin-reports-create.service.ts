// RESPONSIBILITY: Executes creation business flow for the reports feature.
// FLOW: CommandController -> SuperadminReportsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsMapper } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.mapper';
import type { SuperadminReportsCreateInput, SuperadminReportsDomainModel } from '@/backend_superadmin/superadmin_modules/reports/types/superadmin-reports.interfaces';
@Injectable()
export class SuperadminReportsCreateService {
  constructor(private readonly repository: SuperadminReportsRepository) {}
  /** Creates a new reports record. */
  async createReports(input: SuperadminReportsCreateInput): Promise<SuperadminReportsDomainModel> { return SuperadminReportsMapper.toDomain(await this.repository.createReports(input)); }
}