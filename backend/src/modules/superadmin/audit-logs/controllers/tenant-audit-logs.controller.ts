import { Controller, Get, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { TenantAuditLogsService } from '../services/tenant-audit-logs.service';

@ApiTags('Audit Logs')
@Controller('audit-logs/tenant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TenantAuditLogsController {
  constructor(private readonly service: TenantAuditLogsService) {}
  
  @Get()
  @ApiOperation({ summary: 'Find Tenant AuditLogs' })
  async execute(@Query('tenantId') tenantId: string) { 
    if (!tenantId) throw new BadRequestException('tenantId query parameter is required');
    return this.service.execute(tenantId); 
  }
}
