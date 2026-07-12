import { HttpException, HttpStatus } from '@nestjs/common';
import { INFRASTRUCTURE_ERRORS } from './infrastructure.constants';

export class InfrastructureNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: INFRASTRUCTURE_ERRORS.NOT_FOUND, error: 'InfrastructureNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
