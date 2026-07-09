import { Controller, Post, Body, UseGuards , HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateSettingsService } from '../services/update-settings.service';
import { UpdateSettingsDto } from '../dto/update-settings.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Settings')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('settings')
export class UpdateSettingsController {
  constructor(private readonly updateSettingsService: UpdateSettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Update global gym settings' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Settings updated successfully' })
  execute(@Body() dto: UpdateSettingsDto) {
    return this.updateSettingsService.execute(dto);
  }
}
