// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> IntegrationsMainService -> IntegrationsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { IntegrationsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations-contract-snapshot.repository';
import { INTEGRATIONS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/integrations/integrations.constants';
import { SuperadminIntegrationsResponseDataDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response-data.dto';

@Injectable()
export class IntegrationsMainService {
  constructor(private readonly repository: IntegrationsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findIntegrationsData(input: Record<string, unknown> = {}): Promise<SuperadminIntegrationsResponseDataDto> {
    void input;
    const payload = await this.repository.findLatestByKind(INTEGRATIONS_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as unknown as SuperadminIntegrationsResponseDataDto;
  }
}
