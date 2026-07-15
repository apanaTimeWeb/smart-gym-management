import { UpdateGlobalSettingDto } from '../dto/update-settings.dto';
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';
import { SettingResponse } from '../settings.interfaces';
import { SETTINGS_MESSAGES } from '../settings.constants';

@Injectable()
export class UpdateSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(id: string, dto: UpdateGlobalSettingDto): Promise<SettingResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: SETTINGS_MESSAGES.UPDATED,
      data
    };
  }
}
