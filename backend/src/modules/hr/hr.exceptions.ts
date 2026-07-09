import { HttpException, HttpStatus } from '@nestjs/common';
import { HR_ERRORS } from '@/modules/hr/hr.constants';

export class StaffNotFoundException extends HttpException {
  constructor() {
    super(HR_ERRORS.STAFF_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class PayrollNotFoundException extends HttpException {
  constructor() {
    super(HR_ERRORS.PAYROLL_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateStaffEmailException extends HttpException {
  constructor() {
    super(HR_ERRORS.DUPLICATE_STAFF_EMAIL, HttpStatus.CONFLICT);
  }
}
