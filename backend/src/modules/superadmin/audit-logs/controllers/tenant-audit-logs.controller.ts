import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { TenantAuditLogsService } from '../services/tenant-audit-logs.service';

@ApiTags('Audit Logs')
@Controller('audit-logs/tenant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TenantAuditLogsController {
  constructor(private readonly service: TenantAuditLogsService) {}
  @Get()
  async execute() { return this.service.execute('tenant-id'); }
}
