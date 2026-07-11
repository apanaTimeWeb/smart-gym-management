import { Injectable } from '@nestjs/common';
import { AuditLogsRepository } from '../audit-logs.repository';

@Injectable()
export class CreateAuditLogsService {
  constructor(private readonly repository: AuditLogsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
