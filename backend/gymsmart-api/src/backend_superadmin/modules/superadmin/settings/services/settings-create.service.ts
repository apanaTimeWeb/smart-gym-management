// RESPONSIBILITY: Executes creation business flow for the settings feature.
// FLOW: CommandController -> SettingsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '@/backend_superadmin/modules/superadmin/settings/settings.repository';
import { SettingsMapper } from '@/backend_superadmin/modules/superadmin/settings/settings.mapper';
import type { SettingsCreateInput, SettingsDomainModel } from '@/backend_superadmin/modules/superadmin/settings/types/settings.interfaces';
@Injectable()
export class SettingsCreateService {
  constructor(private readonly repository: SettingsRepository) {}
  /** Creates a new settings record. */
  async createSettings(input: SettingsCreateInput): Promise<SettingsDomainModel> { return SettingsMapper.toDomain(await this.repository.createSettings(input)); }
}