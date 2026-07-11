import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateAuditLogsService } from '../services/create-audit-logs.service';

@ApiTags('AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateAuditLogsController {
  constructor(private readonly auditLogsService: CreateAuditLogsService) {}
  
  @Post()
  async execute() {
    return this.auditLogsService.execute();
  }
}
