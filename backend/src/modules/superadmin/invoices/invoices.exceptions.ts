import { HttpException, HttpStatus } from '@nestjs/common';
import { INVOICES_ERRORS } from './invoices.constants';

export class InvoicesNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: INVOICES_ERRORS.NOT_FOUND, error: 'InvoicesNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
