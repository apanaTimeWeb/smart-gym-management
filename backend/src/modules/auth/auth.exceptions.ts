import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AUTH_ERRORS } from './auth.constants';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(AUTH_ERRORS.INVALID_CREDENTIALS);
  }
}

export class AccountDeactivatedException extends UnauthorizedException {
  constructor() {
    super(AUTH_ERRORS.ACCOUNT_DEACTIVATED);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(AUTH_ERRORS.USER_NOT_FOUND);
  }
}
