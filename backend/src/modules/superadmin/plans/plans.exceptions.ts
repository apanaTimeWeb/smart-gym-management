import { HttpException, HttpStatus } from '@nestjs/common';
import { PLANS_ERRORS } from './plans.constants';

export class PlansNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: PLANS_ERRORS.NOT_FOUND, error: 'PlansNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
