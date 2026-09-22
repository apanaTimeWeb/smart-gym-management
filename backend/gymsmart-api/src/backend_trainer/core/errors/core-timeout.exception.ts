// RESPONSIBILITY: Provides a typed infrastructure timeout failure for external and database operations.
// FLOW: Timeout wrapper → CoreTimeoutException → canonical error filter.

import { HttpStatus } from '@nestjs/common'; import { CoreDomainException } from '@/backend_trainer/core/errors/core-domain.exception'; export class CoreTimeoutException extends CoreDomainException { constructor(operation:string){super(`CORE.TIMEOUT.${operation.toUpperCase()}`,'Operation timed out',HttpStatus.SERVICE_UNAVAILABLE);} }
