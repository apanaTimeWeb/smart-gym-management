import { HttpException, HttpStatus } from '@nestjs/common';
import { SYSTEM_ERRORS } from './system.constants';

export class SystemNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: SYSTEM_ERRORS.NOT_FOUND, error: 'SystemNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
