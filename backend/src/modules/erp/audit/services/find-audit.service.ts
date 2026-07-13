import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../audit.repository';
import { AuditLogResponse } from '../audit.interfaces';

@Injectable()
export class FindAuditService {
  constructor(private readonly auditRepository: AuditRepository) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    entityType?: string,
    actorId?: string,
  ): Promise<{ data: any[]; total: number }> {
    return this.auditRepository.findAll(page, limit, entityType, actorId);
  }
}
