import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Settings } from './entities/setting.entity';
import { SettingsRepository } from './settings.repository';

import { GetSettingsController } from './controllers/get-settings.controller';
import { UpdateSettingsController } from './controllers/update-settings.controller';

import { GetSettingsService } from './services/get-settings.service';
import { UpdateSettingsService } from './services/update-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [GetSettingsController, UpdateSettingsController],
  providers: [SettingsRepository, GetSettingsService, UpdateSettingsService],
})
export class SettingsModule {}
