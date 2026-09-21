// RESPONSIBILITY: Executes single-record retrieval for the integrations feature.
// FLOW: QueryController -> IntegrationsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/modules/superadmin/integrations/integrations.mapper';
import type { IntegrationsDomainModel } from '@/modules/superadmin/integrations/types/integrations.interfaces';
@Injectable()
export class IntegrationsFindService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Retrieves one active integrations record by UUID. */
  async findIntegrationsById(id: string): Promise<IntegrationsDomainModel> { return IntegrationsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
