import { UpdateGlobalAuditLogDto } from '../dto/update-audit-logs.dto';
import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';
import { GlobalAuditLogResponse } from '../audit-logs.interfaces';
import { AUDIT_LOGS_MESSAGES } from '../audit-logs.constants';

@Injectable()
export class UpdateAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(id: string, dto: UpdateGlobalAuditLogDto): Promise<GlobalAuditLogResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: AUDIT_LOGS_MESSAGES.UPDATED,
      data
    };
  }
}
