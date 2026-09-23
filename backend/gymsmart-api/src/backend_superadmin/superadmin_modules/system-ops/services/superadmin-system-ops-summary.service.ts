// RESPONSIBILITY: Returns the complete frontend system-ops summary contract from PostgreSQL.
// FLOW: Controller -> SuperadminSystemOpsSummaryService -> SuperadminSystemOpsRepository -> contract snapshot.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SuperadminSystemOpsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.repository';

@Injectable()
export class SuperadminSystemOpsSummaryService {
  constructor(private readonly repository: SuperadminSystemOpsRepository) {}

  /** Returns the complete summary consumed by the system-ops landing page. */
  async findSystemOpsSummary(): Promise<unknown> {
    const payload = await this.repository.findSummary();
    if (payload === null) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'SYSTEM_OPS.SUMMARY.NOT_PROVISIONED', message: { key: 'system-ops.ERRORS.NOT_FOUND' } });
    return payload;
  }
}