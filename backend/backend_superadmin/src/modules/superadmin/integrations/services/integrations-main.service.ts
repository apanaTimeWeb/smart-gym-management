// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> IntegrationsMainService -> IntegrationsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { IntegrationsContractSnapshotRepository } from '@/modules/superadmin/integrations/integrations-contract-snapshot.repository';
import { INTEGRATIONS_SNAPSHOT_KINDS } from '@/modules/superadmin/integrations/integrations.constants';

@Injectable()
export class IntegrationsMainService {
  constructor(private readonly repository: IntegrationsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findIntegrationsData(input: Record<string, unknown> = {}): Promise<unknown> {
    void input;
    const payload = await this.repository.findLatestByKind(INTEGRATIONS_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload;
  }
}
