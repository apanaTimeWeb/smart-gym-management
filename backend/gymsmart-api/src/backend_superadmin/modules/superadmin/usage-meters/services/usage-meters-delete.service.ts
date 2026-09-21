// RESPONSIBILITY: Executes the soft-delete flow for the usage-meters feature.
// FLOW: CommandController -> UsageMetersDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { UsageMetersRepository } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.repository';
@Injectable()
export class UsageMetersDeleteService {
  constructor(private readonly repository: UsageMetersRepository) {}
  /** Soft-deletes one usage-meters record. */
  async deleteUsageMeters(id: string): Promise<null> { await this.repository.deleteUsageMetersById(id); return null; }
}
