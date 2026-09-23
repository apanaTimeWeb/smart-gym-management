// RESPONSIBILITY: Executes creation business flow for the settings feature.
// FLOW: CommandController -> SuperadminSettingsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
import { SuperadminSettingsMapper } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.mapper';
import type { SuperadminSettingsCreateInput, SuperadminSettingsDomainModel } from '@/backend_superadmin/superadmin_modules/settings/types/superadmin-settings.interfaces';
@Injectable()
export class SuperadminSettingsCreateService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}
  /** Creates a new settings record. */
  async createSettings(input: SuperadminSettingsCreateInput): Promise<SuperadminSettingsDomainModel> { return SuperadminSettingsMapper.toDomain(await this.repository.createSettings(input)); }
}