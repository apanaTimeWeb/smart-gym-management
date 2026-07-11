import { HttpException, HttpStatus } from '@nestjs/common';
import { AFFILIATES_ERRORS } from './affiliates.constants';

export class AffiliateNotFoundException extends HttpException {
  constructor(id: string) {
    super({ success: false, message: AFFILIATES_ERRORS.NOT_FOUND, error: 'AffiliateNotFoundException', statusCode: HttpStatus.NOT_FOUND, detail: `Affiliate with ID "${id}" not found` }, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateAffiliateCodeException extends HttpException {
  constructor(code: string) {
    super({ success: false, message: AFFILIATES_ERRORS.DUPLICATE_CODE, error: 'DuplicateAffiliateCodeException', statusCode: HttpStatus.CONFLICT, detail: `Referral code "${code}" is already in use` }, HttpStatus.CONFLICT);
  }
}
