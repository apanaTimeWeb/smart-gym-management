import { HttpException, HttpStatus } from '@nestjs/common';
import { ATTENDANCE_ERRORS } from '@/modules/attendance/attendance.constants';

export class InvalidAttendanceTypeException extends HttpException {
  constructor() {
    super(ATTENDANCE_ERRORS.INVALID_TYPE, HttpStatus.BAD_REQUEST);
  }
}

export class UserNotLinkedException extends HttpException {
  constructor() {
    super(ATTENDANCE_ERRORS.USER_NOT_LINKED, HttpStatus.BAD_REQUEST);
  }
}
