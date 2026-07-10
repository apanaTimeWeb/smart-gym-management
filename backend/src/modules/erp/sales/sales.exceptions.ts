import { HttpException, HttpStatus } from '@nestjs/common';

export class SalesNotFoundException extends HttpException {
  constructor(message = 'Sales data not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class SalesBadRequestException extends HttpException {
  constructor(message = 'Invalid sales request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
