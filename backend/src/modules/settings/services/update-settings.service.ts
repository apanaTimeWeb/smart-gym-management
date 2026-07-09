import { Injectable, Logger } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';
import { UpdateSettingsDto } from '../dto/update-settings.dto';
import { SETTINGS_CONSTANTS } from '../settings.constants';

@Injectable()
export class UpdateSettingsService {
  private readonly logger = new Logger(UpdateSettingsService.name);

  constructor(private readonly repository: SettingsRepository) {}

  async execute(dto: UpdateSettingsDto) {
    this.logger.log(`Updating settings`);
    let settings = await this.repository.findFirst();
    
    if (settings) {
      await this.repository.settingRepository.update(settings.id, dto);
      const data = await this.repository.findFirst();
      return { success: true, data };
    } else {
      const initData = { ...SETTINGS_CONSTANTS.DEFAULT_VALUES, ...dto };
      const newSettings = this.repository.settingRepository.create(initData);
      const data = await this.repository.settingRepository.save(newSettings);
      return { success: true, data };
    }
  }
}
