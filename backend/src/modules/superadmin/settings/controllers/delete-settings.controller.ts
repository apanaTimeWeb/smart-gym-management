import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteSettingsService } from '../services/delete-settings.service';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteSettingsController {
  constructor(private readonly settingsService: DeleteSettingsService) {}
  
  @Delete()
  async execute() {
    return this.settingsService.execute();
  }
}
