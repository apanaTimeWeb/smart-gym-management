import { Controller, Post, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateAuditLogsService } from '../services/create-audit-logs.service';
import { CreateGlobalAuditLogDto } from '../dto/create-audit-logs.dto';

@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateAuditLogsController {
  constructor(private readonly service: CreateAuditLogsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create GlobalAuditLog' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateGlobalAuditLogDto) {
    return this.service.execute(dto);
  }
}
