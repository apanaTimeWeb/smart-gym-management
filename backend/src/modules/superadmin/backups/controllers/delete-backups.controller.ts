import { Controller, Delete, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteBackupsService } from '../services/delete-backups.service';


@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteBackupsController {
  constructor(private readonly service: DeleteBackupsService) {}
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete BackupRecord' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
