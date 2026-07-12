import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalSetting } from './entities/settings.entity';
import { CreateSettingsController } from './controllers/create-settings.controller';
import { FindSettingsController } from './controllers/find-settings.controller';
import { UpdateSettingsController } from './controllers/update-settings.controller';
import { DeleteSettingsController } from './controllers/delete-settings.controller';
import { CreateSettingsService } from './services/create-settings.service';
import { FindSettingsService } from './services/find-settings.service';
import { UpdateSettingsService } from './services/update-settings.service';
import { DeleteSettingsService } from './services/delete-settings.service';
import { SettingsRepository } from './settings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalSetting])],
  controllers: [CreateSettingsController, FindSettingsController, UpdateSettingsController, DeleteSettingsController],
  providers: [CreateSettingsService, FindSettingsService, UpdateSettingsService, DeleteSettingsService, SettingsRepository],
})
export class SettingsModule {}
