import { HttpException, HttpStatus } from '@nestjs/common';

export class MemberNotFoundException extends HttpException {
  constructor() {
    super('Member not found', HttpStatus.NOT_FOUND);
  }
}

export class DuplicateEmailException extends HttpException {
  constructor() {
    super('A member with this email already exists', HttpStatus.CONFLICT);
  }
}
