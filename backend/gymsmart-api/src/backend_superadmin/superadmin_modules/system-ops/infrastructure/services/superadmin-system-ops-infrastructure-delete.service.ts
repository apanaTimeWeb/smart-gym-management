// RESPONSIBILITY: Executes the soft-delete flow for the infrastructure feature.
// FLOW: CommandController -> SuperadminInfrastructureDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
@Injectable()
export class SuperadminInfrastructureDeleteService {
  constructor(private readonly repository: SuperadminInfrastructureRepository) {}
  /** Soft-deletes one infrastructure record. */
  async deleteInfrastructure(id: string): Promise<null> { await this.repository.deleteInfrastructureById(id); return null; }
}