// RESPONSIBILITY: Executes the soft-delete flow for the reports feature.
// FLOW: CommandController -> SuperadminReportsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
@Injectable()
export class SuperadminReportsDeleteService {
  constructor(private readonly repository: SuperadminReportsRepository) {}
  /** Soft-deletes one reports record. */
  async deleteReports(id: string): Promise<null> { await this.repository.deleteReportsById(id); return null; }
}