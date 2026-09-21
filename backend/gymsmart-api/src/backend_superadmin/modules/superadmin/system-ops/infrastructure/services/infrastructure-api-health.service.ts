// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> InfrastructureApiHealthService -> InfrastructureContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InfrastructureApiHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-api-health-response.dto';
import { InfrastructureContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.repository';
import { INFRASTRUCTURE_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.constants';

@Injectable()
export class InfrastructureApiHealthService {
  constructor(private readonly repository: InfrastructureContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findInfrastructureApiHealth(input: Record<string, unknown> = {}): Promise<InfrastructureApiHealthResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(INFRASTRUCTURE_SNAPSHOT_KINDS.API_HEALTH);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as unknown as InfrastructureApiHealthResponseDto;
  }
}
