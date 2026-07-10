import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from '../dto/create-settings.dto';
import { UpdateSettingDto } from '../dto/update-settings.dto';

@Injectable()
export class SettingsService {
  create(createDto: CreateSettingDto) {
    return { success: true, message: 'This action adds a new settings' };
  }

  findAll() {
    return { success: true, message: 'This action returns all settings' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} settings` };
  }

  update(id: string, updateDto: UpdateSettingDto) {
    return { success: true, message: `This action updates a #${id} settings` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} settings` };
  }
}
