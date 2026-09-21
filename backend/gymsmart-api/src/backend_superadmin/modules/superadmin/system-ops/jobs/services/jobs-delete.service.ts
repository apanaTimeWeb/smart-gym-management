// RESPONSIBILITY: Executes the soft-delete flow for the jobs feature.
// FLOW: CommandController -> JobsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
@Injectable()
export class JobsDeleteService {
  constructor(private readonly repository: JobsRepository) {}
  /** Soft-deletes one jobs record. */
  async deleteJobs(id: string): Promise<null> { await this.repository.deleteJobsById(id); return null; }
}
