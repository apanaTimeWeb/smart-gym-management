// RESPONSIBILITY: Executes the soft-delete flow for the settings feature.
// FLOW: CommandController -> SettingsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '@/backend_superadmin/modules/backend_superadmin/settings/settings.repository';
@Injectable()
export class SettingsDeleteService {
  constructor(private readonly repository: SettingsRepository) {}
  /** Soft-deletes one settings record. */
  async deleteSettings(id: string): Promise<null> { await this.repository.deleteSettingsById(id); return null; }
}