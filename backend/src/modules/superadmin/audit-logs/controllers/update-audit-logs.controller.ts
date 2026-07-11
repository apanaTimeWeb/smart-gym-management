import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateAuditLogsService } from '../services/update-audit-logs.service';

@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateAuditLogsController {
  constructor(private readonly auditLogsService: UpdateAuditLogsService) {}
  
  @Patch()
  async execute() {
    return this.auditLogsService.execute();
  }
}
