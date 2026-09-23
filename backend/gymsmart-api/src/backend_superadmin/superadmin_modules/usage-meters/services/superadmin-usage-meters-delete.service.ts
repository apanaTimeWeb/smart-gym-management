// RESPONSIBILITY: Executes the soft-delete flow for the usage-meters feature.
// FLOW: CommandController -> SuperadminUsageMetersDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
@Injectable()
export class SuperadminUsageMetersDeleteService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
  /** Soft-deletes one usage-meters record. */
  async deleteUsageMeters(id: string): Promise<null> { await this.repository.deleteUsageMetersById(id); return null; }
}