import { HttpException, HttpStatus } from '@nestjs/common';

export class MemberNotFoundForPaymentException extends HttpException {
  constructor() {
    super('Member not found for this payment', HttpStatus.NOT_FOUND);
  }
}

export class PaymentProcessingException extends HttpException {
  constructor(message: string) {
    super(`Payment processing failed: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
