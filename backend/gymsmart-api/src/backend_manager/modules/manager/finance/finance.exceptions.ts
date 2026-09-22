// RESPONSIBILITY: Typed Manager finance exceptions exposed to HTTP error translation.
// FLOW: Use-case -> FinanceNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class FinanceNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('finance', id); }
}
