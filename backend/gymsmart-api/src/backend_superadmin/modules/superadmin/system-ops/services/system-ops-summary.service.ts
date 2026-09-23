// RESPONSIBILITY: Returns the complete frontend system-ops summary contract from PostgreSQL.
// FLOW: Controller -> SystemOpsSummaryService -> SystemOpsRepository -> contract snapshot.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemOpsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/system-ops.repository';

@Injectable()
export class SystemOpsSummaryService {
  constructor(private readonly repository: SystemOpsRepository) {}

  /** Returns the complete summary consumed by the system-ops landing page. */
  async findSystemOpsSummary(): Promise<unknown> {
    const payload = await this.repository.findSummary();
    if (payload === null) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'SYSTEM_OPS.SUMMARY.NOT_PROVISIONED', message: { key: 'system-ops.ERRORS.NOT_FOUND' } });
    return payload;
  }
}