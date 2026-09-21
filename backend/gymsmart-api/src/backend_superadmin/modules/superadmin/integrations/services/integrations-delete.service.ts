// RESPONSIBILITY: Executes the soft-delete flow for the integrations feature.
// FLOW: CommandController -> IntegrationsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
@Injectable()
export class IntegrationsDeleteService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Soft-deletes one integrations record. */
  async deleteIntegrations(id: string): Promise<null> { await this.repository.deleteIntegrationsById(id); return null; }
}
