import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAttendanceTypeException extends HttpException {
  constructor() {
    super('Invalid attendance type provided', HttpStatus.BAD_REQUEST);
  }
}

export class UserNotLinkedException extends HttpException {
  constructor() {
    super('Attendance must be linked to either a member or a staff', HttpStatus.BAD_REQUEST);
  }
}
