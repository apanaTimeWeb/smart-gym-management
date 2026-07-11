import { Controller, Get, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindAuditLogsService } from '../services/find-audit-logs.service';


@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindAuditLogsController {
  constructor(private readonly service: FindAuditLogsService) {}
  
  @Get()
  async executeAll() {
    return this.service.execute();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find GlobalAuditLog' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
