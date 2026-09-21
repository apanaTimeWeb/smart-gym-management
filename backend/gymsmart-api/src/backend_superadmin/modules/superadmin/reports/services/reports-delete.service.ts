// RESPONSIBILITY: Executes the soft-delete flow for the reports feature.
// FLOW: CommandController -> ReportsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
@Injectable()
export class ReportsDeleteService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Soft-deletes one reports record. */
  async deleteReports(id: string): Promise<null> { await this.repository.deleteReportsById(id); return null; }
}
