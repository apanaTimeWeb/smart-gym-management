// RESPONSIBILITY: Executes partial update business flow for the settings feature.
// FLOW: CommandController -> SuperadminSettingsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
import { SuperadminSettingsMapper } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.mapper';
import type { SuperadminSettingsDomainModel, SuperadminSettingsUpdateInput } from '@/backend_superadmin/superadmin_modules/settings/types/superadmin-settings.interfaces';
@Injectable()
export class SuperadminSettingsUpdateService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}
  /** Updates a settings record by UUID. */
  async updateSettings(id: string, input: SuperadminSettingsUpdateInput): Promise<SuperadminSettingsDomainModel> { return SuperadminSettingsMapper.toDomain(await this.repository.updateSettingsById(id, input)); }
}