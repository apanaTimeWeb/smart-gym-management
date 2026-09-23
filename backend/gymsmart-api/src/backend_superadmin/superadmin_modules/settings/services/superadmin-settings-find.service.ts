// RESPONSIBILITY: Executes single-record retrieval for the settings feature.
// FLOW: QueryController -> SuperadminSettingsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
import { SuperadminSettingsMapper } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.mapper';
import type { SuperadminSettingsDomainModel } from '@/backend_superadmin/superadmin_modules/settings/types/superadmin-settings.interfaces';
@Injectable()
export class SuperadminSettingsFindService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}
  /** Retrieves one active settings record by UUID. */
  async findSettingsById(id: string): Promise<SuperadminSettingsDomainModel> { return SuperadminSettingsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}