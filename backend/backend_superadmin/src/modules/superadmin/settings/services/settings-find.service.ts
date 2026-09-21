// RESPONSIBILITY: Executes single-record retrieval for the settings feature.
// FLOW: QueryController -> SettingsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '@/modules/superadmin/settings/settings.repository';
import { SettingsMapper } from '@/modules/superadmin/settings/settings.mapper';
import type { SettingsDomainModel } from '@/modules/superadmin/settings/types/settings.interfaces';
@Injectable()
export class SettingsFindService {
  constructor(private readonly repository: SettingsRepository) {}
  /** Retrieves one active settings record by UUID. */
  async findSettingsById(id: string): Promise<SettingsDomainModel> { return SettingsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
