import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateSettingsService } from '../services/create-settings.service';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateSettingsController {
  constructor(private readonly settingsService: CreateSettingsService) {}
  
  @Post()
  async execute() {
    return this.settingsService.execute();
  }
}
