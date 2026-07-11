import { HttpException, HttpStatus } from '@nestjs/common';
import { GYMS_ERRORS } from './gyms.constants';

export class GymsNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: GYMS_ERRORS.NOT_FOUND, error: 'GymsNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
