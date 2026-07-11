import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateSettingsService } from '../services/update-settings.service';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateSettingsController {
  constructor(private readonly settingsService: UpdateSettingsService) {}
  
  @Patch()
  async execute() {
    return this.settingsService.execute();
  }
}
