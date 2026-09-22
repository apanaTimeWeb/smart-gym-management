// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/settings.
// FLOW: Controller -> SettingsFetchSettingsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { SettingsRepository } from '@/backend_manager/modules/manager/settings/repositories/settings-repository';

@Injectable()
export class SettingsFetchSettingsService {
  constructor(private readonly repository: SettingsRepository) {}

  /** @description Loads the settings collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchSettings(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findSettingsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { notificationTemplates: rows,  }, meta: result.meta };
  }
}
