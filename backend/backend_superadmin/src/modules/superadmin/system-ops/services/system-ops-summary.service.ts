// RESPONSIBILITY: Returns the complete frontend system-ops summary contract from PostgreSQL.
// FLOW: Controller -> SystemOpsSummaryService -> SystemOpsRepository -> contract snapshot.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemOpsRepository } from '@/modules/superadmin/system-ops/system-ops.repository';

@Injectable()
export class SystemOpsSummaryService {
  constructor(private readonly repository: SystemOpsRepository) {}

  /** Returns the complete summary consumed by the system-ops landing page. */
  async findSystemOpsSummary(): Promise<unknown> {
    const payload = await this.repository.findSummary();
    if (payload === null) throw new NotFoundException('System-ops summary contract is not provisioned');
    return payload;
  }
}
