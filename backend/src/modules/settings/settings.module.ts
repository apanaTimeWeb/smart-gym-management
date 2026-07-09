import { Module } from '@nestjs/common';
import { SettingsController } from '@/modules/settings/settings.controller';
import { SettingsService } from '@/modules/settings/settings.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './entities/setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
