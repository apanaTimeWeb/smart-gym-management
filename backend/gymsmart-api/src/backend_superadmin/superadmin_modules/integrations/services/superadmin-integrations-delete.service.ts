// RESPONSIBILITY: Executes the soft-delete flow for the integrations feature.
// FLOW: CommandController -> SuperadminIntegrationsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
@Injectable()
export class SuperadminIntegrationsDeleteService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
  /** Soft-deletes one integrations record. */
  async deleteIntegrations(id: string): Promise<null> { await this.repository.deleteIntegrationsById(id); return null; }
}