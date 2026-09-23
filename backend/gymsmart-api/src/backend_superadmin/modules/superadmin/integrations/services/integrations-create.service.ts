// RESPONSIBILITY: Executes creation business flow for the integrations feature.
// FLOW: CommandController -> IntegrationsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
import { IntegrationsMapper } from '@/backend_superadmin/modules/superadmin/integrations/integrations.mapper';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';
import type { IntegrationsCreateInput } from '@/backend_superadmin/modules/superadmin/integrations/types/integrations.interfaces';
@Injectable()
export class IntegrationsCreateService {
  constructor(private readonly repository: IntegrationsRepository) {}
  /** Creates a new integrations record. */
  async createIntegrations(input: IntegrationsCreateInput): Promise<IntegrationsResponseDto> { return IntegrationsMapper.toResponse(IntegrationsMapper.toDomain(await this.repository.createIntegrations(input))); }
}