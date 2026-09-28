// RESPONSIBILITY: Owns canonical backend request-context exceptions.
// FLOW: Missing/invalid trusted context -> typed exception -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';

export class ManagerCoreContextException extends ManagerCoreBusinessException {
  /** @description Creates a context error with a machine-readable code. @param message - Safe diagnostic message. @param errorCode - Machine-readable code. @param status - HTTP status. @returns Nothing. */
  constructor(message: string, errorCode: string, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, errorCode, status);
  }
}
