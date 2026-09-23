// RESPONSIBILITY: Projects live platform settings into the governance response consumed by Superadmin UI.
// FLOW: SuperadminSettingsGovernanceQueryController -> SuperadminSettingsGovernanceService -> SuperadminSettingsRepository -> platform settings rows.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsGovernanceResponseDto } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-governance-response.dto';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';

@Injectable()
export class SuperadminSettingsGovernanceService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}

  /** Returns current governance settings from persisted source-of-truth rows. */
  async findSettingsGovernance(): Promise<SuperadminSettingsGovernanceResponseDto> {
    const groups = await this.repository.findGovernanceGroups();
    return {
      billing: groups.billing ?? [],
      security: groups.security ?? [],
      data: groups.data ?? [],
      communication: groups.communication ?? [],
    };
  }
}
