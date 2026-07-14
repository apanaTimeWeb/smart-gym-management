import { Injectable, Logger } from '@nestjs/common';
import { AuditRepository } from '../audit.repository';
import { AuditLog } from '../entities/audit-log.entity';

@Injectable()
export class CreateAuditService {
  private readonly logger = new Logger(CreateAuditService.name);

  constructor(private readonly auditRepository: AuditRepository) {}

  async createAuditLog(data: Partial<AuditLog>): Promise<{ success: boolean; message: string }> {
    try {
      await this.auditRepository.create(data);
      return { success: true, message: 'Audit log created successfully' };
    } catch (error) {
      this.logger.error(
        `Failed to save audit log: ${error.message}`,
        error.stack,
      );
      return { success: false, message: 'Failed to save audit log' };
    }
  }
}
