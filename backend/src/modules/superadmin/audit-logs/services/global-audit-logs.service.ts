import { Injectable, Logger } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';
import { GlobalAuditLogResponse } from '../audit-logs.interfaces';
import { AUDIT_LOGS_MESSAGES } from '../audit-logs.constants';

@Injectable()
export class GlobalAuditLogsService {
  private readonly logger = new Logger(GlobalAuditLogsService.name);
  
  constructor(private readonly repository: AuditLogsRepository) {}

  async execute(): Promise<GlobalAuditLogResponse> {
    this.logger.log('Fetching global audit logs');
    const data = await this.repository.findAll();
    return { 
      success: true, 
      message: AUDIT_LOGS_MESSAGES.FETCHED,
      data 
    };
  }
}
