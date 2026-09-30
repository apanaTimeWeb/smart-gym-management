// RESPONSIBILITY: Defines Landing-specific typed exceptions used by service and orchestration layers.
// FLOW: Service/Orchestrator â†’ typed exception â†’ global HTTP error handling.
import { HttpException, HttpStatus } from '@nestjs/common';

import { LANDING_ERRORS } from '@/backend_landing/landing_modules/landing/landing-landing.constants';


/**
 * Intent: Defines the landing booking unavailable exception boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingBookingUnavailableException extends HttpException {
  
  /**
   * Intent: Preserve the single responsibility of landing-landing.exceptions.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor() {
    super({
      message: LANDING_ERRORS.BOOKING_SERVICE_UNAVAILABLE,
      error: 'SERVICE_UNAVAILABLE',
      errorCode: 'LANDING.BOOKING.SERVICE_UNAVAILABLE',
    }, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

/**
 * Intent: Represent an unavailable Landing contact-processing dependency with a stable canonical error contract.
 * Edge Cases: The exception must remain a typed HTTP 503 response so callers can distinguish infrastructure failure from validation or idempotency conflicts.
 * Side Effects: None; this class only describes the error response passed to the global exception filter.
 * AI Notes: Keep the machine-readable error code stable and source user-facing text from Landing constants.
 */
export class LandingContactUnavailableException extends HttpException {
  
  /**
   * Intent: Preserve the single responsibility of landing-landing.exceptions.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor() {
    super({
      message: LANDING_ERRORS.CONTACT_SERVICE_UNAVAILABLE,
      error: 'SERVICE_UNAVAILABLE',
      errorCode: 'LANDING.CONTACT.SERVICE_UNAVAILABLE',
    }, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
