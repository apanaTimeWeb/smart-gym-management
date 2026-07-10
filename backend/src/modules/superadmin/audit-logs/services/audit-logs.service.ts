import { DUMMY_GLOBAL_AUDIT_LOGS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from '../dto/create-audit-logs.dto';
import { UpdateAuditLogDto } from '../dto/update-audit-logs.dto';

@Injectable()
export class AuditLogsService {
  create(createDto: CreateAuditLogDto) {
    return { success: true, message: 'This action adds a new auditLogs' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: DUMMY_GLOBAL_AUDIT_LOGS };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} auditLogs` };
  }

  update(id: string, updateDto: UpdateAuditLogDto) {
    return { success: true, message: `This action updates a #${id} auditLogs` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} auditLogs` };
  }
}
