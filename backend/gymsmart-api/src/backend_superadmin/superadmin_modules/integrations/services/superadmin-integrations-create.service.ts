// RESPONSIBILITY: Executes creation business flow for the integrations feature.
// FLOW: CommandController -> SuperadminIntegrationsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsMapper } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.mapper';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';
import type { SuperadminIntegrationsCreateInput } from '@/backend_superadmin/superadmin_modules/integrations/types/superadmin-integrations.interfaces';
@Injectable()
export class SuperadminIntegrationsCreateService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
  /** Creates a new integrations record. */
  async createIntegrations(input: SuperadminIntegrationsCreateInput): Promise<SuperadminIntegrationsResponseDto> { return SuperadminIntegrationsMapper.toResponse(SuperadminIntegrationsMapper.toDomain(await this.repository.createIntegrations(input))); }
}