import { CreateGlobalAuditLogDto } from '../dto/create-audit-logs.dto';
import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';

@Injectable()
export class CreateAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute(dto: CreateGlobalAuditLogDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
