import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from '@/modules/settings/settings.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Post()
  updateSettings(@Body() dto: any) {
    return this.settingsService.updateSettings(dto);
  }
}
