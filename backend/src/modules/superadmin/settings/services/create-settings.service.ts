import { CreateGlobalSettingDto } from '../dto/create-settings.dto';
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';
import { SettingResponse } from '../settings.interfaces';
import { SETTINGS_MESSAGES } from '../settings.constants';

@Injectable()
export class CreateSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(dto: CreateGlobalSettingDto): Promise<SettingResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: SETTINGS_MESSAGES.CREATED,
      data
    };
  }
}
