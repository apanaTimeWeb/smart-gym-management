import { Injectable, Logger } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';
import { SETTINGS_CONSTANTS } from '../settings.constants';

@Injectable()
export class GetSettingsService {
  private readonly logger = new Logger(GetSettingsService.name);

  constructor(private readonly repository: SettingsRepository) {}

  async execute() {
    this.logger.log(`Fetching settings`);
    let settings = await this.repository.findFirst();
    if (!settings) {
      this.logger.log(`Initializing default settings`);
      settings = this.repository.settingRepository.create(
        SETTINGS_CONSTANTS.DEFAULT_VALUES,
      );
      await this.repository.settingRepository.save(settings);
    }
    return { success: true, data: settings };
  }
}
