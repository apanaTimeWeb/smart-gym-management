import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource  } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { AuditLogResponse } from './audit.interfaces';

@Injectable()
export class AuditRepository {
    public readonly auditRepository: Repository<AuditLog>;

    public readonly repository: Repository<AuditLog>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(AuditLog);
  }

  async create(data: Partial<AuditLog>): Promise<AuditLog> {
    const auditLog = this.repository.create(data);
    return await this.repository.save(auditLog);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    entityType?: string,
    actorId?: string,
  ): Promise<AuditLogResponse> {
    const query = this.repository.createQueryBuilder('audit_logs');
    
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
