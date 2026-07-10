import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { SettingsService } from '../services/settings.service';
import { CreateSettingDto } from '../dto/create-settings.dto';
import { UpdateSettingDto } from '../dto/update-settings.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Setting' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateSettingDto) {
    return this.settingsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Settings' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Setting' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Setting' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Setting' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }
}
