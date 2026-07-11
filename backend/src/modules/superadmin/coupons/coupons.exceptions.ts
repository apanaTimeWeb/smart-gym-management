import { HttpException, HttpStatus } from '@nestjs/common';
import { COUPONS_ERRORS } from './coupons.constants';

export class CouponNotFoundException extends HttpException {
  constructor(id: string) {
    super({ success: false, message: COUPONS_ERRORS.NOT_FOUND, error: 'CouponNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: `Coupon with ID "${id}" not found` }, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateCouponCodeException extends HttpException {
  constructor(code: string) {
    super({ success: false, message: COUPONS_ERRORS.DUPLICATE_CODE, error: 'DuplicateCouponCodeException', statusCode: HttpStatus.CONFLICT, detail: `Coupon code "${code}" is already in use` }, HttpStatus.CONFLICT);
  }
}
