import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateBackupsService } from '../services/create-backups.service';
import { CreateBackupRecordDto } from '../dto/create-backups.dto';

@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateBackupsController {
  constructor(private readonly service: CreateBackupsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create BackupRecord' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateBackupRecordDto) {
    return this.service.execute(dto);
  }
}
