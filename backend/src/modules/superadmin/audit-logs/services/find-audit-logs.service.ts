import { Injectable , NotFoundException} from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';
import { GlobalAuditLogResponse } from '../audit-logs.interfaces';
import { AUDIT_LOGS_MESSAGES, AUDIT_LOGS_ERRORS } from '../audit-logs.constants';

@Injectable()
export class FindAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(): Promise<GlobalAuditLogResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: AUDIT_LOGS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<GlobalAuditLogResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(AUDIT_LOGS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: AUDIT_LOGS_MESSAGES.FETCHED,
      data
    };
  }
}
