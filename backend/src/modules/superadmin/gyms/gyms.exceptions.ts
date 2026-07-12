import { NotFoundException, ConflictException } from '@nestjs/common';

export class TenantNotFoundException extends NotFoundException {
  constructor(message = 'Tenant not found') {
    super(message);
    this.name = 'TenantNotFoundException';
  }
}

export class TenantAlreadyExistsException extends ConflictException {
  constructor(message = 'Tenant already exists') {
    super(message);
    this.name = 'TenantAlreadyExistsException';
  }
}
