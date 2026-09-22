// RESPONSIBILITY: Typed infrastructure exception for missing trusted request context.
// FLOW: Missing actor/tenant context → CoreContextException → canonical exception filter.
import { HttpStatus } from '@nestjs/common';
import { CoreBusinessException } from '@/backend_manager/core/exceptions/core-business.exception';

export class CoreContextException extends CoreBusinessException {
  constructor(message: string, errorCode: string, status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, errorCode, status);
  }
}
