import { HttpException, HttpStatus } from '@nestjs/common';
import { MEMBER_ERRORS } from '@/modules/members/members.constants';

export class MemberNotFoundException extends HttpException {
  constructor() {
    super(MEMBER_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateEmailException extends HttpException {
  constructor() {
    super(MEMBER_ERRORS.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
  }
}
