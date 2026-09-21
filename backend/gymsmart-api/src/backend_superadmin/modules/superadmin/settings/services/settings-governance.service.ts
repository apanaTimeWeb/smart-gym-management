// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SettingsGovernanceService -> SettingsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingsGovernanceResponseDto } from '@/backend_superadmin/modules/superadmin/settings/settings-governance-response.dto';
import { SettingsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/settings/settings-contract-snapshot.repository';
import { SETTINGS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/settings/settings.constants';

@Injectable()
export class SettingsGovernanceService {
  constructor(private readonly repository: SettingsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findSettingsGovernance(input: Record<string, unknown> = {}): Promise<SettingsGovernanceResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(SETTINGS_SNAPSHOT_KINDS.GOVERNANCE);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as SettingsGovernanceResponseDto;
  }
}
