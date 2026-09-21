// RESPONSIBILITY: Executes partial update business flow for the integrations feature.
// FLOW: CommandController -> IntegrationsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/modules/superadmin/integrations/integrations.mapper';
import type { IntegrationsDomainModel, IntegrationsUpdateInput } from '@/modules/superadmin/integrations/types/integrations.interfaces';
@Injectable()
export class IntegrationsUpdateService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Updates a integrations record by UUID. */
  async updateIntegrations(id: string, input: IntegrationsUpdateInput): Promise<IntegrationsDomainModel> { return IntegrationsMapper.toDomain(await this.repository.updateIntegrationsById(id, input)); }
}
