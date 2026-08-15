import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { GlobalAuditLogsService } from '../services/global-audit-logs.service';

@ApiTags('Audit Logs')
@Controller('audit-logs/global')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class GlobalAuditLogsController {
  constructor(private readonly service: GlobalAuditLogsService) {}
  @Get()
  async execute() { return this.service.execute(); }
}
