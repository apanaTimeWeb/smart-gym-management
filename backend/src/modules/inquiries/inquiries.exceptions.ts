import { HttpException, HttpStatus } from '@nestjs/common';
import { INQUIRIES_CONSTANTS } from './inquiries.constants';

export class InquiryNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || INQUIRIES_CONSTANTS.ERROR_MESSAGES.INQUIRY_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
