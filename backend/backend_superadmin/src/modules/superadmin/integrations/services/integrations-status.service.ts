// RESPONSIBILITY: Performs status transitions for integrations records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/modules/superadmin/integrations/integrations.mapper';
import type { IntegrationsDomainModel } from '@/modules/superadmin/integrations/types/integrations.interfaces';
@Injectable()
export class IntegrationsStatusService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeIntegrationsStatus(id: string, status: string): Promise<IntegrationsDomainModel> { return IntegrationsMapper.toDomain(await this.repository.updateIntegrationsById(id, { status })); }
}
