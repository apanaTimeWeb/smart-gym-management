import { Controller, Patch, Get, Post, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateAuditLogsService } from '../services/update-audit-logs.service';
import { UpdateGlobalAuditLogDto } from '../dto/update-audit-logs.dto';

@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateAuditLogsController {
  constructor(private readonly service: UpdateAuditLogsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update GlobalAuditLog' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateGlobalAuditLogDto) {
    return this.service.execute(id, dto);
  }
}
