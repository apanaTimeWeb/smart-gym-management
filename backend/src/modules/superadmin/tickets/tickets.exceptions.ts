import { HttpException, HttpStatus } from '@nestjs/common';
import { TICKETS_ERRORS } from './tickets.constants';

export class TicketsNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: TICKETS_ERRORS.NOT_FOUND, error: 'TicketsNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
