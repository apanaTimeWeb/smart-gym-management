import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { SettingsRepository } from '../settings.repository';
import { UpdateSettingsDto } from '../dto/update-settings.dto';
import { SETTINGS_CONSTANTS } from '../settings.constants';

@Injectable()
export class UpdateSettingsService {
  private readonly logger = new Logger(UpdateSettingsService.name);

  constructor(
    private readonly repository: SettingsRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(dto: UpdateSettingsDto) {
    this.logger.log(`Updating settings`);
    
    const dataSource = (this.repository as any).dataSource;
    const dbName = typeof dataSource?.options?.database === 'string' 
      ? dataSource.options.database 
      : 'default';
    const cacheKey = `settings_${dbName}`;

    let settings = await this.repository.findFirst();

    if (settings) {
      await this.repository.update(settings.id, dto);
    } else {
      const initData = { ...SETTINGS_CONSTANTS.DEFAULT_VALUES, ...dto };
      await this.repository.create(initData);
    }
    
    // Invalidate cache
    await this.cacheManager.del(cacheKey);
    
    const data = await this.repository.findFirst();
    return { success: true, data };
  }
}
