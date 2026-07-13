import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';
import { SettingResponse } from '../settings.interfaces';
import { SETTINGS_MESSAGES } from '../settings.constants';

@Injectable()
export class DeleteSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(id: string): Promise<SettingResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: SETTINGS_MESSAGES.DELETED,
      data: null
    };
  }
}
