// RESPONSIBILITY: Executes single-record retrieval for the reports feature.
// FLOW: QueryController -> SuperadminReportsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsMapper } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.mapper';
import type { SuperadminReportsDomainModel } from '@/backend_superadmin/superadmin_modules/reports/types/superadmin-reports.interfaces';
@Injectable()
export class SuperadminReportsFindService {
  constructor(private readonly repository: SuperadminReportsRepository) {}
  /** Retrieves one active reports record by UUID. */
  async findReportsById(id: string): Promise<SuperadminReportsDomainModel> { return SuperadminReportsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}