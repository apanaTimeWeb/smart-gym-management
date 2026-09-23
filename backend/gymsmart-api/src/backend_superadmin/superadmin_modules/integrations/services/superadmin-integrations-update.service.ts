// RESPONSIBILITY: Executes partial update business flow for the integrations feature.
// FLOW: CommandController -> SuperadminIntegrationsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsMapper } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.mapper';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';
import type { SuperadminIntegrationsUpdateInput } from '@/backend_superadmin/superadmin_modules/integrations/types/superadmin-integrations.interfaces';
@Injectable()
export class SuperadminIntegrationsUpdateService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
  /** Updates a integrations record by UUID. */
  async updateIntegrations(id: string, input: SuperadminIntegrationsUpdateInput): Promise<SuperadminIntegrationsResponseDto> { return SuperadminIntegrationsMapper.toResponse(SuperadminIntegrationsMapper.toDomain(await this.repository.updateIntegrationsById(id, input))); }
}