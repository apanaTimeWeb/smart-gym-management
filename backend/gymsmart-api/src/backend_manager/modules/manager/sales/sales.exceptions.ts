// RESPONSIBILITY: Typed Manager sales exceptions exposed to HTTP error translation.
// FLOW: Use-case -> SalesNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class SalesNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('sales', id); }
}
