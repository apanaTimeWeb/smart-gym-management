import { HttpException, HttpStatus } from '@nestjs/common';
import { BACKUPS_ERRORS } from './backups.constants';

export class BackupNotFoundException extends HttpException {
  constructor(id: string) {
    super({ success: false, message: BACKUPS_ERRORS.NOT_FOUND, error: 'BackupNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: `Backup record with ID "${id}" not found` }, HttpStatus.NOT_FOUND);
  }
}

export class BackupTriggerFailedException extends HttpException {
  constructor(tenantId: string) {
    super({ success: false, message: BACKUPS_ERRORS.TRIGGER_FAILED, error: 'BackupTriggerFailedException', statusCode: HttpStatus.INTERNAL_SERVER_ERROR, detail: `Failed to trigger backup for tenant: ${tenantId}` }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
