// RESPONSIBILITY: Executes the soft-delete flow for the settings feature.
// FLOW: CommandController -> SuperadminSettingsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
@Injectable()
export class SuperadminSettingsDeleteService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}
  /** Soft-deletes one settings record. */
  async deleteSettings(id: string): Promise<null> { await this.repository.deleteSettingsById(id); return null; }
}