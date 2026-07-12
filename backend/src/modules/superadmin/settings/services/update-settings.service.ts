import { UpdateGlobalSettingDto } from '../dto/update-settings.dto';
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';

@Injectable()
export class UpdateSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(id: string, dto: UpdateGlobalSettingDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
