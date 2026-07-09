import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingRepository: Repository<Settings>,
  ) {}

  async getSettings() {
    let settings = await this.settingRepository.findOne({ where: {} });
    if (!settings) {
      settings = this.settingRepository.create({
        gymName: 'GymSmart Fitness',
        ownerName: 'Admin',
        phone: '',
        email: '',
        city: '',
        gstNumber: '',
      });
      await this.settingRepository.save(settings);
    }
    return { success: true, data: settings };
  }

  async updateSettings(dto: any) {
    let settings = await this.settingRepository.findOne({ where: {} });
    if (settings) {
      await this.settingRepository.update(settings.id, dto);
      const data = await this.settingRepository.findOne({ where: {} });
      return { success: true, data };
    } else {
      const newSettings = this.settingRepository.create(dto);
      const data = await this.settingRepository.save(newSettings);
      return { success: true, data };
    }
  }
}
