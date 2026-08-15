import { CreateGlobalAuditLogDto } from '../dto/create-audit-logs.dto';
import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';
import { GlobalAuditLogResponse } from '../audit-logs.interfaces';
import { AUDIT_LOGS_MESSAGES } from '../audit-logs.constants';

@Injectable()
export class CreateAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(dto: CreateGlobalAuditLogDto): Promise<GlobalAuditLogResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: AUDIT_LOGS_MESSAGES.CREATED,
      data
    };
  }
}
