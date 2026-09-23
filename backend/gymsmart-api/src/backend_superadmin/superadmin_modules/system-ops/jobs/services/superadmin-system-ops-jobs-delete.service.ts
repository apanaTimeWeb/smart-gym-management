// RESPONSIBILITY: Executes the soft-delete flow for the jobs feature.
// FLOW: CommandController -> SuperadminJobsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
@Injectable()
export class SuperadminJobsDeleteService {
  constructor(private readonly repository: SuperadminJobsRepository) {}
  /** Soft-deletes one jobs record. */
  async deleteJobs(id: string): Promise<null> { await this.repository.deleteJobsById(id); return null; }
}