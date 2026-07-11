import { Controller, Post, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateSettingsService } from '../services/create-settings.service';
import { CreateGlobalSettingDto } from '../dto/create-settings.dto';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateSettingsController {
  constructor(private readonly service: CreateSettingsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create GlobalSetting' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateGlobalSettingDto) {
    return this.service.execute(dto);
  }
}
