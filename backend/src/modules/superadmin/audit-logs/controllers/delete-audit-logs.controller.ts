import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteAuditLogsService } from '../services/delete-audit-logs.service';

@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteAuditLogsController {
  constructor(private readonly auditLogsService: DeleteAuditLogsService) {}
  
  @Delete()
  async execute() {
    return this.auditLogsService.execute();
  }
}
