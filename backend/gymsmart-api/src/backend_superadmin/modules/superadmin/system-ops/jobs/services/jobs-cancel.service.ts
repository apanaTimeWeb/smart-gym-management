// RESPONSIBILITY: Implements the cancel mutation against the jobs repository.
// FLOW: Controller -> JobsCancelService -> JobsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';

@Injectable()
export class JobsCancelService {
  constructor(private readonly repository: JobsRepository) {}
  /** Executes the frontend cancel mutation with real repository behavior. */
  async cancelJob(id: string): Promise<unknown> { if (!id.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'JOBS.ID.REQUIRED', message: { key: 'jobs.ERRORS.BAD_REQUEST' } }); return this.repository.cancelJobById(id).then(() => null); }
}