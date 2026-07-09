import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '@/modules/settings/entities/setting.entity';

@Injectable()
export class SettingsRepository {
  constructor(
    @InjectRepository(Settings)
    public readonly settingRepository: Repository<Settings>,
  ) {}

  async findFirst() {
    return this.settingRepository.findOne({ where: {} });
  }
}
