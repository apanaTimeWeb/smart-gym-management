// RESPONSIBILITY: Typed Manager plans exceptions exposed to HTTP error translation.
// FLOW: Use-case -> PlansNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class PlansNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('plans', id); }
}
