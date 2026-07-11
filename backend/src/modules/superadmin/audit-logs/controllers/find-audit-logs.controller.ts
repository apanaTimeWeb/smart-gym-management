import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindAuditLogsService } from '../services/find-audit-logs.service';

@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindAuditLogsController {
  constructor(private readonly auditLogsService: FindAuditLogsService) {}
  
  @Get()
  async execute() {
    return this.auditLogsService.execute();
  }
}
