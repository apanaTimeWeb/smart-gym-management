import { HttpException, HttpStatus } from '@nestjs/common';
import { TENANT_ERRORS } from './tenants.constants';

export class TenantProvisionFailedException extends HttpException {
  constructor(tenantId: string, reason?: string) {
    super(
      {
        success: false,
        message: TENANT_ERRORS.PROVISION_FAILED,
        error: 'TenantProvisionFailedException',
        detail: reason ?? `Could not provision database for tenant: ${tenantId}`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class TenantMigrationFailedException extends HttpException {
  constructor(dbName: string, reason?: string) {
    super(
      {
        success: false,
        message: TENANT_ERRORS.MIGRATION_FAILED,
        error: 'TenantMigrationFailedException',
        detail: reason ?? `Migration failed for database: ${dbName}`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
