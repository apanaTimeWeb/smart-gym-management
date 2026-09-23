// RESPONSIBILITY: Builds the integrations overview from authoritative tenant and integration-key persistence.
// FLOW: Controller -> IntegrationsMainService -> IntegrationsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { IntegrationsRepository } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.repository';
import { SuperadminIntegrationsResponseDataDto } from '@/backend_superadmin/modules/backend_superadmin/integrations/responses/integrations-response-data.dto';

@Injectable()
export class IntegrationsMainService {
  constructor(private readonly repository: IntegrationsRepository) {}

  /** Returns the live integrations overview. */
  async findIntegrationsData(_input: unknown = {}): Promise<SuperadminIntegrationsResponseDataDto> {
    return this.repository.getLiveOverview();
  }
}
