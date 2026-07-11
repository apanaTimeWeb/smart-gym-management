import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';

@Injectable()
export class UpdateAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(id: string, dto: UpdateAuditLogsDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
