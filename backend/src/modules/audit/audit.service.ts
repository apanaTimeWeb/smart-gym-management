import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async createAuditLog(data: Partial<AuditLog>): Promise<void> {
    try {
      const auditLog = this.auditLogRepository.create(data);
      await this.auditLogRepository.save(auditLog);
    } catch (error) {
      this.logger.error(
        `Failed to save audit log: ${error.message}`,
        error.stack,
      );
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    entityType?: string,
    actorId?: string,
  ): Promise<{ data: AuditLog[]; total: number }> {
    const query = this.auditLogRepository.createQueryBuilder('audit_logs');
    
    if (entityType) {
      query.andWhere('audit_logs.entityType = :entityType', { entityType });
    }
    
    if (actorId) {
      query.andWhere('audit_logs.actorId = :actorId', { actorId });
    }

    query.orderBy('audit_logs.timestamp', 'DESC');
    query.skip((page - 1) * limit);
    query.take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }
}
