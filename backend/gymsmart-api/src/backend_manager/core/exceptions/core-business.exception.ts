// RESPONSIBILITY: Owns canonical Manager backend business exception transport.
// FLOW: Domain error -> typed HTTP exception -> global canonical error envelope.
import { HttpException, HttpStatus } from '@nestjs/common';

export class CoreBusinessException extends HttpException {
  /** @description Creates a machine-readable business exception. @param message - Safe user-facing message or translation key. @param errorCode - Machine-readable error code. @param status - HTTP status. @returns Nothing. */
  constructor(message: string, errorCode: string, status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY) {
    super({ message, errorCode, statusCode: status }, status);
  }
}
