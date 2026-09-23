// RESPONSIBILITY: Executes single-record retrieval for the integrations feature.
// FLOW: QueryController -> SuperadminIntegrationsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsMapper } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.mapper';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';
@Injectable()
export class SuperadminIntegrationsFindService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
  /** Retrieves one active integrations record by UUID. */
  async findIntegrationsById(id: string): Promise<SuperadminIntegrationsResponseDto> { return SuperadminIntegrationsMapper.toResponse(SuperadminIntegrationsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}