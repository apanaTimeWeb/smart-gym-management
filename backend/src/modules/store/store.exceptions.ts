import { HttpException, HttpStatus } from '@nestjs/common';
import { STORE_CONSTANTS } from './store.constants';

export class ProductNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || STORE_CONSTANTS.ERROR_MESSAGES.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class InsufficientStockException extends HttpException {
  constructor(message?: string) {
    super(message || STORE_CONSTANTS.ERROR_MESSAGES.INSUFFICIENT_STOCK, HttpStatus.BAD_REQUEST);
  }
}

export class OrderCreationFailedException extends HttpException {
  constructor(message?: string) {
    super(message || STORE_CONSTANTS.ERROR_MESSAGES.ORDER_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
