import { Injectable, Logger } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';

@Injectable()
export class GlobalAuditLogsService {
  private readonly logger = new Logger(GlobalAuditLogsService.name);
  
  constructor(private readonly repository: AuditLogsRepository) {}

  async execute() {
    this.logger.log('Fetching global audit logs');
    const logs = await this.repository.findAll();
    return { success: true, data: logs };
  }
}
