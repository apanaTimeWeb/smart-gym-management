// RESPONSIBILITY: Defines Landing-specific typed exceptions used by service and orchestration layers.
// FLOW: Service/Orchestrator â†’ typed exception â†’ global HTTP error handling.
import { HttpException, HttpStatus } from '@nestjs/common';

import { LANDING_ERRORS } from '@/backend_landing/modules/landing/landing.constants';


export class LandingBookingUnavailableException extends HttpException {
  constructor() {
    super({
      success: false,
      message: LANDING_ERRORS.BOOKING_SERVICE_UNAVAILABLE,
      data: null,
      error: 'SERVICE_UNAVAILABLE',
      errorCode: 'LANDING.BOOKING.SERVICE_UNAVAILABLE',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    }, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class LandingContactUnavailableException extends HttpException {
  constructor() {
    super({
      success: false,
      message: LANDING_ERRORS.CONTACT_SERVICE_UNAVAILABLE,
      data: null,
      error: 'SERVICE_UNAVAILABLE',
      errorCode: 'LANDING.CONTACT.SERVICE_UNAVAILABLE',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    }, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
