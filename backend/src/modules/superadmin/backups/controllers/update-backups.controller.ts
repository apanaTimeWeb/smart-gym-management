import { Controller, Patch, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateBackupsService } from '../services/update-backups.service';
import { UpdateBackupRecordDto } from '../dto/update-backups.dto';

@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateBackupsController {
  constructor(private readonly service: UpdateBackupsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update BackupRecord' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateBackupRecordDto) {
    return this.service.execute(id, dto);
  }
}
