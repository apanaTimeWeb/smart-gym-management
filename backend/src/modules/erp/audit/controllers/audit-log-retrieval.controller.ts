import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindAuditService } from '../services/find-audit.service';
import { GetAuditLogsDto } from '../dto/get-audit-logs.dto';

@Controller('audit')
export class AuditLogRetrievalController {
  constructor(private readonly findAuditService: FindAuditService) {}

  @Get()
  async getAuditLogs(@Query() query: GetAuditLogsDto) {
    const { page, limit, entityType, actorId } = query;
    const { data, total } = await this.findAuditService.findAll(
      page,
      limit,
      entityType,
      actorId,
    );
    
    // Per Rule 28, returning object that interceptor will wrap
    // The wrapper usually expects data and meta from controller if pagination exists
    return {
      data,
      meta: {
        page: page || 1,
        limit: limit || 10,
        total,
      },
      message: 'Audit logs retrieved successfully'
    };
  }
}
