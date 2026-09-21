// RESPONSIBILITY: Executes partial update business flow for the integrations feature.
// FLOW: CommandController -> IntegrationsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/backend_superadmin/modules/superadmin/integrations/integrations.mapper';
import type { IntegrationsUpdateInput } from '@/backend_superadmin/modules/superadmin/integrations/types/integrations.interfaces';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';
@Injectable()
export class IntegrationsUpdateService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Updates a integrations record by UUID. */
  async updateIntegrations(id: string, input: IntegrationsUpdateInput): Promise<IntegrationsResponseDto> { return IntegrationsMapper.toResponse(IntegrationsMapper.toDomain(await this.repository.updateIntegrationsById(id, input))); }
}
