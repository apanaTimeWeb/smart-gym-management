import { Injectable, Logger } from '@nestjs/common';
import { AuditRepository } from '../audit.repository';
import { AuditLog } from '../entities/audit-log.entity';

@Injectable()
export class CreateAuditService {
  private readonly logger = new Logger(CreateAuditService.name);

  constructor(private readonly auditRepository: AuditRepository) {}

  async createAuditLog(data: Partial<AuditLog>): Promise<void> {
    try {
      await this.auditRepository.create(data);
    } catch (error) {
      this.logger.error(
        `Failed to save audit log: ${error.message}`,
        error.stack,
      );
    }
  }
}
