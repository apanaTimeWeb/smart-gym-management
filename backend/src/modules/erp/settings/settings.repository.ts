import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource  } from 'typeorm';
import { Settings } from '@/modules/erp/settings/entities/setting.entity';

@Injectable()
export class SettingsRepository {
    public readonly settingsRepository: Repository<Settings>;

    public readonly settingRepository: Repository<Settings>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.settingRepository = this.dataSource.getRepository(Settings);
  }

  async findFirst() {
    return this.settingRepository.findOne({ where: {} });
  }
}
