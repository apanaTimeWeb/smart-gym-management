import { UpdateGlobalAuditLogDto } from '../dto/update-audit-logs.dto';
import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';

@Injectable()
export class UpdateAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(id: string, dto: UpdateGlobalAuditLogDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
