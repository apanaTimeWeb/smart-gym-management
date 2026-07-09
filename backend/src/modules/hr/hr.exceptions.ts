import { HttpException, HttpStatus } from '@nestjs/common';

export class StaffNotFoundException extends HttpException {
  constructor() {
    super('Staff member not found', HttpStatus.NOT_FOUND);
  }
}

export class PayrollNotFoundException extends HttpException {
  constructor() {
    super('Payroll record not found', HttpStatus.NOT_FOUND);
  }
}

export class DuplicateStaffEmailException extends HttpException {
  constructor() {
    super('A staff member with this email already exists', HttpStatus.CONFLICT);
  }
}
