// RESPONSIBILITY: Projects live platform settings into the governance response consumed by Superadmin UI.
// FLOW: SettingsGovernanceQueryController -> SettingsGovernanceService -> SettingsRepository -> platform settings rows.
import { Injectable } from '@nestjs/common';
import { SettingsGovernanceResponseDto } from '@/backend_superadmin/modules/backend_superadmin/settings/settings-governance-response.dto';
import { SettingsRepository } from '@/backend_superadmin/modules/backend_superadmin/settings/settings.repository';

@Injectable()
export class SettingsGovernanceService {
  constructor(private readonly repository: SettingsRepository) {}

  /** Returns current governance settings from persisted source-of-truth rows. */
  async findSettingsGovernance(): Promise<SettingsGovernanceResponseDto> {
    const groups = await this.repository.findGovernanceGroups();
    return {
      billing: groups.billing ?? [],
      security: groups.security ?? [],
      data: groups.data ?? [],
      communication: groups.communication ?? [],
    };
  }
}
