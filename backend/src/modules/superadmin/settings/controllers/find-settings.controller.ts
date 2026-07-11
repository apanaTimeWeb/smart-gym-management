import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindSettingsService } from '../services/find-settings.service';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindSettingsController {
  constructor(private readonly settingsService: FindSettingsService) {}
  
  @Get()
  async execute() {
    return this.settingsService.execute();
  }
}
