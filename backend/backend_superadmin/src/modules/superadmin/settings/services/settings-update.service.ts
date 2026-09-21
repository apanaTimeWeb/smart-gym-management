// RESPONSIBILITY: Executes partial update business flow for the settings feature.
// FLOW: CommandController -> SettingsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '@/modules/superadmin/settings/settings.repository';
import { SettingsMapper } from '@/modules/superadmin/settings/settings.mapper';
import type { SettingsDomainModel, SettingsUpdateInput } from '@/modules/superadmin/settings/types/settings.interfaces';
@Injectable()
export class SettingsUpdateService {
  constructor(private readonly repository: SettingsRepository) {}
  /** Updates a settings record by UUID. */
  async updateSettings(id: string, input: SettingsUpdateInput): Promise<SettingsDomainModel> { return SettingsMapper.toDomain(await this.repository.updateSettingsById(id, input)); }
}
