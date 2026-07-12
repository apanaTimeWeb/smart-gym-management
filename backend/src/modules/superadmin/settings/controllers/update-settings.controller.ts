import { Controller, Patch, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateSettingsService } from '../services/update-settings.service';
import { UpdateGlobalSettingDto } from '../dto/update-settings.dto';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateSettingsController {
  constructor(private readonly service: UpdateSettingsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update GlobalSetting' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateGlobalSettingDto) {
    return this.service.execute(id, dto);
  }
}
