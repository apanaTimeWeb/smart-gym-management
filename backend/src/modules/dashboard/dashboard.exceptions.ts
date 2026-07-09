import { HttpException, HttpStatus } from '@nestjs/common';

export class DashboardDataFailedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Failed to fetch dashboard data', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
