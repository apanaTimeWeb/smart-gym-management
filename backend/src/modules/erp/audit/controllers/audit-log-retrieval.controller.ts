import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindAuditService } from '../services/find-audit.service';
import { GetAuditLogsDto } from '../dto/get-audit-logs.dto';

@Controller('audit')
export class AuditLogRetrievalController {
  constructor(private readonly findAuditService: FindAuditService) {}

  @Get()
  async getAuditLogs(@Query() query: GetAuditLogsDto) {
    const { page, limit, entityType, actorId } = query;
    return this.findAuditService.findAll(
      page,
      limit,
      entityType,
      actorId,
    );
  }
}
