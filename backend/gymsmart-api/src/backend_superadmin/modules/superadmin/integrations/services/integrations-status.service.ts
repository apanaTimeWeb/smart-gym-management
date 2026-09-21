// RESPONSIBILITY: Performs status transitions for integrations records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/backend_superadmin/modules/superadmin/integrations/integrations.mapper';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';
@Injectable()
export class IntegrationsStatusService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeIntegrationsStatus(id: string, status: string): Promise<IntegrationsResponseDto> { return IntegrationsMapper.toResponse(IntegrationsMapper.toDomain(await this.repository.updateIntegrationsById(id, { status: status as any }))); }
}
