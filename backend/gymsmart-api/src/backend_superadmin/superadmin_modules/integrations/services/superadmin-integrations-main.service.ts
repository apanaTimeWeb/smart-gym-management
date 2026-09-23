// RESPONSIBILITY: Builds the integrations overview from authoritative tenant and integration-key persistence.
// FLOW: Controller -> SuperadminIntegrationsMainService -> SuperadminIntegrationsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsResponseDataDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response-data.dto';

@Injectable()
export class SuperadminIntegrationsMainService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}

  /** Returns the live integrations overview. */
  async findIntegrationsData(_input: unknown = {}): Promise<SuperadminIntegrationsResponseDataDto> {
    return this.repository.getLiveOverview();
  }
}
