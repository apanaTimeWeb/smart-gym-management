import { HttpException, HttpStatus } from '@nestjs/common';
import { FINANCE_ERRORS } from '@/modules/erp/finance/finance.constants';

export class MemberNotFoundForPaymentException extends HttpException {
  constructor() {
    super(FINANCE_ERRORS.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class PaymentProcessingException extends HttpException {
  constructor(message: string) {
    super(
      `${FINANCE_ERRORS.PAYMENT_FAILED}: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
