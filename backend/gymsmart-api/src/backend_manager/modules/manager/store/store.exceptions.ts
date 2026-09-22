// RESPONSIBILITY: Typed Manager store exceptions exposed to HTTP error translation.
// FLOW: Use-case -> StoreNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class StoreNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('store', id); }
}
