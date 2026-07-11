import { HttpException, HttpStatus } from '@nestjs/common';
import { AUDIT_LOGS_ERRORS } from './audit-logs.constants';

export class AuditLogNotFoundException extends HttpException {
  constructor(id: string) {
    super({ success: false, message: AUDIT_LOGS_ERRORS.LOG_NOT_FOUND, error: 'AuditLogNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: `Audit log with ID "${id}" not found` }, HttpStatus.NOT_FOUND);
  }
}
