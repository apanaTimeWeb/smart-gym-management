// RESPONSIBILITY: Owns canonical backend request-context exceptions.
// FLOW: Missing/invalid trusted context -> typed exception -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';

import { CoreBusinessException } from '@/backend_manager/core/exceptions/core-business.exception';

export class CoreContextException extends CoreBusinessException {
  /** @description Creates a context error with a machine-readable code. @param message - Safe diagnostic message. @param errorCode - Machine-readable code. @param status - HTTP status. @returns Nothing. */
  constructor(message: string, errorCode: string, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, errorCode, status);
  }
}
