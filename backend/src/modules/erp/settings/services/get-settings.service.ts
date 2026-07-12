import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { SettingsRepository } from '../settings.repository';
import { SETTINGS_CONSTANTS } from '../settings.constants';

@Injectable()
export class GetSettingsService {
  private readonly logger = new Logger(GetSettingsService.name);

  constructor(
    private readonly repository: SettingsRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute() {
    const dataSource = (this.repository as any).dataSource;
    const dbName = typeof dataSource?.options?.database === 'string' 
      ? dataSource.options.database 
      : 'default';
      
    const cacheKey = `settings_${dbName}`;
    
    const cachedSettings = await this.cacheManager.get(cacheKey);
    if (cachedSettings) {
      this.logger.log(`Returning settings from cache for ${dbName}`);
      return { success: true, data: cachedSettings };
    }

    this.logger.log(`Fetching settings from DB for ${dbName}`);
    let settings = await this.repository.findFirst();
    if (!settings) {
      this.logger.log(`Initializing default settings`);
      settings = await this.repository.create(SETTINGS_CONSTANTS.DEFAULT_VALUES);
    }
    
    await this.cacheManager.set(cacheKey, settings, 3600 * 1000); // 1 hour
    return { success: true, data: settings };
  }
}
