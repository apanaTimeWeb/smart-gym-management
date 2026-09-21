// RESPONSIBILITY: Executes creation business flow for the integrations feature.
// FLOW: CommandController -> IntegrationsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/modules/superadmin/integrations/integrations.mapper';
import type { IntegrationsCreateInput, IntegrationsDomainModel } from '@/modules/superadmin/integrations/types/integrations.interfaces';
@Injectable()
export class IntegrationsCreateService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Creates a new integrations record. */
  async createIntegrations(input: IntegrationsCreateInput): Promise<IntegrationsDomainModel> { return IntegrationsMapper.toDomain(await this.repository.createIntegrations(input)); }
}
