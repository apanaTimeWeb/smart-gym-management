// RESPONSIBILITY: Typed Manager hr exceptions exposed to HTTP error translation.
// FLOW: Use-case -> HrNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class HrNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('hr', id); }
}
