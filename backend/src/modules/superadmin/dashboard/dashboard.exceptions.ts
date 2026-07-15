import { HttpException, HttpStatus } from '@nestjs/common';
import { DASHBOARD_ERRORS } from './dashboard.constants';

export class DashboardNotFoundException extends HttpException {
  constructor(id?: string) {
    super({ success: false, message: DASHBOARD_ERRORS.NOT_FOUND, error: 'DashboardNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: id ? 'Resource with ID ' + id + ' not found' : 'Resource not found' }, HttpStatus.NOT_FOUND);
  }
}
