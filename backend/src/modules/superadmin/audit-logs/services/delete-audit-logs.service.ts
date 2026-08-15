import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';
import { GlobalAuditLogResponse } from '../audit-logs.interfaces';
import { AUDIT_LOGS_MESSAGES } from '../audit-logs.constants';

@Injectable()
export class DeleteAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(id: string): Promise<GlobalAuditLogResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: AUDIT_LOGS_MESSAGES.DELETED,
      data: null
    };
  }
}
