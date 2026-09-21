// RESPONSIBILITY: Executes the soft-delete flow for the infrastructure feature.
// FLOW: CommandController -> InfrastructureDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
@Injectable()
export class InfrastructureDeleteService {
  constructor(private readonly repository: InfrastructureRepository) {}
  /** Soft-deletes one infrastructure record. */
  async deleteInfrastructure(id: string): Promise<null> { await this.repository.deleteInfrastructureById(id); return null; }
}
