// RESPONSIBILITY: Executes single-record retrieval for the integrations feature.
// FLOW: QueryController -> IntegrationsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.mapper';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/integrations/responses/integrations-response.dto';
@Injectable()
export class IntegrationsFindService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Retrieves one active integrations record by UUID. */
  async findIntegrationsById(id: string): Promise<IntegrationsResponseDto> { return IntegrationsMapper.toResponse(IntegrationsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}