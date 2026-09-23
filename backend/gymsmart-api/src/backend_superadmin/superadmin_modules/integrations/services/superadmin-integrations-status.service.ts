// RESPONSIBILITY: Performs status transitions for integrations records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationKeyStatus } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsMapper } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.mapper';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';
@Injectable()
export class SuperadminIntegrationsStatusService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeIntegrationsStatus(id: string, status: string): Promise<SuperadminIntegrationsResponseDto> { return SuperadminIntegrationsMapper.toResponse(SuperadminIntegrationsMapper.toDomain(await this.repository.updateIntegrationsById(id, { status: status as IntegrationKeyStatus }))); }
}