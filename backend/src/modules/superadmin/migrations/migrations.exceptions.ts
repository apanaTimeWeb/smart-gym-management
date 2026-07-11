import { HttpException, HttpStatus } from '@nestjs/common';
import { MIGRATIONS_ERRORS } from './migrations.constants';

export class MigrationsNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: MIGRATIONS_ERRORS.NOT_FOUND, error: 'MigrationsNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
