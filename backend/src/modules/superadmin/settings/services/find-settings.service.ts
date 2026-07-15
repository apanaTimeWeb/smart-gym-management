import { Injectable , NotFoundException} from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';
import { SettingResponse } from '../settings.interfaces';
import { SETTINGS_MESSAGES, SETTINGS_ERRORS } from '../settings.constants';

@Injectable()
export class FindSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(): Promise<SettingResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: SETTINGS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<SettingResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(SETTINGS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: SETTINGS_MESSAGES.FETCHED,
      data
    };
  }
}
